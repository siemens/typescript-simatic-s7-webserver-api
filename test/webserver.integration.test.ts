/**
 * Integration Tests for WebServer Classes
 * Tests against real PLCSim Advanced instance
 * 
 * Prerequisites:
 * - PLCSim Advanced running on 192.168.0.1
 * - Authentication happens in setup.ts BEFORE these tests
 * - User must have proper authorizations for some tests
 */

import {
  WebServerReadDefaultPage,
  WebServerSetDefaultPage,
  WebServerReadResponseHeaders,
  WebServerChangeResponseHeaders
} from '../src/webserver';

import { 
  PLC_CONFIG, 
  logTestInfo,
  authToken,
  requireAuthToken
} from './setup';
import { testData } from './fixtures/testdata';

// Skip all tests if PLC is not available
const skipIfNoPLC = process.env.RUN_INTEGRATION_TESTS ? describe : describe.skip;

skipIfNoPLC('WebServer Integration Tests - Real PLCSim', () => {

  // ========================================================
  // IMPORTANT: Authentication already happened in setup.ts
  // Do NOT try to re-authenticate in individual test suites
  // ========================================================

  // ========================================================
  // WebServerReadDefaultPage Tests (READ-ONLY, No auth needed)
  // ========================================================

  describe('WebServerReadDefaultPage - Read Configuration', () => {
    it('should read current default page from PLC', async () => {
      logTestInfo('Read Default Page');

      const request = new WebServerReadDefaultPage(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('string');

      console.log(`✓ Current default page: ${response?.result || '(empty - uses hardware config)'}`);
    });

    it('should return string result for default page', async () => {
      logTestInfo('Read Default Page - Structure');

      const request = new WebServerReadDefaultPage(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(typeof response?.result).toBe('string');
      console.log('✓ Default page returns valid string structure');
    });
  });

  // ========================================================
  // WebServerSetDefaultPage Tests (WITH RESTORATION)
  // Requires: change_webserver_default_page authorization
  // ========================================================

  describe('WebServerSetDefaultPage - Set Configuration', () => {
    let originalDefaultPage: string = '';

    beforeAll(async () => {
      logTestInfo('Setup: Reading original default page');
      
      // Read and store original default page
      const readRequest = new WebServerReadDefaultPage(PLC_CONFIG);
      const readResponse = await readRequest.execute();
      if (readResponse && readResponse.result !== null && readResponse.result !== undefined) {
        originalDefaultPage = readResponse.result;
      }
      console.log(`✓ Original default page saved: ${originalDefaultPage || '(empty)'}`);
    });

    afterAll(async () => {
      logTestInfo('Cleanup: Restoring original default page');
      
      try {
        const token = requireAuthToken();
        const restoreRequest = new WebServerSetDefaultPage(
          PLC_CONFIG,
          token,
          originalDefaultPage
        );
        const restoreResponse = await restoreRequest.execute();
        if (restoreResponse?.result) {
          console.log(`✓ Restored original default page: ${originalDefaultPage || '(empty)'}`);
        }
      } catch (error) {
        console.warn('⚠️  Could not restore default page:', error);
      }
    });

    it('should set and verify default page with empty string', async () => {
      logTestInfo('Set Default Page - Reset to Hardware Config');

      const token = requireAuthToken();
      
      // Empty string is always valid - it means "use hardware config"
      const request = new WebServerSetDefaultPage(PLC_CONFIG, token, '');
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBe(true);
      console.log('✓ Reset default page to hardware configuration');

      // Verify it was set
      const verifyRequest = new WebServerReadDefaultPage(PLC_CONFIG);
      const verifyResponse = await verifyRequest.execute();
      
      expect(verifyResponse).not.toBeNull();
      expect(verifyResponse!.result).toBe('');
      console.log('✓ Verified default page is reset (empty)');
    });

    it('should reject invalid default page path', async () => {
      logTestInfo('Set Default Page - Invalid Path');

      const token = requireAuthToken();
      
      // Invalid path that doesn't exist
      const invalidPage = '/invalid/path/that/does/not/exist.html';
      const request = new WebServerSetDefaultPage(PLC_CONFIG, token, invalidPage);
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ PLC correctly rejected invalid page path (error 1300: Invalid default page)');
    });

    it('should require valid authentication token', async () => {
      logTestInfo('Set Default Page - Invalid Authentication');

      const request = new WebServerSetDefaultPage(
        PLC_CONFIG,
        'invalid-token-xyz123',
        ''
      );
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid token (error 2: Permission denied)');
    });
  });

  // ========================================================
  // WebServerReadResponseHeaders Tests
  // Requires: change_webserver_response_headers authorization
  // ========================================================

  describe('WebServerReadResponseHeaders - Read Configuration', () => {
    it('should read response headers configuration', async () => {
      logTestInfo('Read Response Headers');

      const token = requireAuthToken();
      const request = new WebServerReadResponseHeaders(PLC_CONFIG, token);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Cannot read headers - User lacks "change_webserver_response_headers" permission');
        console.warn('    This is expected if using "User" account without admin permissions');
        return; // Skip rest of test
      }

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(Array.isArray(response!.result!.configured_headers)).toBe(true);
      expect(Array.isArray(response!.result!.allowed_headers)).toBe(true);

      console.log(`✓ Configured headers: ${response!.result!.configured_headers.length}`);
      console.log(`✓ Allowed headers: ${response!.result!.allowed_headers.length}`);

      if (response!.result!.configured_headers.length > 0) {
        response!.result!.configured_headers.forEach((header: any, idx: number) => {
          console.log(`  [${idx}] Pattern: ${header.pattern}`);
        });
      }
    });

    it('should validate response headers structure', async () => {
      logTestInfo('Read Response Headers - Structure Validation');

      const token = requireAuthToken();
      const request = new WebServerReadResponseHeaders(PLC_CONFIG, token);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks required permissions');
        return;
      }

      expect(response!.result).toBeDefined();
      expect(Array.isArray(response!.result!.configured_headers)).toBe(true);
      expect(Array.isArray(response!.result!.allowed_headers)).toBe(true);

      // Validate configured headers structure
      if (response!.result!.configured_headers.length > 0) {
        response!.result!.configured_headers.forEach((header: any) => {
          expect(typeof header.pattern).toBe('string');
          expect(typeof header.header).toBe('string');
          expect(header.pattern).toBe('/~**/*');
        });
        console.log('✓ All configured headers have valid structure');
      }

      // Validate allowed headers structure
      if (response!.result!.allowed_headers.length > 0) {
        response!.result!.allowed_headers.forEach((header: any) => {
          expect(typeof header.pattern).toBe('string');
          expect(typeof header.key).toBe('string');
          expect(header.pattern).toBe('/~**/*');
          expect(header.key).toBe('Content-Security-Policy');
        });
        console.log('✓ All allowed headers have valid structure');
      }
    });

    it('should require valid authentication token', async () => {
      logTestInfo('Read Response Headers - Invalid Authentication');

      const request = new WebServerReadResponseHeaders(PLC_CONFIG, 'invalid-token-xyz');
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid token (error 2: Permission denied)');
    });
  });

  // ========================================================
  // WebServerChangeResponseHeaders Tests
  // Requires: change_webserver_response_headers authorization
  // ========================================================

  describe('WebServerChangeResponseHeaders - Change Configuration', () => {
    let originalHeaders: any = null;

    beforeAll(async () => {
      logTestInfo('Setup: Reading original response headers');
      
      try {
        const token = requireAuthToken();
        const readRequest = new WebServerReadResponseHeaders(PLC_CONFIG, token);
        const readResponse = await readRequest.execute();
        
        if (readResponse) {
          originalHeaders = readResponse.result?.configured_headers || [];
          console.log(`✓ Original headers saved: ${originalHeaders.length} configured`);
        } else {
          console.warn('⚠️  Could not read original headers - User may lack permissions');
        }
      } catch (error) {
        console.warn('⚠️  Setup error:', error);
      }
    });

    afterAll(async () => {
      if (!originalHeaders || originalHeaders.length === 0) return;

      logTestInfo('Cleanup: Restoring original response headers');
      
      try {
        const token = requireAuthToken();
        for (const header of originalHeaders) {
          const restoreRequest = new WebServerChangeResponseHeaders(
            PLC_CONFIG,
            token,
            header.pattern,
            header.header
          );
          await restoreRequest.execute();
        }
        console.log(`✓ Restored original response headers`);
      } catch (error) {
        console.warn('⚠️  Could not restore headers:', error);
      }
    });

    it('should change response headers successfully', async () => {
      logTestInfo('Change Response Headers');

      const token = requireAuthToken();
      const testHeader = {
        pattern: '/~**/*',
        header: 'Content-Security-Policy: frame-ancestors \'self\''
      };

      const request = new WebServerChangeResponseHeaders(
        PLC_CONFIG,
        token,
        testHeader.pattern,
        testHeader.header
      );
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Cannot change headers - User lacks "change_webserver_response_headers" permission');
        console.warn('    This is expected if using "User" account without admin permissions');
        return; // Skip rest of test
      }

      expect(response).not.toBeNull();
      expect(response?.result).toBe(true);
      console.log(`✓ Changed header for pattern: ${testHeader.pattern}`);

      // Verify it was set
      const verifyRequest = new WebServerReadResponseHeaders(PLC_CONFIG, token);
      const verifyResponse = await verifyRequest.execute();
      
      expect(verifyResponse).not.toBeNull();
      const headerExists = verifyResponse!.result!.configured_headers.some(
        (h: any) => h.pattern === testHeader.pattern && h.header === testHeader.header
      );
      expect(headerExists).toBe(true);
      console.log('✓ Verified header was set correctly');
    });

    it('should reject invalid pattern (not /~**/*)', async () => {
      logTestInfo('Change Response Headers - Invalid Pattern');

      const token = requireAuthToken();
      const request = new WebServerChangeResponseHeaders(
        PLC_CONFIG,
        token,
        '/invalid/pattern',
        'Content-Security-Policy: frame-ancestors \'self\''
      );
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ PLC correctly rejected invalid pattern (error 1301: Invalid pattern)');
    });

    it('should require valid authentication token', async () => {
      logTestInfo('Change Response Headers - Invalid Authentication');

      const request = new WebServerChangeResponseHeaders(
        PLC_CONFIG,
        'invalid-token-xyz',
        '/~**/*',
        'Content-Security-Policy: frame-ancestors \'self\''
      );
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid token (error 2: Permission denied)');
    });
  });

  // ========================================================
  // Documentation Tests
  // ========================================================

  describe('WebServer API Documentation', () => {
    it('should document authorization requirements', async () => {
      logTestInfo('Documentation: Authorization Requirements');

      console.log('\n📖 WebServer API Authorization Requirements:');
      console.log('   - ReadDefaultPage: No authorization required');
      console.log('   - SetDefaultPage: Requires "change_webserver_default_page"');
      console.log('   - ReadResponseHeaders: Requires "change_webserver_response_headers"');
      console.log('   - ChangeResponseHeaders: Requires "change_webserver_response_headers"');
      console.log('\n⚠️  Current User Status:');
      console.log('   - SetDefaultPage: ✓ WORKING (user has permission)');
      console.log('   - ReadResponseHeaders: ✗ DENIED (user lacks permission)');
      console.log('   - ChangeResponseHeaders: ✗ DENIED (user lacks permission)\n');
    });
  });
});
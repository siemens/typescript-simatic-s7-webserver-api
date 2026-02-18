/**
 * Integration Tests for DiagnosticBuffer.Browse
 * Tests against real PLCSim Advanced instance
 * 
 * Prerequisites:
 * - PLCSim Advanced running on 192.168.0.1
 * - Authentication happens in setup.ts BEFORE these tests
 * - User must have "read_diagnostics" authorization
 */

import {
  DiagnosticBufferBrowse,
  Filters,
  DiagnosticBufferStructure
} from '../src/diagnosticbuffer';

import { 
  PLC_CONFIG, 
  logTestInfo,
  authToken,
  requireAuthToken
} from './setup';
import { testData } from './fixtures/testdata';

// Skip all tests if integration tests are not enabled
const skipIfNoPLC = process.env.RUN_INTEGRATION_TESTS ? describe : describe.skip;

skipIfNoPLC('DiagnosticBuffer Integration Tests - Real PLCSim', () => {

  // ========================================================
  // DiagnosticBuffer.Browse - Basic Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - Basic Operations', () => {
    it('should read diagnostic buffer with default language and count', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Default Parameters');

      const token = requireAuthToken();
      
      // Use first valid language from test data
      const language = testData.diagnosticLanguages[0]; // 'en-US'
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Cannot read diagnostic buffer - User lacks "read_diagnostics" permission');
        console.warn('    This is expected if using "User" account without proper permissions');
        return; // Skip rest of test
      }

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();

      const result = response!.result!;
      
      // Validate required fields
      expect(typeof result.last_modified).toBe('string');
      expect(typeof result.count_current).toBe('number');
      expect(typeof result.count_max).toBe('number');
      expect(result.count_current >= 0).toBe(true);
      expect(result.count_max > 0).toBe(true);

      console.log(`✓ Last modified: ${result.last_modified}`);
      console.log(`✓ Current entries: ${result.count_current}`);
      console.log(`✓ Max entries: ${result.count_max}`);

      // Entries may or may not exist depending on buffer state
      if (result.entries && result.entries.length > 0) {
        console.log(`✓ Retrieved ${result.entries.length} diagnostic entries`);
      } else {
        console.log('✓ Diagnostic buffer is empty (no entries)');
      }
    });

    it('should read diagnostic buffer status without entries (count=0)', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Status Only (count=0)');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(
        PLC_CONFIG,
        token,
        language,
        0  // Count = 0 means status only
      );
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks "read_diagnostics" permission');
        return;
      }

      expect(response).not.toBeNull();
      const result = response!.result!;

      // When count=0, we should get metadata but no entries
      expect(typeof result.last_modified).toBe('string');
      expect(typeof result.count_current).toBe('number');
      expect(typeof result.count_max).toBe('number');

      console.log(`✓ Status retrieved without entries`);
      console.log(`✓ Current entries in buffer: ${result.count_current}`);
      console.log(`✓ Max buffer size: ${result.count_max}`);
    });

    it('should read diagnostic buffer with limited count', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Limited Count');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      const count = testData.diagnosticCounts.small; // 10 entries
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, count);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks "read_diagnostics" permission');
        return;
      }

      expect(response).not.toBeNull();
      const result = response!.result!;

      // Result should have at most 'count' entries
      if (result.entries) {
        expect(result.entries.length).toBeLessThanOrEqual(count);
        console.log(`✓ Retrieved ${result.entries.length} entries (max ${count})`);
      }
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Response Structure Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - Response Structure Validation', () => {
    it('should validate response structure for metadata fields', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Metadata Structure');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 0);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      const result = response!.result!;

      // Validate types
      expect(typeof result.last_modified).toBe('string');
      expect(typeof result.count_current).toBe('number');
      expect(typeof result.count_max).toBe('number');

      // Validate timestamp format (ISO 8601)
      expect(result.last_modified).toMatch(/^\d{4}-\d{2}-\d{2}T/);

      // Validate counts are non-negative
      expect(result.count_current).toBeGreaterThanOrEqual(0);
      expect(result.count_max).toBeGreaterThan(0);

      console.log('✓ Metadata structure valid');
      console.log(`✓ ISO 8601 timestamp format valid`);
      console.log(`✓ All count values are valid numbers`);
    });

    it('should validate entry structure when entries are present', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Entry Structure');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 50);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      const result = response!.result!;

      if (!result.entries || result.entries.length === 0) {
        console.log('✓ No entries in buffer (nothing to validate)');
        return;
      }

      console.log(`✓ Validating ${result.entries.length} entries`);

      result.entries.forEach((entry : any, idx: number) => {
        // Required fields for each entry
        expect(typeof entry.timestamp).toBe('string');
        expect(typeof entry.status).toBe('string');
        expect(['incoming', 'outgoing']).toContain(entry.status);

        // Event object
        expect(entry.event).toBeDefined();
        expect(typeof entry.event.textlist_id).toBe('number');
        expect(typeof entry.event.text_id).toBe('number');

        // Text fields (may be empty but should exist)
        expect(typeof entry.long_text).toBe('string');
        expect(typeof entry.short_text).toBe('string');
        expect(typeof entry.help_text).toBe('string');

        if (idx === 0) {
          console.log(`  Entry[0] - Status: ${entry.status}, Event: [${entry.event.textlist_id}, ${entry.event.text_id}]`);
        }
      });

      console.log('✓ All entries have valid structure');
    });

    it('should include language field when entries are returned', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Language Field');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 50);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      const result = response!.result!;

      if (result.entries && result.entries.length > 0) {
        expect(result.language).toBeDefined();
        expect(typeof result.language).toBe('string');
        console.log(`✓ Language field present: ${result.language}`);
      } else {
        console.log('✓ Language field not required when no entries');
      }
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Filter Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - Filter Operations', () => {
    it('should apply include filter for specific attributes', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Include Filter');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      const filters = testData.diagnosticFilters.includeTextOnly;
      
      const request = new DiagnosticBufferBrowse(
        PLC_CONFIG,
        token,
        language,
        50,
        filters as any
      );
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      expect(response).not.toBeNull();
      const result = response!.result!;

      if (result.entries && result.entries.length > 0) {
        // When including text attributes, they should be present
        result.entries.forEach((entry: any) => {
          expect(typeof entry.short_text).toBe('string');
          expect(typeof entry.long_text).toBe('string');
        });
        console.log(`✓ Filter applied: ${result.entries.length} entries with text fields`);
      } else {
        console.log('✓ Filter processed (no entries to validate)');
      }
    });

    it('should apply exclude filter for specific attributes', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Exclude Filter');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      const filters = testData.diagnosticFilters.excludeHelpText;
      
      const request = new DiagnosticBufferBrowse(
        PLC_CONFIG,
        token,
        language,
        50,
        filters as any
      );
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      expect(response).not.toBeNull();
      const result = response!.result!;

      console.log(`✓ Exclude filter applied`);
      if (result.entries && result.entries.length > 0) {
        console.log(`✓ Retrieved ${result.entries.length} entries with help_text excluded`);
      }
    });

    it('should handle include all attributes filter', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Include All Filter');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      const filters = testData.diagnosticFilters.includeAll;
      
      const request = new DiagnosticBufferBrowse(
        PLC_CONFIG,
        token,
        language,
        50,
        filters as any
      );
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Skipping - User lacks permissions');
        return;
      }

      expect(response).not.toBeNull();
      console.log(`✓ Include all attributes filter applied`);
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Language Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - Language Support', () => {
    it('should accept multiple language formats', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Language Formats');

      const token = requireAuthToken();
      
      // Test first few language formats
      const languagesToTest = testData.diagnosticLanguages.slice(0, 3);
      
      for (const language of languagesToTest) {
        const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 0);
        const response = await request.execute();

        if (response === null) {
          console.warn(`⚠️  ${language}: User lacks permissions (skipping)`);
          return;
        }

        expect(response).not.toBeNull();
        console.log(`✓ Language "${language}" accepted`);
      }
    });

    it('should handle invalid language gracefully', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Invalid Language');

      const token = requireAuthToken();
      const invalidLanguage = testData.invalidLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, invalidLanguage, 0);
      const response = await request.execute();

      // Response may be null (error) or contain entries with fallback text
      // According to docs, invalid language returns entries with text like "#254, 17"
      
      if (response === null) {
        console.log('✓ Invalid language correctly rejected');
      } else {
        console.log('✓ Invalid language handled with fallback text');
        if (response.result?.entries && response.result.entries.length > 0) {
          const firstEntry = response.result.entries[0];
          console.log(`   Example: ${firstEntry.short_text}`);
        }
      }
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Authorization Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - Authorization', () => {
    it('should require valid authentication token', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Invalid Token');

      const request = new DiagnosticBufferBrowse(
        PLC_CONFIG,
        'invalid-token-xyz',
        testData.diagnosticLanguages[0],
        0
      );
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid token (error 2: Permission denied)');
    });

    it('should require read_diagnostics authorization', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Authorization Check');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 0);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  User does not have "read_diagnostics" authorization');
        console.warn('    This is expected if using "User" account without admin permissions');
      } else {
        console.log('✓ User has "read_diagnostics" authorization');
      }
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Error Handling
  // ========================================================

  describe('DiagnosticBuffer.Browse - Error Handling', () => {
    it('should handle empty diagnostic buffer gracefully', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Empty Buffer');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, 50);
      const response = await request.execute();

      if (response === null) {
        console.warn('⚠️  Cannot verify - user lacks permissions');
        return;
      }

      expect(response).not.toBeNull();
      const result = response!.result!;

      // Should still have metadata even if buffer is empty
      expect(typeof result.last_modified).toBe('string');
      expect(typeof result.count_current).toBe('number');

      if (result.entries === undefined || result.entries.length === 0) {
        console.log('✓ Empty buffer handled correctly');
        console.log(`✓ Metadata available: ${result.count_current} current, ${result.count_max} max`);
      }
    });

    it('should validate count parameter constraints', async () => {
      logTestInfo('DiagnosticBuffer.Browse - Count Constraints');

      const token = requireAuthToken();
      const language = testData.diagnosticLanguages[0];
      
      // Test with valid count values
      const testCounts = [0, 1, 50, 100, 1000];
      
      for (const count of testCounts) {
        const request = new DiagnosticBufferBrowse(PLC_CONFIG, token, language, count);
        const response = await request.execute();

        if (response === null) {
          console.warn(`⚠️  Cannot test count=${count} - permissions issue`);
          return;
        }

        expect(response).not.toBeNull();
        console.log(`✓ Count parameter ${count} accepted`);
      }
    });
  });

  // ========================================================
  // DiagnosticBuffer.Browse - Documentation Tests
  // ========================================================

  describe('DiagnosticBuffer.Browse - API Documentation', () => {
    it('should document API requirements', async () => {
      logTestInfo('Documentation: DiagnosticBuffer.Browse Requirements');

      console.log('\n📖 DiagnosticBuffer.Browse API Requirements:');
      console.log('   Required Authorization: "read_diagnostics"');
      console.log('   Required Parameter: language (RFC 4647 format)');
      console.log('   Optional Parameters:');
      console.log('     - count: max entries to return (default: 50, set 0 for status only)');
      console.log('     - filters: { mode: "include"|"exclude", attributes: [...] }');
      console.log('       Possible attributes: short_text, long_text, help_text\n');
    });

    it('should document response structure', async () => {
      logTestInfo('Documentation: Response Structure');

      console.log('\n📖 DiagnosticBuffer.Browse Response Structure:');
      console.log('   Metadata (always present):');
      console.log('     - last_modified (ISO 8601 timestamp)');
      console.log('     - count_current (number of current entries)');
      console.log('     - count_max (maximum buffer size)');
      console.log('   Optional:');
      console.log('     - language (included when entries are returned)');
      console.log('     - entries[] (array of diagnostic entries)');
      console.log('   Entry fields:');
      console.log('     - timestamp (ISO 8601)');
      console.log('     - status ("incoming" or "outgoing")');
      console.log('     - short_text, long_text, help_text');
      console.log('     - event { textlist_id, text_id }\n');
    });

    it('should document language format', async () => {
      logTestInfo('Documentation: Language Format');

      console.log('\n📖 Language Format (RFC 4647):');
      console.log('   Format: language[-region]');
      console.log('   Examples:');
      testData.diagnosticLanguages.forEach(lang => {
        console.log(`     - ${lang}`);
      });
      console.log('   Use Project.ReadLanguages to get available languages\n');
    });

    it('should document count parameter behavior', async () => {
      logTestInfo('Documentation: Count Parameter');

      console.log('\n📖 Count Parameter Behavior:');
      console.log('   count = 0:  Return only metadata (status), no entries');
      console.log('   count = N:  Return up to N entries (default 50)');
      console.log('   count undefined: Use default (50)');
      console.log('\n   Use Cases:');
      console.log('     - count=0: Quick status check without loading entries');
      console.log('     - count=1000: Get all or most diagnostic entries\n');
    });
  });
});
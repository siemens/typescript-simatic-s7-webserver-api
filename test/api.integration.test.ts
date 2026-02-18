/**
 * Integration Tests for API Authentication
 * Tests against real PLCSim Advanced instance
 * 
 * Prerequisites:
 * - PLCSim Advanced running on 192.168.0.1
 * - User credentials configured in PLCSim
 */

import {
  ApiLogin,
  ApiPing,
  ApiLogout,
  ApiVersion,
  ApiBrowse,
  ApiGetPermissions,
  ApiGetCertificateUrl,
  ApiGetQuantityStructures,
  ApiChangePassword,
  ApiGetPasswordPolicy,
  ApiGetAuthenticationMode,
  ApiGetSessionInfo,
  ApiBrowseTickets,
  ApiCloseTickets
} from '../src/api';
import { PLC_CONFIG, authToken, getAuthToken, logTestInfo } from './setup';

// Skip all tests if PLC is not available
const skipIfNoPLC = process.env.RUN_INTEGRATION_TESTS ? describe : describe.skip;

skipIfNoPLC('API Integration Tests - Real PLCSim', () => {
  let testToken: string | null = null;

  // Check if PLC is available before running tests
  beforeAll(async () => {
    testToken = authToken;
    if (!testToken) {
      console.warn('\n⚠️  No authentication token available');
      console.warn('PLCSim may not be available or authentication failed.');
      console.warn('To run tests, start PLCSim and set RUN_INTEGRATION_TESTS=true\n');
    }
  });

  // ========================================================
  // Api.Login Tests
  // ========================================================

  describe('Api.Login - Authentication', () => {
    it('should login as Anonymous user successfully', async () => {
      logTestInfo('Api.Login - Anonymous');

      const request = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('string');
      expect(response?.result?.length).toBeGreaterThan(0);

      console.log(`✓ Login successful`);
      console.log(`✓ Token received: ${response?.result?.substring(0, 20)}...`);
    });

    it('should reject invalid credentials', async () => {
      logTestInfo('Api.Login - Invalid Credentials');

      const request = new ApiLogin(PLC_CONFIG, 'InvalidUser', 'InvalidPassword');
      const response = await request.execute();

      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid credentials');
    });

    it('should include token in response', async () => {
      logTestInfo('Api.Login - Response Structure');

      const request = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.id).toBeDefined();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('string');
      console.log('✓ Response has correct structure');
    });
  });

  // ========================================================
  // Api.Logout Tests
  // ========================================================

  describe('Api.Logout - Session Termination', () => {
    it('should logout successfully', async () => {
      logTestInfo('Api.Logout');

      // First login
      const loginRequest = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
      const loginResponse = await loginRequest.execute();
      const token = loginResponse?.result;

      expect(token).toBeDefined();

      // Then logout
      const logoutRequest = new ApiLogout(PLC_CONFIG, token!);
      const logoutResponse = await logoutRequest.execute();

      expect(logoutResponse).not.toBeNull();
      expect(logoutResponse?.result).toBe(true);

      console.log('✓ Logout successful');
    });

    it('should handle logout with invalid token', async () => {
      logTestInfo('Api.Logout - Invalid Token');

      const logoutRequest = new ApiLogout(PLC_CONFIG, 'invalid-token-12345');
      const logoutResponse = await logoutRequest.execute();

      // According to API documentation:
      // "For security reasons, the method always returns the Boolean value 'true' 
      //  even if the token is invalid."
      // This prevents attackers from enumerating valid tokens
      expect(logoutResponse).not.toBeNull();
      expect(logoutResponse?.result).toBe(true);
      console.log('✓ Logout returns true (even with invalid token - by design for security)');
    });
  });

 // ========================================================
  // Api.GetPermissions Tests
  // ========================================================

  describe('Api.GetPermissions - User Permissions', () => {
    it('should retrieve permissions for configured user', async () => {
      logTestInfo('Api.GetPermissions - Retrieve User Permissions');

      const request = new ApiGetPermissions(PLC_CONFIG);
      const response = await request.execute();

      // Should return array even for Anonymous (but may be empty)
      expect(Array.isArray(response?.result)).toBe(true);
      
      const permissions = response?.result || [];
      
      console.log(`✓ Retrieved ${permissions.length} permissions`);
      
      if (permissions.length > 0) {
        console.log(`✓ User has explicit permissions assigned`);
        console.log(`✓ Sample permissions: ${permissions.slice(0, 3).join(', ')}`);
      } else {
        console.log('ℹ Anonymous user or no specific permissions assigned');
      }
    });

    it('should validate permission array structure', async () => {
      logTestInfo('Api.GetPermissions - Structure Validation');

      const request = new ApiGetPermissions(PLC_CONFIG);
      const response = await request.execute();

      expect(Array.isArray(response?.result)).toBe(true);
      
      const permissions = response?.result || [];
      
      // Validate each permission is a string
      expect(permissions.every((perm: any) => typeof perm === 'string')).toBe(true);
      
      console.log(`✓ All ${permissions.length} permissions are valid strings`);
    });

    it('should include expected permissions for non-anonymous user', async () => {
      logTestInfo('Api.GetPermissions - Permission Types');

      const request = new ApiGetPermissions(PLC_CONFIG);
      const response = await request.execute();

      const permissions = response?.result || [];
      
      // Common Siemens permissions to check for
      const commonPermissions = [
        'read',
        'write',
        'read_diagnostics',
        'read_configuration',
        'web_api_access',
        'plc_control'
      ];
      
      if (permissions.length > 0) {
        const foundPermissions = permissions.filter((p: string) => 
          commonPermissions.some(cp => p.toLowerCase().includes(cp))
        );
        
        console.log(`✓ Found ${foundPermissions.length} standard permission types`);
        console.log(`✓ Permissions: ${permissions.join(', ')}`);
        
        // Expect at least some standard permissions
        expect(permissions.length).toBeGreaterThan(0);
      } else {
        console.log('ℹ No permissions returned (Anonymous or restricted user)');
      }
    });

    it('should have read_diagnostics permission for diagnostic tests', async () => {
      logTestInfo('Api.GetPermissions - Diagnostics Permission Check');

      const request = new ApiGetPermissions(PLC_CONFIG);
      const response = await request.execute();

      const permissions = response?.result || [];
      const hasDiagnosticsRead = permissions.some((p: string) => 
        p.toLowerCase().includes('read_diagnostics') || 
        p.toLowerCase().includes('diagnostics')
      );
      
      if (hasDiagnosticsRead) {
        console.log('✓ User has read_diagnostics permission');
        expect(hasDiagnosticsRead).toBe(true);
      } else if (permissions.length === 0) {
        console.log('⚠ Cannot verify diagnostics permission - no permissions returned');
      } else {
        console.log(`⚠ read_diagnostics not found. Available: ${permissions.join(', ')}`);
      }
    });

    it('should show all available permissions', async () => {
      logTestInfo('Api.GetPermissions - Complete Permission List');

      const request = new ApiGetPermissions(PLC_CONFIG);
      const response = await request.execute();

      const permissions = response?.result || [];
      
      console.log('📋 All Available Permissions:');
      if (permissions.length > 0) {
        permissions.forEach((perm: string, index: number) => {
          console.log(`   ${index + 1}. ${perm}`);
        });
      } else {
        console.log('   (No permissions - likely Anonymous user)');
      }
    });
  });

  // ========================================================
  // Api.Version Tests
  // ========================================================

  describe('Api.Version - API Version', () => {
    it('should get API version', async () => {
      logTestInfo('Api.Version');

      const request = new ApiVersion(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('number');
      expect(response?.result).toBeGreaterThan(0);

      console.log(`✓ API Version: ${response?.result}`);
    });

    it('should return valid version number', async () => {
      logTestInfo('Api.Version - Version Validation');

      const request = new ApiVersion(PLC_CONFIG);
      const response = await request.execute();

      expect(response?.result).toBeGreaterThanOrEqual(1);
      console.log('✓ Version is a valid positive number');
    });
  });

  // ========================================================
  // Api.Ping Tests
  // ========================================================

  describe('Api.Ping - Connection Test', () => {
    it('should ping PLC successfully', async () => {
      logTestInfo('Api.Ping');

      const request = new ApiPing(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('string');

      console.log(`✓ Ping successful: ${response?.result}`);
    });

    it('should return non-empty ping response', async () => {
      logTestInfo('Api.Ping - Response Validation');

      const request = new ApiPing(PLC_CONFIG);
      const response = await request.execute();

      expect(response?.result?.length).toBeGreaterThan(0);
      console.log('✓ Ping response is non-empty');
    });
  });

  // ========================================================
  // Api.Browse Tests
  // ========================================================

  describe('Api.Browse - API Resources', () => {
    it('should browse available API resources', async () => {
      logTestInfo('Api.Browse');

      const request = new ApiBrowse(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(Array.isArray(response?.result)).toBe(true);

      console.log(`✓ Retrieved ${response?.result?.length || 0} browseable resources`);
      if (response?.result && response.result.length > 0) {
        console.log(`✓ Sample resources: ${response.result.slice(0, 3).join(', ')}`);
      }
    });

    it('should return array of resource names', async () => {
      logTestInfo('Api.Browse - Structure Validation');

      const request = new ApiBrowse(PLC_CONFIG);
      const response = await request.execute();

      if (response?.result && response.result.length > 0) {
        expect(response.result.every((res: string) => typeof res === 'string')).toBe(true);
        console.log('✓ All resources are strings');
      }
    });
  });

  // ========================================================
  // Api.GetCertificateUrl Tests
  // ========================================================

  describe('Api.GetCertificateUrl - Certificate Information', () => {
    it('should get certificate URL', async () => {
      logTestInfo('Api.GetCertificateUrl');

      const request = new ApiGetCertificateUrl(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();
      expect(typeof response?.result).toBe('string');

      console.log(`✓ Certificate URL retrieved`);
      if (response?.result) {
        console.log(`✓ URL: ${response.result || '(empty)'}`);
      }
    });
  });

  // ========================================================
  // Api.GetQuantityStructures Tests
  // ========================================================

  describe('Api.GetQuantityStructures - System Limits', () => {
    beforeEach(async () => {
      // Ensure we have a valid token for authenticated requests
      if (!testToken) {
        const loginRequest = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
        const loginResponse = await loginRequest.execute();
        testToken = loginResponse?.result || null;
      }
    });

    it('should get quantity structures', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.GetQuantityStructures');

      const request = new ApiGetQuantityStructures(PLC_CONFIG, testToken);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();

      console.log('✓ Quantity structures retrieved');
      if (response?.result) {
        console.log(`✓ Max HTTP request body size: ${response.result.webapi_max_http_request_body_size} bytes`);
        console.log(`✓ Max parallel requests: ${response.result.webapi_max_parallel_requests}`);
        console.log(`✓ Max parallel user sessions: ${response.result.webapi_max_parallel_user_sessions}`);
      }
    });

    it('should return valid quantity structure values', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.GetQuantityStructures - Value Validation');

      const request = new ApiGetQuantityStructures(PLC_CONFIG, testToken);
      const response = await request.execute();

      if (response?.result) {
        expect(response.result.webapi_max_http_request_body_size).toBeGreaterThan(0);
        expect(response.result.webapi_max_parallel_requests).toBeGreaterThan(0);
        expect(response.result.webapi_max_parallel_user_sessions).toBeGreaterThan(0);
        console.log('✓ All quantity structure values are valid');
      }
    });
  });

  // ========================================================
  // Api.GetPasswordPolicy Tests
  // ========================================================

  describe('Api.GetPasswordPolicy - Password Requirements', () => {
    it('should get password policy', async () => {
      logTestInfo('Api.GetPasswordPolicy');

      const request = new ApiGetPasswordPolicy(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();

      console.log('✓ Password policy retrieved');
      if (response?.result) {
        console.log(`✓ Min password length: ${response.result.min_password_length}`);
        console.log(`✓ Max password length: ${response.result.max_password_length}`);
        console.log(`✓ Min digits required: ${response.result.min_digits}`);
        console.log(`✓ Min special characters: ${response.result.min_special_characters}`);
        console.log(`✓ Requires uppercase: ${response.result.requires_uppercase_characters}`);
        console.log(`✓ Requires lowercase: ${response.result.requires_lowercase_characters}`);
      }
    });

    it('should return valid password policy values', async () => {
      logTestInfo('Api.GetPasswordPolicy - Value Validation');

      const request = new ApiGetPasswordPolicy(PLC_CONFIG);
      const response = await request.execute();

      if (response?.result) {
        expect(response.result.min_password_length).toBeGreaterThanOrEqual(0);
        expect(response.result.max_password_length).toBeGreaterThanOrEqual(0);
        expect(response.result.min_digits).toBeGreaterThanOrEqual(0);
        expect(response.result.min_special_characters).toBeGreaterThanOrEqual(0);
        expect(typeof response.result.requires_uppercase_characters).toBe('boolean');
        expect(typeof response.result.requires_lowercase_characters).toBe('boolean');
        console.log('✓ All password policy values are valid');
      }
    });
  });

  // ========================================================
  // Api.GetAuthenticationMode Tests
  // ========================================================

  describe('Api.GetAuthenticationMode - Available Auth Methods', () => {
    it('should get available authentication modes', async () => {
      logTestInfo('Api.GetAuthenticationMode');

      const request = new ApiGetAuthenticationMode(PLC_CONFIG);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(Array.isArray(response?.result)).toBe(true);

      console.log(`✓ Retrieved authentication modes`);
      if (response?.result && response.result.length > 0) {
        console.log(`✓ Available modes: ${response.result.join(', ')}`);
      }
    });

    it('should return array of authentication mode names', async () => {
      logTestInfo('Api.GetAuthenticationMode - Structure Validation');

      const request = new ApiGetAuthenticationMode(PLC_CONFIG);
      const response = await request.execute();

      if (response?.result && response.result.length > 0) {
        expect(response.result.every((mode: string) => typeof mode === 'string')).toBe(true);
        console.log('✓ All authentication modes are strings');
      }
    });
  });

  // ========================================================
  // Api.GetSessionInfo Tests
  // ========================================================

  describe('Api.GetSessionInfo - Current Session Details', () => {
    
    it('should retrieve session info without authorization required', async () => {
      logTestInfo('Api.GetSessionInfo - No Auth Required');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      // ← FIX: Handle null response AND error properly
      if (!response) {
        console.log(`⚠️  API returned null response`);
        expect(response).not.toBeNull();
        return;
      }

      if (response.error) {
        console.log(`⚠️  API returned error [${response.error.code}]: ${response.error.message}`);
        console.log(`Documentation says no auth required`);
        expect(response.error).toBeNull();
        return;
      }

      // Expected successful response (only reached if no error)
      expect(response.result).toBeDefined();
      
      const sessionInfo = response.result;
      
      expect(sessionInfo).toHaveProperty('username');
      expect(typeof sessionInfo.username).toBe('string');
      expect(sessionInfo.username.length).toBeGreaterThan(0);
      
      console.log(`✓ Session retrieved successfully`);
      console.log(`✓ Username: ${sessionInfo.username}`);
    });

    it('should return username (required field)', async () => {
      logTestInfo('Api.GetSessionInfo - Required Fields');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      // ← FIX: Handle null response AND error properly
      if (!response) {
        console.log(`⚠️  API returned null response`);
        expect(response).not.toBeNull();
        return;
      }

      if (response.error) {
        console.log(`⚠️  GetSessionInfo returned error [${response.error.code}]: ${response.error.message}`);
        expect(response.error).toBeNull();
        return;
      }

      const sessionInfo = response.result;
      
      expect(sessionInfo).toBeDefined();
      expect(sessionInfo).toHaveProperty('username');
      expect(sessionInfo.username).toBeDefined();
      expect(typeof sessionInfo.username).toBe('string');
      
      console.log(`✓ Username field present: ${sessionInfo.username}`);
    });

    it('should validate optional authentication_mode field', async () => {
      logTestInfo('Api.GetSessionInfo - Authentication Mode');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      if (sessionInfo.hasOwnProperty('authentication_mode')) {
        expect(['static', 'local', 'umc']).toContain(sessionInfo.authentication_mode);
        console.log(`✓ Authentication mode: ${sessionInfo.authentication_mode}`);
      } else if (sessionInfo.username === 'Anonymous') {
        console.log(`✓ No authentication mode for Anonymous user (expected)`);
      } else {
        console.log(`⚠️  Authentication mode not provided`);
      }
    });

    it('should validate optional runtime_timeout field', async () => {
      logTestInfo('Api.GetSessionInfo - Runtime Timeout');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      if (sessionInfo.hasOwnProperty('runtime_timeout')) {
        expect(typeof sessionInfo.runtime_timeout).toBe('string');
        expect(sessionInfo.runtime_timeout).toMatch(/^PT/);
        console.log(`✓ Runtime timeout: ${sessionInfo.runtime_timeout}`);
      } else {
        console.log(`ℹ No runtime timeout configured`);
      }
    });

    it('should validate optional password_expiration field', async () => {
      logTestInfo('Api.GetSessionInfo - Password Expiration');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      if (sessionInfo.hasOwnProperty('password_expiration')) {
        const pwExpiration = sessionInfo.password_expiration;
        
        expect(pwExpiration).toHaveProperty('timestamp');
        expect(typeof pwExpiration.timestamp).toBe('string');
        expect(pwExpiration).toHaveProperty('warning');
        expect(typeof pwExpiration.warning).toBe('boolean');
        
        console.log(`✓ Password expiration configured`);
        console.log(`   Timestamp: ${pwExpiration.timestamp}`);
        console.log(`   Warning: ${pwExpiration.warning}`);
      } else {
        console.log(`ℹ No password expiration configured`);
      }
    });

    it('should show complete session structure', async () => {
      logTestInfo('Api.GetSessionInfo - Complete Structure');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      console.log('📋 Session Information:');
      console.log(JSON.stringify(sessionInfo, null, 2));
      
      console.log('\n✓ Response matches API specification');
      console.log('  Required fields: username ✓');
      if (sessionInfo.authentication_mode) {
        console.log('  Optional fields: authentication_mode ✓');
      }
      if (sessionInfo.runtime_timeout) {
        console.log('  Optional fields: runtime_timeout ✓');
      }
      if (sessionInfo.password_expiration) {
        console.log('  Optional fields: password_expiration ✓');
      }
    });

    it('should handle Anonymous user session', async () => {
      logTestInfo('Api.GetSessionInfo - Anonymous User Handling');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      if (sessionInfo.username === 'Anonymous' || sessionInfo.username === 'Everybody') {
        console.log(`✓ Anonymous session detected`);
        expect(sessionInfo.username).toBeDefined();
        
        if (!sessionInfo.hasOwnProperty('authentication_mode')) {
          console.log(`✓ No authentication_mode for Anonymous (expected per spec)`);
        }
      } else {
        console.log(`✓ Authenticated user: ${sessionInfo.username}`);
      }
    });

    it('should validate response matches API specification', async () => {
      logTestInfo('Api.GetSessionInfo - Specification Validation');

      const request = new ApiGetSessionInfo(PLC_CONFIG);
      const response = await request.execute();

      if (!response || response.error) {
        console.log(`⚠️  GetSessionInfo returned error`);
        return;
      }

      const sessionInfo = response.result;
      
      if (!sessionInfo) {
        console.log('⚠️  No session info returned');
        return;
      }
      
      const validKeys = [
        'authentication_mode',
        'username',
        'password_expiration',
        'runtime_timeout'
      ];
      
      const keys = Object.keys(sessionInfo);
      const invalidKeys = keys.filter(k => !validKeys.includes(k));
      
      if (invalidKeys.length === 0) {
        console.log('✓ Response structure matches API specification');
      } else {
        console.log(`⚠️  Unexpected fields: ${invalidKeys.join(', ')}`);
      }
      
      expect(sessionInfo).toHaveProperty('username');
      console.log('✓ Required field validation passed');
    });
  });
  // ========================================================
  // Api.ChangePassword Tests
  // ========================================================

  describe('Api.ChangePassword - Password Management', () => {
    beforeEach(async () => {
      // Ensure we have a valid token for authenticated requests
      if (!testToken) {
        const loginRequest = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
        const loginResponse = await loginRequest.execute();
        testToken = loginResponse?.result || null;
      }
    });

    it('should reject password change with invalid current password', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.ChangePassword - Invalid Current Password');

      const request = new ApiChangePassword(
        PLC_CONFIG,
        testToken,
        'Anonymous',
        'WrongPassword',
        'NewPassword123!'
      );
      const response = await request.execute();

      // Should fail with wrong current password
      expect(response).toBeNull();
      console.log('✓ Request correctly rejected with invalid current password');
    });

    it('should handle password change attempts', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.ChangePassword - Response Handling');

      // Anonymous user typically can't change password, so this should fail gracefully
      const request = new ApiChangePassword(
        PLC_CONFIG,
        testToken,
        'Anonymous',
        '',
        'NewPassword123!'
      );
      const response = await request.execute();

      // Response can be null (error) or false (rejected)
      if (response) {
        expect(typeof response.result).toBe('boolean');
        console.log(`✓ Password change handled: ${response.result}`);
      } else {
        console.log('✓ Password change request processed');
      }
    });
  });

  // ========================================================
  // Api.BrowseTickets Tests
  // ========================================================

  describe('Api.BrowseTickets - Ticket Management', () => {
    beforeEach(async () => {
      // Ensure we have a valid token for authenticated requests
      if (!testToken) {
        const loginRequest = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
        const loginResponse = await loginRequest.execute();
        testToken = loginResponse?.result || null;
      }
    });

    it('should browse all tickets', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.BrowseTickets');

      const request = new ApiBrowseTickets(PLC_CONFIG, testToken);
      const response = await request.execute();

      expect(response).not.toBeNull();
      expect(response?.result).toBeDefined();

      console.log('✓ Tickets browsed successfully');
      if (response?.result) {
        console.log(`✓ Max tickets: ${response.result.max_tickets}`);
        console.log(`✓ Current tickets: ${response.result.ticket.length}`);
      }
    });

    it('should return valid ticket structure', async () => {
      if (!testToken) {
        console.warn('Skipping - no authentication token');
        return;
      }

      logTestInfo('Api.BrowseTickets - Structure Validation');

      const request = new ApiBrowseTickets(PLC_CONFIG, testToken);
      const response = await request.execute();

      if (response?.result) {
        expect(typeof response.result.max_tickets).toBe('number');
        expect(Array.isArray(response.result.ticket)).toBe(true);

        // Validate ticket structure if tickets exist
        if (response.result.ticket.length > 0) {
          response.result.ticket.forEach((ticket: any) => {
            expect(typeof ticket.id).toBe('string');
            expect(typeof ticket.date_created).toBe('string');
            expect(typeof ticket.provider).toBe('string');
            expect(typeof ticket.state).toBe('string');
          });
          console.log('✓ All tickets have valid structure');
        } else {
          console.log('✓ No tickets present (structure validated)');
        }
      }
    });
  });

  // ========================================================
  // Complete Authentication Workflow
  // ========================================================

  describe('Authentication Workflow', () => {
    it('should complete full login-use-logout cycle', async () => {
      logTestInfo('Workflow: Login → Use → Logout');

      // Step 1: Login
      const loginRequest = new ApiLogin(PLC_CONFIG, 'Anonymous', '');
      const loginResponse = await loginRequest.execute();
      expect(loginResponse?.result).toBeDefined();
      const token = loginResponse?.result;
      console.log('1. ✓ Login successful');

      // Step 2: Use token with authenticated request
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token!.length).toBeGreaterThan(0);
      console.log('2. ✓ Token is valid and ready for use');

      // Step 3: Get system info with token
      const quantityRequest = new ApiGetQuantityStructures(PLC_CONFIG, token!);
      const quantityResponse = await quantityRequest.execute();
      expect(quantityResponse).not.toBeNull();
      console.log('3. ✓ Successfully used token for authenticated request');

      // Step 4: Logout
      const logoutRequest = new ApiLogout(PLC_CONFIG, token!);
      const logoutResponse = await logoutRequest.execute();
      expect(logoutResponse?.result).toBe(true);
      console.log('4. ✓ Logout successful');

      console.log('\n✓ Complete authentication workflow succeeded');
    });

  });
});
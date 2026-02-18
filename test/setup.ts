import type { RequestConfig } from '../src/request';
import { ApiLogin } from '../src/api';

// ========================================================
// PLC Configuration
// ========================================================

export const PLC_CONFIG: RequestConfig = {
  address: '192.168.0.1',
  protocol: 'https',
  verifyTls: false
};

// ========================================================
// PLC Credentials
// ========================================================

const PLC_CREDENTIALS = {
  username: 'User',
  password: 'Siemens123!'
};

// ========================================================
// Authentication State - MUST be filled before tests run
// ========================================================

export let authToken: string | null = null;

// ========================================================
// Global Test Setup - Runs BEFORE all tests
// ========================================================

beforeAll(async () => {
  console.log('\n🔐 [SETUP] Starting authentication...');
  
  try {
    const login = new ApiLogin(PLC_CONFIG, PLC_CREDENTIALS.username, PLC_CREDENTIALS.password);
    const response = await login.execute();

    if (response?.result) {
      authToken = response.result;
      console.log(`✅ [SETUP] Authentication successful`);
      console.log(`   Token: ${authToken?.substring(0, 20)}...`);
      return;
    }

    console.error('❌ [SETUP] Login failed: No token in response');
  } catch (error) {
    console.error('❌ [SETUP] Authentication error:', error);
  }
});

// ========================================================
// Helper Functions
// ========================================================

/**
 * Get authentication token from PLC
 * Uses configured credentials to login
 */
export async function getAuthToken(): Promise<string | null> {
  try {
    const login = new ApiLogin(PLC_CONFIG, PLC_CREDENTIALS.username, PLC_CREDENTIALS.password);
    const response = await login.execute();

    if (response?.result) {
      return response.result;
    }

    console.error('❌ Login failed: No token in response');
    return null;
  } catch (error) {
    console.error('❌ Authentication error:', error);
    return null;
  }
}

/**
 * Check if PLC is available
 */
export async function isPLCAvailable(): Promise<boolean> {
  const token = await getAuthToken();
  return token !== null;
}

/**
 * Log test info with timestamp
 */
export function logTestInfo(testName: string): void {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`\n📋 [${timestamp}] ${testName}`);
}

/**
 * Assert that auth token exists - throws if not
 */
export function requireAuthToken(): string {
  if (!authToken) {
    throw new Error('❌ Auth token not available - setup failed');
  }
  return authToken;
}
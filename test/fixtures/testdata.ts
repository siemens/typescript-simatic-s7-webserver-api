/**
 * Test Data Fixtures
 * Contains safe test data for WebServer integration tests
 * Based on official documentation requirements
 */

export const testData = {
  // Default pages - use empty string (always valid) for testing
  // In production, you would use paths like /~webapp1/index.html
  // Empty string means "use hardware config" which always exists
  validPages: [
    ''  // Empty string - resets to hardware config (always valid)
  ],

  // Valid default pages that MAY exist on your PLC
  // (These are examples - adjust based on your actual web applications)
  possiblePages: [
    '/~',
    '/~app/',
    '/~app/index.html',
    '/~webapp1/',
    '/~webapp1/index.html'
  ],

  // Response headers - pattern MUST be /~**/* according to documentation
  validHeaders: [
    {
      pattern: '/~**/*',
      header: 'Content-Security-Policy: frame-ancestors \'self\''
    },
    {
      pattern: '/~**/*',
      header: 'Content-Security-Policy: default-src \'self\''
    }
  ],

  // ========================================================
  // Diagnostic Buffer Test Data
  // ========================================================
  
  // Common project languages in RFC 4647 format
  // These are standard languages - you may need to adjust based on your project
  diagnosticLanguages: [
    'en-US',      // English - United States
    'en',         // English (generic)
    'de-DE',      // German - Germany
    'de',         // German (generic)
    'fr-FR',      // French - France
    'es-ES',      // Spanish - Spain
    'it-IT',      // Italian - Italy
    'ja-JP',      // Japanese - Japan
    'zh-CN'       // Chinese - China
  ],

  // Invalid language for error testing
  invalidLanguages: [
    'invalid-lang',
    'xx-YY',
    '',
    '123'
  ],

  // Filter test cases
  diagnosticFilters: {
    // Include only short and long text
    includeTextOnly: {
      mode: 'include',
      attributes: ['short_text', 'long_text']
    },
    // Include all attributes
    includeAll: {
      mode: 'include',
      attributes: ['short_text', 'long_text', 'help_text']
    },
    // Exclude help text
    excludeHelpText: {
      mode: 'exclude',
      attributes: ['help_text']
    }
  },

  // Count test cases
  diagnosticCounts: {
    statusOnly: 0,          // Return only status, no entries
    small: 10,              // Small result set
    default: 50,            // Default size
    large: 200              // Larger result set
  }
};
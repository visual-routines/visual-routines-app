/**
 * App Version Configuration
 * 
 * This is the single source of truth for the app version.
 * The GitHub Actions workflow reads these values and injects them into
 * the Android build.gradle during the build process.
 * 
 * When releasing a new version:
 * 1. Update VERSION_NAME to the new semantic version (e.g., "1.2.0")
 * 2. Increment VERSION_CODE by 1 (Google Play requires this to increase)
 * 3. Commit and push - the GitHub Action will handle the rest
 */

// User-visible version string (e.g., "1.0.0")
export const VERSION_NAME = "1.3.0";

// Android versionCode - must increment for each Google Play release
// This is an integer that Google Play uses to determine update order
export const VERSION_CODE = 3;

// Combined version info for display
export const APP_VERSION = {
  name: VERSION_NAME,
  code: VERSION_CODE,
  display: `v${VERSION_NAME}`,
  full: `v${VERSION_NAME} (${VERSION_CODE})`,
};

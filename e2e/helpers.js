/**
 * ============================================================================
 * Detox Helper Utilities
 * ============================================================================
 *
 * Purpose:
 * Centralized helper functions, reusable test data, test IDs, timeout values,
 * login flows, navigation flows, and network utilities used across all
 * Detox E2E test cases.
 *
 * Benefits:
 * - Avoid duplicate code
 * - Improve maintainability
 * - Keep test files clean and readable
 * ============================================================================
 */

const fs = require('fs');
const path = require('path');
const { expect: jestExpect } = require('@jest/globals');

/**
 * Reusable timeout constants
 */
const SHORT_TIMEOUT = 5000;
const MEDIUM_TIMEOUT = 8000;
const LONG_TIMEOUT = 10000;

/**
 * Load environment variables from .env file
 */
const env = loadEnv();

/**
 * Test data used across E2E test cases
 */
const DATA = {
  basicEmail: env.E2E_BASIC_EMAIL,
  validPhone: env.E2E_VALID_PHONE,
  invalidEmail: env.E2E_INVALID_EMAIL,
  spacedEmail: env.E2E_SPACED_EMAIL,
  malformedEmail: env.E2E_MALFORMED_EMAIL,
  shortPhone: env.E2E_SHORT_PHONE,
  passwordEmail: env.E2E_PASSWORD_EMAIL,
  hiddenPasswordEmail: env.E2E_HIDDEN_PASSWORD_EMAIL,
  wrongEmail: env.E2E_WRONG_EMAIL,
  wrongPassword: env.E2E_WRONG_PASSWORD,
  dashboardEmail: env.E2E_DASHBOARD_EMAIL,
  instituteRoleEmail: env.E2E_INSTITUTE_ROLE_EMAIL,
  singleInstituteMultiRoleEmail: env.E2E_SINGLE_INSTITUTE_MULTI_ROLE_EMAIL,
  multiInstituteSingleRoleEmail: env.E2E_MULTI_INSTITUTE_SINGLE_ROLE_EMAIL,
  noInstituteEmail: env.E2E_NO_INSTITUTE_EMAIL,
  validPassword: env.E2E_VALID_PASSWORD,
};

/**
 * Test IDs used for locating UI elements
 */
const IDS = {
  splash: 'splashScreen',
  brandname: 'mentrixos',
  login: 'loginScreen',
  email: 'emailInput',
  phone: 'phoneInput',
  join: 'joinButton',
  setup: 'setupButton',
  setupLink: 'setupLink',
  terms: 'termsLink',
  sendCodeEmail: 'sendCode',
  sendCodePhone: 'sendCodeButton',
  usePassword: 'usePasswordButton',
  password: 'passwordInput',
  passwordToggle: 'passwordToggle',
  continue: 'continueButton',
  back: 'backButton',
  error: 'errorBanner',
  networkError: 'networkError',
  otpInput: 'otpInput',
  otpBoxPrefix: 'otpBox_',
  themeToggle: 'themeToggleButton',
  instituteScreen: 'instituteScreen',
  instituteList: 'instituteList',
  instituteItemPrefix: 'instituteItem_',
  search: 'searchInput',
  clearSearch: 'clearSearchButton',
  emptyState: 'emptyStateText',
  instituteGreeting: 'instituteGreeting',
  roleScreen: 'roleSelectScreen',
  roleHeader: 'roleHeaderTitle',
  roleList: 'roleList',
  roleItemPrefix: 'roleItem_',
  selectedInstitute: 'selectedInstituteCard',
  changeInstitute: 'changeInstituteButton',
  dashboard: 'dashboardScreen',
  dashboardGreeting: 'dashboardGreeting',
  dashboardCardPrefix: 'dashboardCard_',
  profile: 'profileLogoutButton',
  logoutModal: 'logoutModal',
  logoutButton: 'logoutButton',
  cancelLogoutButton: 'cancelLogoutButton',
  retry: 'retryButton',
  supportEmail: 'supportEmailLink',
};

/**
 * Reads environment variables from .env file
 * and merges them with process.env values.
 */
function loadEnv() {
  const envPath = path.resolve(__dirname, '../.env');
  const parsed = {};

  if (fs.existsSync(envPath)) {
    const content = fs.readFileSync(envPath, 'utf8');
    content.split(/\r?\n/).forEach(line => {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) return;
      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (!match) return;
      const key = match[1].trim();
      let value = match[2].trim();
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1);
      }
      parsed[key] = value;
    });
  }

  return { ...parsed, ...process.env };
}

/**
 * Returns Detox element using testID.
 *
 * Example:
 * byId('loginButton')
 */
function byId(id) {
  return element(by.id(id));
}

/**
 * Returns Detox element using visible text.
 *
 * Example:
 * byText('Login')
 */
function byText(value) {
  return element(by.text(value));
}

/**
 * Launches a completely fresh instance
 * of the application before test execution.
 */
async function launchFreshApp() {
  await device.launchApp({ newInstance: true, delete: true });
  await waitForVisible(IDS.login, LONG_TIMEOUT);
}

/**
 * Waits until the specified element becomes visible.
 */
async function waitForVisible(id, timeout = SHORT_TIMEOUT) {
  await waitFor(byId(id)).toBeVisible().withTimeout(timeout);
}

/**
 * Waits until the specified text becomes visible.
 */
async function waitForText(text, timeout = SHORT_TIMEOUT) {
  await waitFor(byText(text)).toBeVisible().withTimeout(timeout);
}

/**
 * Verifies element visibility.
 */
async function expectVisible(id) {
  await expect(byId(id)).toBeVisible();
}

/**
 * Replaces text inside an input field.
 */
async function replaceText(id, value) {
  await waitForVisible(id);
  await byId(id).replaceText(value);
}

/**
 * Performs tap action on a UI element.
 */
async function tap(id) {
  await waitForVisible(id);
  await byId(id).tap();
}

/**
 * Enters email or phone identifier
 * on login screen.
 */
async function enterIdentifier(value) {
  await replaceText(IDS.email, value);
}

/**
 * Opens password screen from login screen.
 */
async function openPasswordScreen(email = DATA.basicEmail) {
  await enterIdentifier(email);
  await tap(IDS.usePassword);
  await waitForVisible(IDS.password);
}

/**
 * Performs password-based login flow.
 */
async function passwordLogin(email, password = DATA.validPassword) {
  await openPasswordScreen(email);
  await replaceText(IDS.password, password);
  await tap(IDS.continue);
}

/**
 * Sends OTP code and waits for OTP screen.
 */
async function sendCode(email = DATA.basicEmail) {
  await enterIdentifier(email);
  await tap(IDS.sendCodeEmail);
  await waitForVisible(IDS.otpInput, MEDIUM_TIMEOUT);
}

/**
 * Waits until any one of the provided screens
 * becomes visible and returns the visible screen ID.
 */
async function firstVisibleScreen(screenIds, timeout = MEDIUM_TIMEOUT) {
  const started = Date.now();
  while (Date.now() - started < timeout) {
    for (const id of screenIds) {
      try {
        await waitFor(byId(id)).toBeVisible().withTimeout(SHORT_TIMEOUT);
        return id;
      } catch (_) {}
    }
  }
  throw new Error(`None of these screens became visible: ${screenIds.join(', ')}`);
}

/**
 * Determines which screen user reaches after login.
 *
 * Possible screens:
 * - Dashboard
 * - Institute Selection
 * - Role Selection
 * - Error Screen
 */
async function expectPostLoginEntry() {
  return firstVisibleScreen(
    [IDS.dashboard, IDS.instituteScreen, IDS.roleScreen, IDS.error],
    LONG_TIMEOUT,
  );
}

/**
 * Complete login flow until Dashboard screen.
 */
async function loginToDashboard(email = DATA.dashboardEmail) {
  await passwordLogin(email);
  const screen = await expectPostLoginEntry();

  if (screen === IDS.instituteScreen) {
    await selectFirstInstitute();
  }

  if (screen === IDS.roleScreen || (await isVisible(IDS.roleScreen))) {
    await selectFirstRole();
  }

  await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
}

/**
 * Login flow until Institute Selection screen.
 */
async function loginToInstituteScreen(email = DATA.instituteRoleEmail) {
  await passwordLogin(email);
  await waitForVisible(IDS.instituteScreen, LONG_TIMEOUT);
}

/**
 * Login flow until Role Selection screen.
 */
async function loginToRoleScreen(email = DATA.singleInstituteMultiRoleEmail) {
  await passwordLogin(email);
  const screen = await expectPostLoginEntry();
  if (screen === IDS.instituteScreen) {
    await selectFirstInstitute();
  }
  await waitForVisible(IDS.roleScreen, LONG_TIMEOUT);
}

/**
 * Selects the first institute
 * from the institute list.
 */
async function selectFirstInstitute() {
  await waitForVisible(`${IDS.instituteItemPrefix}0`, LONG_TIMEOUT);
  await byId(`${IDS.instituteItemPrefix}0`).tap();
  await firstVisibleScreen([IDS.dashboard, IDS.roleScreen], LONG_TIMEOUT);
}

/**
 * Selects the first role
 * from the role list.
 */
async function selectFirstRole() {
  await waitForVisible(`${IDS.roleItemPrefix}0`, LONG_TIMEOUT);
  await byId(`${IDS.roleItemPrefix}0`).tap();
}

/**
 * Checks whether an element
 * is currently visible.
 */
async function isVisible(id) {
  try {
    await waitFor(byId(id)).toBeVisible().withTimeout(SHORT_TIMEOUT);
    return true;
  } catch (_) {
    return false;
  }
}

/**
 * Waits for either:
 * - Authentication failure
 * - Successful navigation
 */
async function waitForAuthFailureOrRecovery() {
  return firstVisibleScreen(
    [IDS.error, IDS.dashboard, IDS.instituteScreen, IDS.roleScreen],
    LONG_TIMEOUT + LONG_TIMEOUT,
  );
}

/**
 * Performs complete logout flow
 * and verifies redirection to Login Screen.
 */
async function confirmDashboardLogout() {
  await tap(IDS.profile);
  await waitForVisible(IDS.logoutModal, MEDIUM_TIMEOUT);
  await tap(IDS.logoutButton);
  try {
    await waitForVisible(IDS.login, LONG_TIMEOUT);
  } catch (error) {
    if (await isVisible(IDS.logoutModal)) {
      await tap(IDS.logoutButton);
    }
    await waitForVisible(IDS.login, LONG_TIMEOUT);
  }
}

/**
 * Blocks all network requests
 * for API failure testing.
 */
async function blockApiTraffic() {
  if (typeof device.setURLBlacklist === 'function') {
    await device.setURLBlacklist(['.*']);
  }
}

/**
 * Restores network connectivity
 * after API failure tests.
 */
async function unblockApiTraffic() {
  if (typeof device.clearURLBlacklist === 'function') {
    await device.clearURLBlacklist();
  }
}

/**
 * Export all reusable utilities,
 * constants, test data, and helper methods.
 */
module.exports = {
  SHORT_TIMEOUT,
  MEDIUM_TIMEOUT,
  LONG_TIMEOUT,
  DATA,
  IDS,
  jestExpect,
  byId,
  launchFreshApp,
  waitForVisible,
  waitForText,
  expectVisible,
  replaceText,
  tap,
  enterIdentifier,
  openPasswordScreen,
  passwordLogin,
  sendCode,
  firstVisibleScreen,
  expectPostLoginEntry,
  loginToDashboard,
  loginToInstituteScreen,
  loginToRoleScreen,
  selectFirstInstitute,
  selectFirstRole,
  isVisible,
  waitForAuthFailureOrRecovery,
  confirmDashboardLogout,
  blockApiTraffic,
  unblockApiTraffic,
};
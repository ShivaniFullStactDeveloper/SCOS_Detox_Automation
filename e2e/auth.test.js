require('./helpers/setup');

const {
  SHORT_TIMEOUT,
  LONG_TIMEOUT,
  DATA,
  IDS,
  expectVisible,
  waitForVisible,
  waitForText,
  tap,
  enterIdentifier,
  openPasswordScreen,
  passwordLogin,
  sendCode,
  loginToDashboard,
  launchFreshApp,
  replaceText,
  byId,
  expectPostLoginEntry,
  expectLoginScreen,
  expectDashboardScreen,
  unblockApiTraffic,
  logoutUser,
} = require('./helpers/auth');

describe('Auth Module', () => {

  /**
   * ==========================================================================
   * LOGIN SCREEN TEST CASES
   * ==========================================================================
   */

  /**
   * TC_01
   * Verify application launches successfully
   * and Login Screen is displayed.
   */
  it('TC_01 - App Open Successfully', async () => {
    await expectVisible(IDS.login);
  });

  /**
   * TC_02
   * Verify Splash Screen transitions
   * successfully to Login Screen.
   */
  it('TC_02 - Splash To Login Transition', async () => {
    await device.launchApp({ newInstance: true, delete: true });
    // Verify Splash Screen appears
    await waitForVisible(IDS.splash, SHORT_TIMEOUT);
    // Verify Login Screen appears
    await waitForVisible(IDS.login, LONG_TIMEOUT);
  });

  //TC_03
  // Verify MentrixOS brand title
  it('TC_03 - Login Screen Title Visible', async () => {
    await waitForText(IDS.brandname, SHORT_TIMEOUT);
  });

  // TC_04
  //  Verify Email / Phone input field is visible on Login Screen.
  it('TC_04 - Phone Or Email Placeholder Visible', async () => {
    await expectVisible(IDS.email);
  });

  // TC_05
  // Verify Join Institute button is visible.
  it('TC_05 - Join Institute Button Visible', async () => {
    await expectVisible(IDS.join);
  });

  // TC_06
  // Verify Setup Institute link is displayed.
  it('TC_06 - Setup Link Visible', async () => {
    await expectVisible(IDS.setup);
    await expectVisible(IDS.setupLink);
  });

  // TC_07
  // Verify Terms & Conditions link is displayed.
  it('TC_07 - Terms And Conditions Link Visible', async () => {
    await expectVisible(IDS.terms);
  });

  /**
   * ==========================================================================
   * LOGIN VALIDATION TEST CASES
   * ==========================================================================
   */

  // TC_08 - Empty Identifier Validation
  // Verify validation when user submits without email/phone.
  it('TC_08 - Empty Identifier Validation', async () => {
    await tap(IDS.join);
    await expectVisible(IDS.email);
  });

  // TC_09 - Valid Email Entry
  // Verify Send Code and Use Password options appear.
  it('TC_09 - Enter Valid Email Address', async () => {
    await enterIdentifier(DATA.basicEmail);
    await expectVisible(IDS.sendCodeEmail);
    await expectVisible(IDS.usePassword);
  });

  // TC_10 - Valid Phone Number Entry
  // Verify Send Code button appears.
  it('TC_10 - Enter Valid Phone Number', async () => {
    await enterIdentifier(DATA.validPhone);
    await expectVisible(IDS.sendCodePhone);
  });

  // TC_11 - Invalid Email Validation
  // Verify error message is displayed.
  it('TC_11 - Invalid Email Format Validation', async () => {
    await enterIdentifier(DATA.invalidEmail);
    await tap(IDS.usePassword);
    await expectVisible(IDS.error);
  });

  // TC_12 - Email With Spaces Validation
  // Verify validation message appears.
  it('TC_12 - Email With Leading Or Trailing Spaces', async () => {
    await enterIdentifier(DATA.spacedEmail);
    await expectVisible(IDS.error);
  });

  // TC_13 - Malformed Email Validation
  // Verify error message is displayed.
  it('TC_13 - Invalid Email Without Special Character', async () => {
    await enterIdentifier(DATA.malformedEmail);
    await tap(IDS.usePassword);
    await expectVisible(IDS.error);
  });

  // TC_14 - Invalid Phone Length Validation
  // Verify error message appears.
  it('TC_14 - Invalid Phone Number Length', async () => {
    await enterIdentifier(DATA.shortPhone);
    await tap(IDS.sendCodePhone);
    await expectVisible(IDS.error);
  });

  /**
   * ==========================================================================
   * PASSWORD LOGIN TEST CASES
   * ==========================================================================
   */

  // TC_15 - Navigate To Password Screen
  it('TC_15 - Navigate To Password Screen', async () => {
    await openPasswordScreen(DATA.basicEmail);
    await expectVisible(IDS.password);
  });

  // TC_16 - Empty Password Validation
  it('TC_16 - Empty Password Validation', async () => {
    await openPasswordScreen(DATA.passwordEmail);
    await tap(IDS.continue);
    await expectVisible(IDS.error);
  });

  // TC_17 - Invalid Password Login
  it('TC_17 - Login With Invalid Password', async () => {
    await passwordLogin(DATA.passwordEmail, DATA.wrongPassword);
    await waitForVisible(IDS.error, LONG_TIMEOUT);
  });

  // TC_18 - Password Visibility Toggle
  it('TC_18 - Password Visibility Toggle', async () => {
    await openPasswordScreen(DATA.hiddenPasswordEmail);
    await replaceText(IDS.password, DATA.validPassword);
    await tap(IDS.passwordToggle);
    await expectVisible(IDS.password);
  });

  // TC_19 - Invalid Credentials Validation
  it('TC_19 - Generic Error For Invalid Credentials', async () => {
    await passwordLogin(DATA.wrongEmail, DATA.wrongPassword);
    await waitForVisible(IDS.error, LONG_TIMEOUT);
  });

  // TC_20 - Password Masking Verification
  it('TC_20 - Password Field Masking', async () => {
    await openPasswordScreen(DATA.hiddenPasswordEmail);
    await replaceText(IDS.password, DATA.validPassword);
    await expectVisible(IDS.password);
  });

  // TC_21 - Navigate To OTP Screen
  it('TC_21 - Navigate To OTP Screen', async () => {
    await sendCode(DATA.basicEmail);
    await expectVisible(IDS.otpInput);
  });

  // TC_22 - OTP Boxes Visible
  it('TC_22 - OTP Input Boxes Visible', async () => {
    await sendCode(DATA.basicEmail);
    for (let index = 0; index < 6; index += 1) {
      await expectVisible(`${IDS.otpBoxPrefix}${index}`);
    }
  });

  // TC_23 - Successful Login Flow
  it('TC_23 - Successful Login Flow', async () => {
    await passwordLogin(DATA.dashboardEmail);
    await expectPostLoginEntry();
  });

  // TC_24 - Session Persistence After Relaunch
  it('TC_24 - Session Persistence After Relaunch', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await device.launchApp({ newInstance: true });
    await expectDashboardScreen();
  });

  /**
   * ==========================================================================
   * THEME TEST CASES
   * ==========================================================================
   */

  // TC_25 - Switch To Dark Mode
  it('TC_25 - Switch To Dark Mode', async () => {
    await tap(IDS.themeToggle);
    await expectVisible(IDS.login);
  });

  // TC_26 - Switch To Light Mode
  it('TC_26 - Switch To Light Mode', async () => {
    await tap(IDS.themeToggle);
    await tap(IDS.themeToggle);
    await expectVisible(IDS.login);
  });

  // TC_27 - Theme Persistence Verification
  it('TC_27 - Theme Persistence After Refresh', async () => {
    await tap(IDS.themeToggle);
    await device.reloadReactNative();
    await waitForVisible(IDS.login, LONG_TIMEOUT);
    await expectVisible(IDS.themeToggle);
  });

  it('TC_28 - Open Setup Institute Screen', async () => {
    await tap(IDS.setupLink);
    await expectVisible(IDS.login);
  });

  it('TC_29 - Back Navigation From Password Screen', async () => {
    await openPasswordScreen(DATA.basicEmail);
    await tap(IDS.back);
    await waitForVisible(IDS.login);
  });

it('TC_30 - Application Load Time Verification', async () => {
await launchFreshApp();
await expectLoginScreen();
});

it('TC_31 - Input Field Typing Performance', async () => {
await enterIdentifier(DATA.basicEmail);
await expectVisible(IDS.sendCodeEmail);
});

});
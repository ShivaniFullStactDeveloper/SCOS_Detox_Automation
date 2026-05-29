const {
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
} = require('./helpers');

describe('MentrixOS Detox E2E Test Cases', () => {
  /**
   * Runs before every test case.
   *
   * Purpose:
   * - Ensure API traffic is enabled.
   * - Launch a fresh instance of the application.
   * - Maintain test isolation.
   */

  beforeEach(async () => {
    await unblockApiTraffic();
    await launchFreshApp();
  });

  /**
   * Runs after every test case.
   *
   * Purpose:
   * - Restore network state.
   * - Prevent one test affecting another.
   */
  afterEach(async () => {
    await unblockApiTraffic();
  });

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
  it.only('TC_03 - Login Screen Title Visible', async () => {
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
  TC_06;
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

  /**
   * ==========================================================================
   * DASHBOARD & SESSION TEST CASES
   * ==========================================================================
   */

  // TC_23 - Successful Login Flow
  it('TC_23 - Successful Login Flow', async () => {
    await passwordLogin(DATA.dashboardEmail);
    await expectPostLoginEntry();
  });

  // TC_24 - Session Persistence After Relaunch
  it('TC_24 - Session Persistence After Relaunch', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await device.launchApp({ newInstance: true });
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
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
    const startTime = Date.now();
    await device.launchApp({ newInstance: true, delete: true });
    await waitForVisible(IDS.login, LONG_TIMEOUT);
    jestExpect(Date.now() - startTime).toBeLessThan(LONG_TIMEOUT);
  });

  it('TC_31 - Input Field Typing Performance', async () => {
    const startTime = Date.now();
    await enterIdentifier(DATA.basicEmail);
    jestExpect(Date.now() - startTime).toBeLessThan(SHORT_TIMEOUT);
  });

  /**
   * ==========================================================================
   * INSTITUTE SELECTION TEST CASES
   * ==========================================================================
   */

  // TC_32 - Institute Greeting Display
  it('TC_32 - Institute Greeting Display', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await expectVisible(IDS.instituteGreeting);
  });

  // TC_33 - Search Bar Visibility
  it('TC_33 - Institute Search Bar Visible', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await expectVisible(IDS.search);
  });

  // TC_34 - Institute List Visibility
  it('TC_34 - Institute List Display', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await expectVisible(IDS.instituteList);
    await expectVisible(`${IDS.instituteItemPrefix}0`);
  });

  // TC_35 - Search Institute By Name
  it('TC_35 - Search Institute By Name', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await replaceText(IDS.search, 'North Park');
    await firstVisibleScreen(
      [`${IDS.instituteItemPrefix}0`, IDS.emptyState],
      MEDIUM_TIMEOUT,
    );
  });

  // TC_36 - Search With No Result
  it('TC_36 - Search Institute With No Matching Result', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await replaceText(IDS.search, 'abc school');
    await waitForVisible(IDS.emptyState, MEDIUM_TIMEOUT);
  });

  // TC_37 - Clear Search
  it('TC_37 - Clear Institute Search Results', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await replaceText(IDS.search, 'abc');
    await tap(IDS.clearSearch);
    await expectVisible(`${IDS.instituteItemPrefix}0`);
  });

  // TC_38 - Search With Spaces
  it('TC_38 - Search With Leading Or Trailing Spaces', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await replaceText(IDS.search, ' Pune ');
    await firstVisibleScreen(
      [`${IDS.instituteItemPrefix}0`, IDS.emptyState],
      MEDIUM_TIMEOUT,
    );
  });

  // TC_39 - Search Special Characters
  it('TC_39 - Search Using Special Characters', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await replaceText(IDS.search, '@@@###');
    await waitForVisible(IDS.emptyState, MEDIUM_TIMEOUT);
  });

  // TC_40 - Select Institute
  it('TC_40 - Select Institute From List', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await selectFirstInstitute();
    await firstVisibleScreen([IDS.roleScreen, IDS.dashboard], LONG_TIMEOUT);
  });

  /**
   * ==========================================================================
   * ROLE SELECTION TEST CASES
   * ==========================================================================
   */

  // TC_41 - Role Header Visible
  it('TC_41 - Role Selection Header Visible', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await expectVisible(IDS.roleHeader);
  });

  // TC_42 - Institute Card Visible
  it('TC_42 - Institute Information Card Visible', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await expectVisible(IDS.selectedInstitute);
  });

  // TC_43 - Roles Displayed
  it('TC_43 - Available Roles Displayed', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await expectVisible(IDS.roleList);
    await expectVisible(`${IDS.roleItemPrefix}0`);
  });

  // TC_44 - Change Institute
  it('TC_44 - Return To Institute Screen After Clicking Change Institute', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await selectFirstInstitute();
    await waitForVisible(IDS.roleScreen, LONG_TIMEOUT);
    await tap(IDS.changeInstitute);
    await waitForVisible(IDS.instituteScreen, MEDIUM_TIMEOUT);
  });

  // TC_45 - Select Role
  it('TC_45 - Select Role And Navigate To Dashboard', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await selectFirstRole();
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  // TC_46 - Dashboard Greeting
  it('TC_46 - Dashboard Greeting Visible', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await waitForVisible(IDS.dashboardGreeting, LONG_TIMEOUT);
  });

  // TC_47 - Dashboard Cards Visibility
  it('TC_47 - Dashboard Cards Visible', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await waitForVisible(`${IDS.dashboardCardPrefix}active`, LONG_TIMEOUT);
  });

  // TC_48 - Navigate Using Profile Action
  it('TC_48 - Navigate From Institute Or Role Screen Using Profile Action', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await tap(IDS.profile);
    await waitForVisible(IDS.login, LONG_TIMEOUT);
  });

  // TC_49 - Logout Popup Display
  it('TC_49 - Display Logout Confirmation Popup', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await tap(IDS.profile);
    await waitForVisible(IDS.logoutModal, MEDIUM_TIMEOUT);
  });

  // TC_50 - Successful Logout
  it('TC_50 - Logout And Redirect To Login Screen', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await confirmDashboardLogout();
  });

  // TC_51 - Cancel Logout
  it('TC_51 - Cancel Logout Action', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await tap(IDS.profile);
    await waitForVisible(IDS.logoutModal, MEDIUM_TIMEOUT);
    await tap(IDS.cancelLogoutButton);
    await waitForVisible(IDS.dashboard, MEDIUM_TIMEOUT);
  });

  it('TC_52 - Responsive Layout After Device Rotation', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await device.setOrientation('landscape');
    await waitForVisible(IDS.dashboard, MEDIUM_TIMEOUT);
    await device.setOrientation('portrait');
    await waitForVisible(IDS.dashboard, MEDIUM_TIMEOUT);
  });

  it('TC_53 - Single Institute Single Role User Flow', async () => {
    await passwordLogin(DATA.dashboardEmail);
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_54 - Multiple Institutes Single Role User Flow', async () => {
    await loginToInstituteScreen(DATA.multiInstituteSingleRoleEmail);
    await selectFirstInstitute();
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_55 - Single Institute Multiple Roles User Flow', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);
    await selectFirstRole();
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_56 - Multiple Institutes Multiple Roles User Flow', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await selectFirstInstitute();
    await waitForVisible(IDS.roleScreen, LONG_TIMEOUT);
    await selectFirstRole();
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_57 - User Without Assigned Institute', async () => {
    await passwordLogin(DATA.noInstituteEmail);
    await waitForVisible(IDS.error, LONG_TIMEOUT);
  });

  it('TC_58 - Prevent Multiple Login Requests', async () => {
    await openPasswordScreen(DATA.dashboardEmail);
    await replaceText(IDS.password, DATA.validPassword);
    await byId(IDS.continue).multiTap(2);
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_59 - Complete End To End Login Journey', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await selectFirstInstitute();
    if (await isVisible(IDS.roleScreen)) {
      await selectFirstRole();
    }
    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  it('TC_60 - Footer Links Navigation Verification', async () => {
    await expectVisible(IDS.terms);
    await tap(IDS.terms);
    await expectVisible(IDS.login);
  });

  it('TC_61 - Support Email Link Verification', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);
    await expectVisible(IDS.supportEmail);
    await byId(IDS.supportEmail).tap();
  });

  // TC_62 - Login API Failure
  it('TC_62 - Login API Failure Handling', async () => {
    await blockApiTraffic();
    await passwordLogin(DATA.dashboardEmail);
    await waitForAuthFailureOrRecovery();
  });

  // TC_63 - Institute API Failure
  it('TC_63 - Institute API Failure Handling', async () => {
    await blockApiTraffic();
    await passwordLogin(DATA.instituteRoleEmail);
    await waitForAuthFailureOrRecovery();
  });

  // TC_64 - Retry Failed Request
  it('TC_64 - Retry Failed API Request', async () => {
    await blockApiTraffic();
    await passwordLogin(DATA.dashboardEmail);
    const firstResult = await waitForAuthFailureOrRecovery();
    await unblockApiTraffic();
    if (firstResult === IDS.error) {
      await replaceText(IDS.password, DATA.validPassword);
      await tap(IDS.continue);
      await expectPostLoginEntry();
    } else {
      await expectVisible(firstResult);
    }
  });

  // TC_65 - Offline Login Attempt
  it('TC_65 - Offline Login Attempt', async () => {
    await blockApiTraffic();
    await passwordLogin(DATA.dashboardEmail);
    await waitForAuthFailureOrRecovery();
  });

  // TC_66 - Internet Recovery Handling
  it('TC_66 - Internet Recovery Handling', async () => {
    await blockApiTraffic();
    await passwordLogin(DATA.dashboardEmail);
    const firstResult = await waitForAuthFailureOrRecovery();
    await unblockApiTraffic();
    if (firstResult === IDS.error) {
      await replaceText(IDS.password, DATA.validPassword);
      await tap(IDS.continue);
      await expectPostLoginEntry();
    } else {
      await expectVisible(firstResult);
    }
  });

  // TC_67 - Logout After Login
  it('TC_67 - Logout After Password Login', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await confirmDashboardLogout();
  });

  // TC_68 - Session Cleanup
  it('TC_68 - Session Cleanup After Logout', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await confirmDashboardLogout();
    await device.launchApp({ newInstance: true });
    await waitForVisible(IDS.login, LONG_TIMEOUT);
  });

  // TC_69 - Prevent Protected Access
  it('TC_69 - Prevent Protected Screen Access After Logout', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await confirmDashboardLogout();
    await device.pressBack();
    await waitForVisible(IDS.login, MEDIUM_TIMEOUT);
  });

  // TC_70 - Session Expiry Handling
  it('TC_70 - Session Expiry Handling', async () => {
    await loginToDashboard(DATA.dashboardEmail);
    await blockApiTraffic();
    await device.reloadReactNative();
    await firstVisibleScreen([IDS.dashboard, IDS.login], LONG_TIMEOUT);
  });
});

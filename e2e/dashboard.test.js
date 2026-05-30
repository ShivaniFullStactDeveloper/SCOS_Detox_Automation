require('./helpers/setup');

const {
  MEDIUM_TIMEOUT,
  LONG_TIMEOUT,
  DATA,
  IDS,
  byId,
  launchFreshApp,
  unblockApiTraffic,
  logoutUser,
  expectVisible,
  waitForVisible,
  tap,
  loginToDashboard,
  loginToInstituteScreen,
  loginToRoleScreen,
  passwordLogin,
  openPasswordScreen,
  replaceText,
  selectFirstInstitute,
  selectFirstRole,
  confirmDashboardLogout,
  navigateInstituteRoleToDashboard,
  expectDashboardScreen,
  expectLogoutModal,
} = require('./helpers/auth');

describe('Dashboard Module', () => {

  // TC_1 - Dashboard Greeting
  it('TC_1 - Dashboard Greeting Visible', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await expectDashboardScreen();
  });

  // TC_2 - Dashboard Cards Visibility
  it('TC_2 - Dashboard Cards Visible', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await expectDashboardScreen();
    await expectVisible(`${IDS.dashboardCardPrefix}active`);
  });

  // TC_3 - Navigate Using Profile Action
  it('TC_3 - Navigate From Institute Or Role Screen Using Profile Action', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await tap(IDS.profile);

    await waitForVisible(IDS.login, LONG_TIMEOUT);
  });

  // TC_4 - Logout Popup Display
  it('TC_4 - Display Logout Confirmation Popup', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await tap(IDS.profile);

    await expectLogoutModal();
  });

  // TC_5 - Successful Logout
  it('TC_5 - Logout And Redirect To Login Screen', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await confirmDashboardLogout();
  });

  // TC_6 - Cancel Logout
  it('TC_6 - Cancel Logout Action', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await tap(IDS.profile);
    await expectLogoutModal();

    await tap(IDS.cancelLogoutButton);

    await expectDashboardScreen();
  });

  // TC_7 - Responsive Layout After Device Rotation
  it('TC_7 - Responsive Layout After Device Rotation', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await device.setOrientation('landscape');
    await waitForVisible(IDS.dashboard, MEDIUM_TIMEOUT);

    await device.setOrientation('portrait');
    await waitForVisible(IDS.dashboard, MEDIUM_TIMEOUT);
  });

  // TC_8 - Single Institute Single Role User Flow
  it('TC_8 - Single Institute Single Role User Flow', async () => {
    await passwordLogin(DATA.dashboardEmail);

    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  // TC_9 - Multiple Institutes Single Role User Flow
  it('TC_9 - Multiple Institutes Single Role User Flow', async () => {
    await loginToInstituteScreen(DATA.multiInstituteSingleRoleEmail);

    await selectFirstInstitute();

    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  // TC_10 - Single Institute Multiple Roles User Flow
  it('TC_10 - Single Institute Multiple Roles User Flow', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await selectFirstRole();

    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  // TC_11 - Multiple Institutes Multiple Roles User Flow
  it('TC_11 - Multiple Institutes Multiple Roles User Flow', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await navigateInstituteRoleToDashboard();
  });

  // TC_12 - User Without Assigned Institute
  it('TC_12 - User Without Assigned Institute', async () => {
    await passwordLogin(DATA.noInstituteEmail);

    await waitForVisible(IDS.error, LONG_TIMEOUT);
  });

  // TC_13 - Prevent Multiple Login Requests
  it('TC_13 - Prevent Multiple Login Requests', async () => {
    await openPasswordScreen(DATA.dashboardEmail);

    await replaceText(IDS.password, DATA.validPassword);

    await byId(IDS.continue).multiTap(2);

    await waitForVisible(IDS.dashboard, LONG_TIMEOUT);
  });

  // TC_14 - Complete End To End Login Journey
  it('TC_14 - Complete End To End Login Journey', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await navigateInstituteRoleToDashboard();
  });

  // TC_15 - Footer Links Navigation Verification
  it('TC_15 - Footer Links Navigation Verification', async () => {
    await expectVisible(IDS.terms);

    await tap(IDS.terms);

    await expectVisible(IDS.login);
  });

  // TC_16 - Support Email Link Verification
  it('TC_16 - Support Email Link Verification', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await expectVisible(IDS.supportEmail);

    await byId(IDS.supportEmail).tap();
  });
});
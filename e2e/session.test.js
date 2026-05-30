require('./helpers/setup');

const {
  MEDIUM_TIMEOUT,
  LONG_TIMEOUT,
  DATA,
  IDS,
  launchFreshApp,
  unblockApiTraffic,
  blockApiTraffic,
  logoutUser,
  waitForVisible,
  firstVisibleScreen,
  loginToDashboard,
  confirmDashboardLogout,
  expectLoginScreen,
} = require('./helpers/auth');

describe('Session Module', () => {

  // TC_1 - Logout After Login
  it('TC_1 - Logout After Password Login', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await confirmDashboardLogout();
  });

  // TC_2 - Session Cleanup
  it('TC_2 - Session Cleanup After Logout', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await confirmDashboardLogout();

    await device.launchApp({ newInstance: true });

    await expectLoginScreen();
  });

  // TC_3 - Prevent Protected Access
  it('TC_3 - Prevent Protected Screen Access After Logout', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await confirmDashboardLogout();

    await device.pressBack();

    await waitForVisible(IDS.login, MEDIUM_TIMEOUT);
  });

  // TC_4 - Session Expiry Handling
  it('TC_4 - Session Expiry Handling', async () => {
    await loginToDashboard(DATA.dashboardEmail);

    await blockApiTraffic();

    await device.reloadReactNative();

    await firstVisibleScreen(
      [IDS.dashboard, IDS.login],
      LONG_TIMEOUT,
    );
  });
});
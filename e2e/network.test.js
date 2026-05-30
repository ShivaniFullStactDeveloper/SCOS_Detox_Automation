require('./helpers/setup');

const {
  LONG_TIMEOUT,
  DATA,
  IDS,
  launchFreshApp,
  unblockApiTraffic,
  blockApiTraffic,
  logoutUser,
  expectVisible,
  replaceText,
  tap,
  passwordLogin,
  waitForAuthFailureOrRecovery,
  expectPostLoginEntry,
} = require('./helpers/auth');

describe('Network Module', () => {

  // TC_1 - Login API Failure
  it('TC_1 - Login API Failure Handling', async () => {
    await blockApiTraffic();

    await passwordLogin(DATA.dashboardEmail);

    await waitForAuthFailureOrRecovery();
  });

  // TC_2 - Institute API Failure
  it('TC_2 - Institute API Failure Handling', async () => {
    await blockApiTraffic();

    await passwordLogin(DATA.instituteRoleEmail);

    await waitForAuthFailureOrRecovery();
  });

  // TC_3 - Retry Failed Request
  it('TC_3 - Retry Failed API Request', async () => {
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

  // TC_4 - Offline Login Attempt
  it('TC_4 - Offline Login Attempt', async () => {
    await blockApiTraffic();

    await passwordLogin(DATA.dashboardEmail);

    await waitForAuthFailureOrRecovery();
  });

  // TC_5 - Internet Recovery Handling
  it('TC_5 - Internet Recovery Handling', async () => {
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
});
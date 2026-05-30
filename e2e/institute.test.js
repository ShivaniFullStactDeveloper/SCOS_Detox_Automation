require('./helpers/setup');

const {
  MEDIUM_TIMEOUT,
  LONG_TIMEOUT,
  DATA,
  IDS,
  launchFreshApp,
  unblockApiTraffic,
  logoutUser,
  expectVisible,
  waitForVisible,
  replaceText,
  tap,
  firstVisibleScreen,
  loginToInstituteScreen,
  selectFirstInstitute,
  expectInstituteScreen,
} = require('./helpers/auth');

describe('Institute Module', () => {

  // TC_1 - Institute Greeting Display
  it('TC_1 - Institute Greeting Display', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await expectInstituteScreen();
    await expectVisible(IDS.instituteGreeting);
  });

  // TC_2 - Search Bar Visibility
  it('TC_2 - Institute Search Bar Visible', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await expectVisible(IDS.search);
  });

  // TC_3 - Institute List Visibility
  it('TC_3 - Institute List Display', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await expectVisible(IDS.instituteList);
    await expectVisible(`${IDS.instituteItemPrefix}0`);
  });

  // TC_4 - Search Institute By Name
  it('TC_4 - Search Institute By Name', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await replaceText(IDS.search, 'North Park');

    await firstVisibleScreen(
      [`${IDS.instituteItemPrefix}0`, IDS.emptyState],
      MEDIUM_TIMEOUT,
    );
  });

  // TC_5 - Search With No Result
  it('TC_5 - Search Institute With No Matching Result', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await replaceText(IDS.search, 'abc school');

    await waitForVisible(IDS.emptyState, MEDIUM_TIMEOUT);
  });

  // TC_6 - Clear Search
  it('TC_6 - Clear Institute Search Results', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await replaceText(IDS.search, 'abc');

    await tap(IDS.clearSearch);

    await expectVisible(`${IDS.instituteItemPrefix}0`);
  });

  // TC_7 - Search With Leading Or Trailing Spaces
  it('TC_7 - Search With Leading Or Trailing Spaces', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await replaceText(IDS.search, ' Pune ');

    await firstVisibleScreen(
      [`${IDS.instituteItemPrefix}0`, IDS.emptyState],
      MEDIUM_TIMEOUT,
    );
  });

  // TC_8 - Search Using Special Characters
  it('TC_8 - Search Using Special Characters', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await replaceText(IDS.search, '@@@###');

    await waitForVisible(IDS.emptyState, MEDIUM_TIMEOUT);
  });

  // TC_9 - Select Institute From List
  it('TC_9 - Select Institute From List', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await selectFirstInstitute();

    await firstVisibleScreen(
      [IDS.roleScreen, IDS.dashboard],
      LONG_TIMEOUT,
    );
  });
});
require('./helpers/setup');

const {
  DATA,
  IDS,
  launchFreshApp,
  unblockApiTraffic,
  logoutUser,
  expectVisible,
  tap,
  loginToInstituteScreen,
  loginToRoleScreen,
  selectFirstInstitute,
  selectFirstRole,
  expectInstituteScreen,
  expectRoleScreen,
  expectDashboardScreen,
} = require('./helpers/auth');

describe('Role Module', () => {

  /**
   * TC_41
   * Verify Role Selection Header is visible.
   */
  it('TC_41 - Role Selection Header Visible', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await expectRoleScreen();
  });

  /**
   * TC_42
   * Verify selected institute information card is visible.
   */
  it('TC_42 - Institute Information Card Visible', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await expectVisible(IDS.selectedInstitute);
  });

  /**
   * TC_43
   * Verify available roles are displayed.
   */
  it('TC_43 - Available Roles Displayed', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await expectVisible(IDS.roleList);
    await expectVisible(`${IDS.roleItemPrefix}0`);
  });

  /**
   * TC_44
   * Verify user can return to Institute screen
   * after clicking Change Institute.
   */
  it('TC_44 - Return To Institute Screen After Clicking Change Institute', async () => {
    await loginToInstituteScreen(DATA.instituteRoleEmail);

    await selectFirstInstitute();

    await expectRoleScreen();

    await tap(IDS.changeInstitute);

    await expectInstituteScreen();
  });

  /**
   * TC_45
   * Verify role selection navigates user
   * to Dashboard screen.
   */
  it('TC_45 - Select Role And Navigate To Dashboard', async () => {
    await loginToRoleScreen(DATA.singleInstituteMultiRoleEmail);

    await selectFirstRole();

    await expectDashboardScreen();
    await expectVisible(`${IDS.dashboardCardPrefix}active`);
  });
});
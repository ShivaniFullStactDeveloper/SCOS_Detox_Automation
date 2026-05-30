const {
  unblockApiTraffic,
  launchFreshApp,
  logoutUser,
} = require('./auth');

beforeEach(async () => {
  await unblockApiTraffic();
  await launchFreshApp();
});

afterEach(async () => {
  await unblockApiTraffic();

  try {
    await logoutUser();
  } catch (_) {}
});
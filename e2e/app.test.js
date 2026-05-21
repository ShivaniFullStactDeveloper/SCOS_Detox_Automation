const { expect: jestExpect } = require('@jest/globals');

describe('Login Screen Test Cases', () => {

  beforeAll(async () => {
    await device.launchApp({
      newInstance: true,
    });
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  // TC_01 - App Open Successfully
  it('TC_01 - App Open Successfully', async () => {

    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

  });

  // TC_02 - Splash to Login Transition
  it('TC_02 - Splash to Login Transition', async () => {

    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('loginScreen'))
    ).toBeVisible();

  });

  // TC_03 - App Title Visible
  it('TC_03 - App Title Visible', async () => {

    await waitFor(
      element(by.text('MentrixOS'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.text('MentrixOS'))
    ).toBeVisible();

  });

  // TC_04 - Placeholder Correct
  it('TC_04 - Placeholder Correct', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('emailInput'))
    ).toBeVisible();

  });

  // TC_05 - Join Button Visible
  it('TC_05 - Join Button Visible', async () => {

    await waitFor(
      element(by.id('joinButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('joinButton'))
    ).toBeVisible();

  });

  // TC_06 - Setup Link Visible
  it('TC_06 - Setup Link Visible', async () => {

    await waitFor(
      element(by.id('setupButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('setupButton'))
    ).toBeVisible();

  });

  // TC_07 - Terms Link Visible
  it('TC_07 - Terms Link Visible', async () => {

    await waitFor(
      element(by.id('termsLink'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('termsLink'))
    ).toBeVisible();

  });

  // TC_08 - Empty Phone or Email Field
  it('TC_08 - Empty Phone or Email Field', async () => {

    await waitFor(
      element(by.id('joinButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('joinButton')).tap();

    await expect(
      element(by.id('emailInput'))
    ).toBeVisible();

  });

  // TC_09 - If user type text or email
  it.only('TC_09 - If user type text or email', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('xyz@test.com');

    await waitFor(
      element(by.id('sendCode'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('sendCode'))
    ).toBeVisible();

    await expect(
      element(by.id('usePasswordButton'))
    ).toBeVisible();

  });

  // TC_10 - If user type number
  it('TC_10 - If user type number', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .clearText();

    await element(by.id('emailInput'))
      .typeText('1245679946');

    await waitFor(
      element(by.id('sendCodeButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('sendCodeButton'))
    ).toBeVisible();

  });

  // TC_11 - Invalid Email Format
  it('TC_11 - Invalid Email Format', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('abc@');

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });

  // TC_12 - Trim Spaces in Email
  it('TC_12 - Trim Spaces in Email', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText(' abc@test.com ');

    await element(by.id('sendCodeButton'))
      .tap();

    await waitFor(
      element(by.text('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.text('errorBanner'))
    ).toBeVisible();

  });

  // TC_13 - Special Character Email
  it('TC_13 - Special Character Email', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('testgmail.com');

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });

  // TC_14 - Invalid Number / Short Phone Number
  it('TC_14 - Invalid Number / Short Phone Number', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('12456799');

    await element(by.id('sendCodeButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });

  // TC_15 - Use Password Click
  it('TC_15 - Use Password Click', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('xyz@test.com');

    await waitFor(
      element(by.id('usePasswordButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('passwordInput'))
    ).toBeVisible();
  });

  // TC_16 - Empty Password Field
  it('TC_16 - Empty Password Field', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('a@scos.com');

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('continueButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });


  // TC_17 - 18 - Enter Valid Password
  it('TC_17 - Enter Valid Password', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('a@scos.com');

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    await waitFor(
      element(by.id('passwordToggle'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordToggle'))
      .tap();

    await expect(
      element(by.id('passwordToggle'))
    ).toBeVisible();

    await element(by.id('continueButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });


  // TC_20 - Generic Login Failure
  it('TC_20 - Generic Login Failure', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('wrong@test.com');

    await element(by.id('usePasswordButton'))
      .tap();

    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Wrong@123');

    await element(by.id('continueButton'))
      .tap();

    await waitFor(
      element(by.id('errorBanner'))
    )
      .toBeVisible()
      .withTimeout(10000);

    await expect(
      element(by.id('errorBanner'))
    ).toBeVisible();

  });

  // TC_21 - Password Hidden
  it('TC_21 - Password Hidden', async () => {

    // Open Password Screen
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('test@test.com');

    await element(by.id('usePasswordButton'))
      .tap();

    // Wait Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Enter Password
    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Check Password Field Visible
    await expect(
      element(by.id('passwordInput'))
    ).toBeVisible();

  });


  // TC_22 - Send Code via Email
  it('TC_22 - Send Code via Email', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('xyz@test.com');

    await waitFor(
      element(by.id('sendCode'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('sendCode'))
      .tap();

    // OTP Screen
    await waitFor(
      element(by.id('otpInputField'))
    )
      .toBeVisible()

  });


  // TC_24 - OTP Boxes Visible
  it('TC_24 - OTP Boxes Visible', async () => {

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('xyz@test.com');

    await waitFor(
      element(by.id('sendCode'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('sendCode'))
      .tap();

    await waitFor(
      element(by.id('otpInput'))
    )
      .toBeVisible()
      .withTimeout(10000);

    await expect(
      element(by.id('otpInput'))
    ).toBeVisible();

  });

  // TC_29 - Login Success
  it('TC_29 - Login Success', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Dashboard / Institute / Role Screen
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();

  });


  // TC_30 - Session Saved
  it('TC_30 - Session Saved', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();

    // Dashboard Screen
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Refresh App
    await device.reloadReactNative();

    // Verify Session Saved
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    await expect(
      element(by.id('dashboardScreen'))
    ).toBeVisible();

  });

  // TC_31 - Dark Mode Toggle
  it('TC_31 - Dark Mode Toggle', async () => {

    // Theme Toggle Visible
    await waitFor(
      element(by.id('themeToggleButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Theme Toggle
    await element(by.id('themeToggleButton'))
      .tap();

    // Verify Login Screen Still Visible
    await expect(
      element(by.id('loginScreen'))
    ).toBeVisible();

  });

  // TC_32 - Light Mode Toggle
  it('TC_32 - Light Mode Toggle', async () => {

    // Dark Mode Enable
    await waitFor(
      element(by.id('themeToggleButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('themeToggleButton'))
      .tap();

    // Switch Back To Light Mode
    await element(by.id('themeToggleButton'))
      .tap();

    // Verify Login Screen Visible
    await expect(
      element(by.id('loginScreen'))
    ).toBeVisible();

  });



  // TC_33 - Theme Persistence
  it('TC_33 - Theme Persistence', async () => {

    // Theme Toggle Visible
    await waitFor(
      element(by.id('themeToggleButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Enable Dark Mode
    await element(by.id('themeToggleButton'))
      .tap();

    // Refresh App
    await device.reloadReactNative();

    // Verify App Still Open
    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Verify Theme Toggle Exists
    await expect(
      element(by.id('themeToggleButton'))
    ).toBeVisible();

  });


  // TC_34 - Setup Institute
  it('TC_34 - Setup Institute', async () => {

    // Reload App to Login Screen
    await device.reloadReactNative();

    // Wait Login Screen
    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Setup Button
    await waitFor(
      element(by.id('setupButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Setup
    await element(by.id('setupButton'))
      .tap();

  });


  // TC_35 - Back from Password
  it('TC_35 - Back from Password', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('test@test.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Screen Visible
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Back Button
    await waitFor(
      element(by.id('backButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Back
    await element(by.id('backButton'))
      .tap();

    // Login Screen Visible Again
    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible();

  });

  // TC_37 - App Load Speed
  it('TC_37 - App Load Speed', async () => {

    const startTime = Date.now();

    await device.reloadReactNative();

    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(10000);

    const endTime = Date.now();

    const loadTime = endTime - startTime;

    console.log('App Load Time:', loadTime, 'ms');

    jestExpect(loadTime).toBeLessThan(8000);

  });


  // TC_38 - Input Speed
  it('TC_38 - Input Speed', async () => {

    // Wait Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(3000);

    // Start Time
    const startTime = Date.now();

    // Type Email
    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // End Time
    const endTime = Date.now();

    // Calculate Typing Time
    const typingTime = endTime - startTime;

    console.log('Typing Speed:', typingTime, 'ms');

    // Jest Assertion
    jestExpect(typingTime).toBeLessThan(2000);

  });


  // TC_40-41-42-43-44-45-46-47 - Institute Screen Greeting Text
  it('TC_40 - Institute Screen Greeting Text to search flow', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Institute Screen
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Greeting Text
    await waitFor(
      element(by.text('Hey Noah 👋'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.text('Hey Noah 👋'))
    ).toBeVisible();

    // Wait Institute List
    await waitFor(
      element(by.id('instituteCard'))
    )
      .toBeVisible()

    // Search Input
    await waitFor(
      element(by.id('searchInput'))
    )
      .toBeVisible()
    // .withTimeout(5000);

    await expect(
      element(by.id('searchInput'))
    ).toBeVisible();

    // Search Institute
    await element(by.id('searchInput'))
      .replaceText('North Park');

    // Matching Institute
    await waitFor(
      element(by.text('North Park'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.text('North Park'))
    ).toBeVisible();

    await element(by.id('searchInput'))
      .clearText();

    await element(by.id('searchInput'))
      .replaceText('abc school');

    // No Result Message
    await waitFor(
      element(by.id('emptyStateText'))
    )
      .toBeVisible();

    // Clear Search
    await waitFor(
      element(by.id('clearSearchButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('clearSearchButton'))
      .tap();

    await element(by.id('searchInput'))
      .clearText();

    // Institute List Visible Again
    await waitFor(
      element(by.id('instituteCard'))
    )
      .toBeVisible();

    await element(by.id('searchInput'))
      .replaceText(' Pune ');

    // Empty State
    await waitFor(
      element(by.id('emptyStateText'))
    )
      .toBeVisible();

    // Clear Existing Text
    await element(by.id('searchInput'))
      .clearText();

    // Enter Special Characters
    await element(by.id('searchInput'))
      .replaceText('@@@###');

    // Empty State Visible
    await waitFor(
      element(by.id('emptyStateText'))
    )
      .toBeVisible()

    // Clear Existing Text
    await element(by.id('searchInput'))
      .clearText();

  });

  // TC_48 - Select Institute
  it('TC_48 - Select Institute', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Institute Screen
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    await expect(
      element(by.id('instituteScreen'))
    ).toBeVisible();

    // Wait Institute Card
    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(10000);

    // Tap Institute Card
    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()


  });


  // TC_49 - Role Header Title Visible
  it('TC_49 - Role Header Title Visible', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('chris@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Header Title
    await waitFor(
      element(by.id('roleHeaderTitle'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('roleHeaderTitle'))
    ).toBeVisible();

  });


  // TC_50 - Institute Info Card Visible
  it('TC_50 - Institute Info Card Visible', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('chris@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(10000);

    // Institute Info Card
    await waitFor(
      element(by.id('selectedInstituteCard'))
    )
      .toBeVisible();

  });

  // TC_51 - Role Cards Visible
  it('TC_51 - Role Cards Visible', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('chris@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Teacher Role Card
    await waitFor(
      element(by.id('roleCard'))
    )
      .toBeVisible();

  });


  // TC_52 - 53 - Change Institute
  it('TC_52 - Change Institute', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Institute Screen
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('instituteScreen'))
    ).toBeVisible();

    // Wait Institute Card
    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Institute Card
    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Change Institute Button
    await waitFor(
      element(by.id('changeInstituteButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Change Institute
    await element(by.id('changeInstituteButton'))
      .tap();

    // Institute Screen Visible
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('instituteScreen'))
    ).toBeVisible();

    // Wait Institute Card
    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Institute Card
    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('roleScreen'))
    ).toBeVisible();

    // Teacher Role Card
    await waitFor(
      element(by.id('roleCard_0'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Role Card
    await element(by.id('roleCard_0'))
      .tap();

    // Dashboard Screen
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();
  });


  // TC_54 - 55 - Dashboard Greeting 
  it('TC_54 - Dashboard Greeting', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Greeting Text
    await waitFor(
      element(by.id('dashboardGreeting'))
    )
      .toBeVisible();

    // Dashboard Cards
    await waitFor(
      element(by.id('dashboardCard'))
    )
      .toBeVisible()

  });

  // TC_56 - Profile Click on Institute / Role Screen
  it('TC_56 - Profile Click on Institute / Role Screen', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('chris@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Profile Button
    await waitFor(
      element(by.id('profileLogoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Profile Button
    await element(by.id('profileLogoutButton'))
      .tap();

    // Login Screen Visible
    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()

  });


  // TC_57 - Profile Back Navigation on Dashboard
  it('TC_57 - Profile Back Navigation on Dashboard', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Profile Button
    await waitFor(
      element(by.id('profileLogoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Profile Button
    await element(by.id('profileLogoutButton'))
      .tap();

    // Logout Modal Visible
    await waitFor(
      element(by.id('logoutModal'))
    )
      .toBeVisible()

  });


  // TC_58 - Logout Flow
  it('TC_58 - Logout Flow', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Profile Button
    await waitFor(
      element(by.id('profileLogoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Profile Button
    await element(by.id('profileLogoutButton'))
      .tap();

    // Wait Logout Modal
    await waitFor(
      element(by.id('logoutModal'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Wait Logout Button
    await waitFor(
      element(by.id('logoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Logout
    await element(by.id('logoutButton'))
      .tap();

    // Login Screen
    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible();

  });


  // TC_59 - Cancel Logout
  it('TC_59 - Cancel Logout', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Continue Login
    await element(by.id('continueButton'))
      .tap();

    // Wait Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Profile Button
    await element(by.id('profileLogoutButton'))
      .tap();

    // Logout Modal
    await waitFor(
      element(by.id('logoutModal'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Cancel Button
    await waitFor(
      element(by.id('cancelLogoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Cancel
    await element(by.id('cancelLogoutButton'))
      .tap();

    // Dashboard Still Visible
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();
  });

  // TC_61 - Single Institute + Single Role
  it('TC_61 - Single Institute + Single Role', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();

    // Direct Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();
  });



  // TC_62 - Multiple Institute + Single Role
  it('TC_62 - Multiple Institute + Single Role', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('emily@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();

    // Institute Screen
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Select Institute
    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // Direct Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();

  });



  // TC_63 - Single Institute + Multiple Role
  it('TC_63 - Single Institute + Multiple Role', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('chris@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();

    // Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Select Role
    await waitFor(
      element(by.id('roleCard_0'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('roleCard_0'))
      .tap();

    // Dashboard
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    await expect(
      element(by.id('dashboardScreen'))
    ).toBeVisible();

  });



  // TC_64 - Multiple Institute + Multiple Role
  it('TC_64 - Multiple Institute + Multiple Role', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();

    // Institute Screen
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(15000);

    // Select Institute
    await waitFor(
      element(by.id('instituteCard_Mount Carmel School'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('instituteCard_Mount Carmel School'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Change Institute Button
    await waitFor(
      element(by.id('changeInstituteButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Change Institute
    await element(by.id('changeInstituteButton'))
      .tap();

    // Institute Screen Visible
    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('instituteScreen'))
    ).toBeVisible();

    // Wait Institute Card
    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Institute Card
    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // Wait Role Screen
    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('roleScreen'))
    ).toBeVisible();

    // Teacher Role Card
    await waitFor(
      element(by.id('roleCard_0'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // Tap Role Card
    await element(by.id('roleCard_0'))
      .tap();

    // Dashboard Screen
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible();
  });



  // TC_65 - No Institute Assigned
  it('TC_65 - No Institute Assigned', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('alex@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Login
    await element(by.id('continueButton'))
      .tap();


  });

  // TC_66 - Multiple Click Prevention
  it('TC_66 - Multiple Click Prevention', async () => {

    // Email Input
    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('ryan@scos.com');

    // Open Password Screen
    await element(by.id('usePasswordButton'))
      .tap();

    // Password Input
    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // Double Tap Continue
    await element(by.id('continueButton'))
      .multiTap(4);

    // Dashboard Visible
    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('dashboardScreen'))
    ).toBeVisible();

  });



  // TC_67 - Full Flow Validation
  it('TC_67 - Full Flow Validation', async () => {

    // =========================
    // LOGIN SCREEN
    // =========================

    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // =========================
    // DARK MODE TOGGLE
    // =========================

    await waitFor(
      element(by.id('themeToggleButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('themeToggleButton'))
      .tap();

    // =========================
    // LIGHT MODE TOGGLE
    // =========================

    await element(by.id('themeToggleButton'))
      .tap();

    // =========================
    // EMAIL INPUT
    // =========================

    await waitFor(
      element(by.id('emailInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('emailInput'))
      .replaceText('noah@scos.com');

    // =========================
    // OPEN PASSWORD SCREEN
    // =========================

    await element(by.id('usePasswordButton'))
      .tap();

    // =========================
    // PASSWORD INPUT
    // =========================

    await waitFor(
      element(by.id('passwordInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('passwordInput'))
      .replaceText('Admin@123');

    // =========================
    // LOGIN
    // =========================

    await element(by.id('continueButton'))
      .tap();

    // =========================
    // INSTITUTE SCREEN
    // =========================

    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('instituteScreen'))
    ).toBeVisible();

    // =========================
    // SELECT INSTITUTE
    // =========================

    await waitFor(
      element(by.id('instituteCard_North Park Academy'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('instituteCard_North Park Academy'))
      .tap();

    // =========================
    // ROLE SCREEN
    // =========================

    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // =========================
    // CHANGE INSTITUTE
    // =========================

    await waitFor(
      element(by.id('changeInstituteButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('changeInstituteButton'))
      .tap();

    // =========================
    // BACK TO INSTITUTE SCREEN
    // =========================

    await waitFor(
      element(by.id('instituteScreen'))
    )
      .toBeVisible()
      .withTimeout(10000);

    // =========================
    // SEARCH INSTITUTE
    // =========================

    await waitFor(
      element(by.id('searchInput'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('searchInput'))
      .replaceText('Mount Carmel');

    // =========================
    // SELECT SEARCHED INSTITUTE
    // =========================

    await waitFor(
      element(by.id('instituteCard_Mount Carmel School'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('instituteCard_Mount Carmel School'))
      .tap();

    // =========================
    // ROLE SCREEN AGAIN
    // =========================

    await waitFor(
      element(by.id('roleScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // =========================
    // SELECT ROLE
    // =========================

    await waitFor(
      element(by.id('roleCard_0'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('roleCard_0'))
      .tap();

    // =========================
    // DASHBOARD SCREEN
    // =========================

    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('dashboardScreen'))
    ).toBeVisible();

    // =========================
    // REFRESH APP
    // =========================

    await device.reloadReactNative();

    // =========================
    // VERIFY SESSION
    // =========================

    await waitFor(
      element(by.id('dashboardScreen'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('dashboardScreen'))
    ).toBeVisible();

    // =========================
    // PROFILE BUTTON
    // =========================

    await waitFor(
      element(by.id('profileLogoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('profileLogoutButton'))
      .tap();

    // =========================
    // LOGOUT MODAL
    // =========================

    await waitFor(
      element(by.id('logoutModal'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // =========================
    // LOGOUT BUTTON
    // =========================

    await waitFor(
      element(by.id('logoutButton'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await element(by.id('logoutButton'))
      .tap();

    // =========================
    // BACK TO LOGIN SCREEN
    // =========================

    await waitFor(
      element(by.id('loginScreen'))
    )
      .toBeVisible();

  });


  // TC_68 - Footer Links
  it('TC_68 - Footer Links', async () => {

    // Wait Footer
    await waitFor(
      element(by.id('footerContainer'))
    )
      .toBeVisible()
      .withTimeout(5000);

    // =========================
    // TERMS LINK
    // =========================

    await waitFor(
      element(by.id('termsLink'))
    )
      .toBeVisible()
      .withTimeout(5000);

    await expect(
      element(by.id('termsLink'))
    ).toBeVisible();

    // Tap Terms Link
    await element(by.id('termsLink'))
      .tap();
  });

});
import React, { useEffect, useRef } from 'react';
import { View, ActivityIndicator, StyleSheet, Text , Image,  } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { RootStackParamList } from '../navigation/RootNavigator';
import { STRINGS } from '../constants/strings';
import { appHeader } from '../theme/globalStyles';
import { insets } from '../theme/spacing';
import spacing from '../theme/spacing';
import Loader from '../components/common/Loader';
type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

const SplashScreen: React.FC<Props> = ({ navigation }) => {
  const { isAuthLoading } = useAuth();
  const { loaded: themeLoaded, colors, isDark } = useTheme();
  const hasNavigated = useRef<boolean>(false);

useEffect(() => {
  if (isAuthLoading || !themeLoaded || hasNavigated.current) return;

  const bootstrap = async (): Promise<void> => {
    hasNavigated.current = true;

    try {
      const [accessToken, preContextToken, storedUser] = await Promise.all([
        AsyncStorage.getItem('access_token'),
        AsyncStorage.getItem('pre_context_token'),
        AsyncStorage.getItem('user'),
      ]);

      // Splash screen 3 sec show
      setTimeout(() => {
        if (accessToken && storedUser) {
          navigation.replace('Dashboard');
          return;
        }

        if (preContextToken && storedUser) {
          navigation.replace('InstituteSelect');
          return;
        }

        navigation.replace('Login');
      }, 3000);

    } catch {
      setTimeout(() => {
        navigation.replace('Login');
      }, 3000);
    }
  };

  bootstrap();
}, [isAuthLoading, themeLoaded, navigation]);

  const logoSource = isDark
    ? require('../assets/images/white-logo.png')
    : require('../assets/images/black-logo.png');


  return (
   <View testID="splashScreen" style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <ActivityIndicator testID="splashLoader" size="large" color={colors.accentBlue} /> */}
        {/* ================= CENTER CONTENT ================= */}
      {/* <CenterView> */}
        
        {/* ================= LOGO ================= */}
        <Image
          source={logoSource}
         style={styles.logo}
        />

        {/* ================= TITLE ================= */}
        {/* Mentrix + OS (styled separately) */}
        <Text style={[styles.brandText, { color: colors.brandMentrix }]}>
          {STRINGS.BRAND_MENTRIX}

          <Text style={[styles.brandText, { color: colors.brandOS }]}>
            {STRINGS.BRAND_OS}
          </Text>
        </Text>

        {/* ================= LOADER ================= */}
        <Loader color={colors.brandOS} />

      {/* </CenterView> */}
    </View>

  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: insets.logoLg,
    height: insets.logoLg,
    marginBottom: spacing.sm + 2,
  },
  brandText: {
    fontSize: 30,
    fontWeight: '800',
  },
});



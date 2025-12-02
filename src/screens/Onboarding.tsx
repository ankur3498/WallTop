// src/screens/Onboarding.tsx
import React from 'react';
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  useWindowDimensions,
  ScrollView,
  Platform,
} from 'react-native';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";

const LOGO = require('../assets/images/logo.png');
const HERO = require('../assets/images/hero.png');
const GOOGLE = require('../assets/images/Google.png');

export default function Onboarding(){
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const BASE_WIDTH = 390;
  const scale = Math.max(0.85, Math.min(width / BASE_WIDTH, 1.2));

  const styles = getStyles({ width, height, scale, insetTop: insets.top });

  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView contentContainerStyle={styles.container} bounces={false}>
        <View style={styles.header}>
          <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          <Text style={styles.titleLogo}>WallTap</Text>
        </View>

        <View style={styles.cardWrap}>
          <Image source={HERO} style={styles.hero} resizeMode="cover" />
        </View>

        <View style={styles.copyWrap}>
          <Text style={styles.headline}>
            Transform Your Screen, One{'\n'}Wallpaper at a Time!
          </Text>

          <Text style={styles.sub}>
            Stunning wallpapers to transform your screen.{'\n'}
            Fresh designs, endless inspiration
          </Text>
        </View>

        <View style={styles.actionsRow}>
          <Pressable
            style={styles.primaryBtn}
            android_ripple={{ color: '#eee' }}
            onPress={() => navigation.navigate("HomeScreen" as never)}
          >
            <Text style={styles.primaryBtnText}>Get Started</Text>
            <Text style={styles.icon}>↗</Text>
          </Pressable>

          <Pressable style={styles.iconBtn} onPress={() => {}}>
            <Image
              source={GOOGLE}
              style={styles.googleLogo}
              resizeMode="contain"
            />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getStyles({
  width,
  height,
  scale,
  insetTop,
}: {
  width: number;
  height: number;
  scale: number;
  insetTop: number;
}) {
  const cardSize = Math.min(width * 0.82, 460) * scale;
  const heroRadius = Math.round(cardSize * 0.08);

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#050506' },
    container: {
      alignItems: 'center',
      paddingBottom: 36 * scale,
      paddingTop:
        insetTop + (Platform.OS === 'android' ? 8 * scale : 12 * scale),
      paddingHorizontal: 18 * scale,
    },

    header: {
      alignItems: 'center',
      paddingTop: 6 * scale,
      paddingBottom: 8 * scale,
    },
    logo: {
      width: 56 * scale,
      height: 56 * scale,
      marginBottom: 6 * scale,
      borderRadius: 12 * scale,
    },
    titleLogo: {
      color: '#fff',
      fontSize: 20 * scale,
      fontWeight: '800',
      letterSpacing: 0.2 * scale,
    },

    cardWrap: {
      width: cardSize,
      height: cardSize,
      borderRadius: heroRadius,

      marginVertical: 18 * scale,
    },

    hero: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
    },

    copyWrap: {
      width: Math.min(width - 36 * scale, 760),
      alignItems: 'center',
      marginTop: 6 * scale,
    },
    headline: {
      color: '#fff',
      fontSize: Math.max(20, 24 * scale),
      fontWeight: '800',
      textAlign: 'center',
      lineHeight: Math.round(36 * scale),
    },
    sub: {
      color: '#bfc0c2',
      textAlign: 'center',
      fontSize: 14 * scale,
      lineHeight: 22 * scale,
      maxWidth: width * 0.82,
      marginTop: 8 * scale,
    },

    actionsRow: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 36 * scale,
      paddingHorizontal: 8 * scale,
    },

    primaryBtn: {
      flex: 1,
      height: 62 * scale,
      marginRight: 12 * scale,
      backgroundColor: '#fff',
      borderRadius: 14 * scale,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
      elevation: 6,
      paddingHorizontal: 18 * scale,
    },
    primaryBtnText: {
      flex: 1,
      textAlign: 'left',
      fontSize: 16 * scale,
      fontWeight: '700',
      color: '#000',
    },
    icon: {
      marginLeft: 6 * scale,
      fontSize: 18 * scale,
      opacity: 0.9,
      color: '#000',
    },

    iconBtn: {
      width: 62 * scale,
      height: 62 * scale,
      borderRadius: 14 * scale,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 6,
    },
    googleLogo: {
      width: 32 * scale,
      height: 32 * scale,
    },
  });
}

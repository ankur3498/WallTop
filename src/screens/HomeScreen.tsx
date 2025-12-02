import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Dimensions } from 'react-native';

const categories = ['All', 'Nature', 'Abstract', 'Minimalist', 'Animals'];

const wallpapers = [
  { id: '1', image: require('../assets/images/wallpaper1.png') },
  { id: '2', image: require('../assets/images/wallpaper2.png') },
  { id: '3', image: require('../assets/images/wallpaper3.png') },
  { id: '4', image: require('../assets/images/wallpaper4.png') },
  { id: '5', image: require('../assets/images/wallpaper1.png') },
  { id: '6', image: require('../assets/images/wallpaper2.png') },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const width = Dimensions.get('screen').width;
  const scale = 1; // no dynamic scaling

  const scrollY = useRef(new Animated.Value(0)).current;
  const [pillsTop, setPillsTop] = useState(0);
  const [selected, setSelected] = useState('All');

  const styles = getStyles({ width, scale });

  // Title Hide/Show
  const titleOpacity = scrollY.interpolate({
    inputRange: [0, 40],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.headerRow}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
          />
          <Text style={styles.logoText}>WallTap</Text>
        </View>

        <TouchableOpacity>
          <Image
            source={require('../assets/images/Frame.png')}
            style={styles.settingIcon}
          />
        </TouchableOpacity>
      </View>
      <Animated.ScrollView
        style={styles.container}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false },
        )}
      >
        <Animated.Text style={[styles.title, { opacity: titleOpacity }]}>
          Your Perfect Screen,{'\n'}One Tap Away!
        </Animated.Text>
        <View
          onLayout={e => setPillsTop(e.nativeEvent.layout.y)}
          style={{ marginBottom: 10 * scale }}
        >
          <PillsComponent
            scale={scale}
            selected={selected}
            setSelected={setSelected}
            styles={styles}
          />
        </View>
        <View style={styles.grid}>
          {wallpapers.map(item => (
            <TouchableOpacity
              key={item.id}
              style={styles.card}
              onPress={() => {}}
            >
              <Image source={item.image} style={styles.wallpaper} />
            </TouchableOpacity>
          ))}
        </View>
      </Animated.ScrollView>
      {/* Sticky Pills */}
      <Animated.View
        style={[
          styles.stickyPillContainer,
          {
            top: 60 * scale,
            opacity: scrollY.interpolate({
              inputRange: [pillsTop - 10, pillsTop + 10],
              outputRange: [0, 1],
              extrapolate: 'clamp',
            }),
          },
        ]}
      >
        <PillsComponent
          scale={scale}
          selected={selected}
          setSelected={setSelected}
          styles={styles}
        />
      </Animated.View>
    </SafeAreaView>
  );
}

function PillsComponent({ styles, scale, selected, setSelected }: any) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 4 * scale }}
    >
      {categories.map((cat: string) => {
        const active = selected === cat;
        return (
          <TouchableOpacity
            key={cat}
            onPress={() => setSelected(cat)}
            style={[styles.pill, active && styles.activePill]}
          >
            <Text style={[styles.pillText, active && styles.activePillText]}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

function getStyles({ width, scale }: any) {
  const ITEM_ASPECT = 301 / 169;
  const ITEM_WIDTH = (width - 48 * scale) / 2;
  const ITEM_HEIGHT = ITEM_WIDTH / ITEM_ASPECT;

  return StyleSheet.create({
    safe: { flex: 1, backgroundColor: '#0B0B0B' },

    container: {
      flex: 1,
      paddingHorizontal: 16 * scale,
      marginTop: 60 * scale, // ScrollView header ke neeche start
    },
    headerRow: {
      position: 'absolute',
      top: ITEM_HEIGHT * 0.3,
      left: 0,
      right: 0,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16 * scale,
      paddingVertical: 14 * scale,
      backgroundColor: '#0B0B0B',
      zIndex: 999,
    },

    logo: {
      width: 32 * scale,
      height: 32 * scale,
      borderRadius: 8 * scale,
    },

    logoText: {
      fontSize: 20 * scale,
      fontWeight: '700',
      color: '#fff',
      marginLeft: 8 * scale,
    },

    settingIcon: {
      width: 22 * scale,
      height: 22 * scale,
      tintColor: '#fff',
    },

    title: {
      color: 'white',
      fontSize: 30 * scale,
      fontWeight: '700',
      marginBottom: 16 * scale,
      marginTop: 10 * scale,
      lineHeight: 36 * scale,
    },

    stickyPillContainer: {
      position: 'absolute',
      left: 0,
      width: '100%',
      backgroundColor: '#0B0B0B',
      paddingHorizontal: 16 * scale,
      paddingVertical: 4 * scale,
      zIndex: 50,
    },

    pill: {
      paddingHorizontal: 18 * scale,
      paddingVertical: 10 * scale,
      borderRadius: 25 * scale,
      backgroundColor: '#1A1A1A',
      marginRight: 12 * scale,
      marginTop: 30 * scale,
    },

    activePill: { backgroundColor: '#fff' },

    pillText: {
      color: '#aaa',
      fontSize: 14 * scale,
      fontWeight: '600',
    },

    activePillText: { color: '#000' },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginTop: 16 * scale,
    },

    card: {
      width: (width - 48) / 2,
      height: 300,
      borderRadius: 16,
      overflow: 'hidden',
      marginBottom: 16,
    },

    wallpaper: { width: '100%', height: '100%', resizeMode: 'cover' },
  });
}

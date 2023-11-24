import { View, Text, Image, StatusBar, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { useSharedValue, withSpring } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constant/theme';

export default function Onbording() {

    const ring1padding = useSharedValue(0);
    const ring2padding = useSharedValue(0);

    const navigation = useNavigation();

    useEffect(()=>{
        ring1padding.value = 0;
        ring2padding.value = 0;
        setTimeout(()=> ring1padding.value = withSpring(ring1padding.value+hp(5)), 100);
        setTimeout(()=> ring2padding.value = withSpring(ring2padding.value+hp(5.5)), 300);

        setTimeout(()=> navigation.navigate('Home'), 1000)
    },[])
  return (
  <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.white} barStyle='dark-content'/>

      <Animated.View style={[styles.logoContainer, { padding: ring2padding }]}>
        <Animated.View style={[styles.logoInnerContainer, { padding: ring1padding }]}>
          <Image source={require('../assets/images/welcome.png')} style={styles.logoImage} />
        </Animated.View>
      </Animated.View>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Shop Online</Text>
        <Text style={styles.punchline}>Shop Online is always right</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white, // This is equivalent to bg-amber-500
  },
  logoContainer: {
    backgroundColor: COLORS.light, // This is equivalent to bg-white/20
    borderRadius: wp(100), // A large value to make it a circle
    padding: wp(5), // Adjust the padding as needed
  },
  logoInnerContainer: {
    backgroundColor: COLORS.info,
    borderRadius: wp(100),
    padding: wp(5), // Adjust the padding as needed
  },
  logoImage: {
    width: wp(35), // Take up 100% of the container width
    height: hp(19), // Take up 100% of the container height
    borderRadius: wp(100), // A large value to make it a circle
  },
  titleContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: wp(5), // Adjust the font size as needed
    fontWeight: 'bold',
    color: COLORS.dark,
    letterSpacing: 2, // Adjust the letter spacing as needed
  },
  punchline: {
    fontSize: wp(4), // Adjust the font size as needed
    fontWeight: 'medium',
    color: COLORS.dark,
    letterSpacing: 2, // Adjust the letter spacing as needed
  },
});
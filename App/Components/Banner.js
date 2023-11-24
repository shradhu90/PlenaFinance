import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../Constant/theme';
const BannerCarousel = ({images}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
        height: hp(50),
        width: wp(100),
        borderRadius: wp(40),
        marginTop: wp(2),
      }}>
    <Swiper
        loop
        autoplay
        autoplayTimeout={5} // Adjust the auto swipe interval (in seconds)
        showsPagination // Show dots indicating the number of images
        dotStyle={{ backgroundColor: COLORS.secondary }}
        activeDotStyle={{ backgroundColor: 'white' }}>
        {
          images?.map((image, index) => (
            
            <View
              key={index}
              style={{
                flex: 1,
                borderRadius: wp(3),
                overflow: 'hidden', // Ensure images don't go outside the rounded container
              }}>
              <Image
                source={image ? { uri: image } : null}
                style={{ width: wp(100), height: hp(50) }}
                resizeMode='cover' />
            </View>
          ))}
      </Swiper>
      </View>
  );
};

export default BannerCarousel;

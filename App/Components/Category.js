import { View, Text, ScrollView, TouchableOpacity} from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { COLORS } from '../Constant/theme';

export default function Category({categories, activeCategory, handleChangeCategory}) {
  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: wp(1)}}
      >
        {
            categories.map((cat, index)=>{
                let isActive = cat == activeCategory;
                let activeButtonClass = isActive?  COLORS.secondary: COLORS.white;
                return (
                    <TouchableOpacity
                        key={index}
                        onPress={()=> handleChangeCategory(cat)}
                        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical:wp(2), paddingHorizontal:wp(1) }}
                    >
                        <View style={{borderRadius: wp(10),padding: wp(1.8),backgroundColor:activeButtonClass}}>
                        <Text style={{fontSize: hp(1.8),color: COLORS.dark }}>
                            {cat}
                        </Text>
                        </View>
                    </TouchableOpacity>
                )
            })
        }
      </ScrollView>
    </Animated.View>
  )
}

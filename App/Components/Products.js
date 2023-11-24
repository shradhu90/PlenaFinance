import { View, Text, Pressable, Image, TouchableOpacity, ToastAndroid } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MasonryList from '@react-native-seoul/masonry-list';
import Animated, { FadeInDown } from 'react-native-reanimated';
import Loading from './Loading';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constant/theme';
import { ShoppingCartIcon } from 'react-native-heroicons/solid';
import { useCart } from '../Services/CartContext';
import StarRating from 'react-native-star-rating-widget';
export default function Products({ filteredProducts }) {
    const navigation = useNavigation();
    return (
        <View className="mx-4 space-y-3">
            <Text style={{ fontSize: hp(3.1), color: COLORS.dark }}>Products</Text>
            <View>
                {
                    filteredProducts.length == 0 ? (
                        <Loading size="large" className="mt-20" />
                    ) : (
                        <MasonryList
                            data={filteredProducts}
                            keyExtractor={(item) => item.id}
                            numColumns={2}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }) => <RecipeCard item={item} index={i} navigation={navigation} />}
                            // refreshing={isLoadingNext}
                            // onRefresh={() => refetch({first: ITEM_CNT})}
                            onEndReachedThreshold={0.1}
                        // onEndReached={() => loadNext(ITEM_CNT)}
                        />
                    )
                }

            </View>
        </View>
    )
}

const RecipeCard = ({ item, index, navigation }) => {
    const { addToCart } = useCart();
    let isEven = index % 2 == 0;
    const handleAddToCart = (product) => {
        addToCart(product);
        ToastAndroid.show(`Item Added to Cart`, ToastAndroid.SHORT);
    };
    return (
        <Animated.View entering={FadeInDown.delay(index * 100).duration(600).springify().damping(12)}>
            <View style={{ flexDirection: 'column', marginBottom:wp(3) }}>
                <Pressable
                    style={{ width: '100%', paddingLeft: isEven ? 0 : 8, paddingRight: isEven ? 8 : 0, justifyContent: 'center', marginBottom: wp(2) }}
                    onPress={() => navigation.navigate('ProductDetail', { ...item })}
                >
                    <Image
                        source={{ uri: item.thumbnail }}
                        style={{ width: '100%', height: index % 3 == 0 ? hp(25) : hp(35), borderRadius: 35, backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    />
                </Pressable>
                <View style={{ flexDirection: 'row', marginHorizontal: wp(3), alignItems: 'center', justifyContent: 'space-between', width: wp(40) }}>
                    <View>
                        <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { ...item })}>
                            <Text style={{ fontSize: hp(1.5), fontWeight: 'bold', marginLeft: 2, color: COLORS.dark }}>
                                {
                                    item.title.length > 20 ? item.title.slice(0, 20) + '...' : item.title
                                }
                            </Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: hp(1.5), fontWeight: 'normal', marginLeft: 2, color: COLORS.dark }}>
                            $ {item.price}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => handleAddToCart(item)} style={{ backgroundColor: COLORS.white, borderRadius: 100 }}>
                        <ShoppingCartIcon size={hp(3)} strokeWidth={3} color={COLORS.secondaryLight} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', marginHorizontal: wp(2), alignItems: 'center', justifyContent: 'space-between', width: wp(40) }}>
                    <Text style={{ color: COLORS.dark, fontSize: wp(4) }}>Rating</Text>
                    <StarRating
                        rating={item.rating}
                        starSize={15}
                        color={COLORS.secondaryLight}
                    />
                </View>
            </View>
        </Animated.View>
    )
}
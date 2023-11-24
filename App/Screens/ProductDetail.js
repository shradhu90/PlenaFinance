import { View, Text, ScrollView, TouchableOpacity, StatusBar, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon, Square3Stack3DIcon, ReceiptPercentIcon, StarIcon, ShoppingBagIcon, ShoppingCartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Loading from '../Components/Loading';
import Animated, { FadeInDown, FadeIn } from 'react-native-reanimated';
import { COLORS } from '../Constant/theme';
import BannerCarousel from '../Components/Banner';
import { useCart } from '../Services/CartContext';
export default function ProductDetailScreen(props) {
    const { addToCart, cart } = useCart();
    let item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, setIsFavourite] = useState(false);
    const [product, setProduct] = useState(null);
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(true);

    const handleAddToCart = (product) => {
        addToCart(product);
        ToastAndroid.show(`Item Added to Cart`, ToastAndroid.SHORT);
    };
    useEffect(() => {
        getProductData(item.id);
    }, [])

    const getProductData = async (id) => {
        try {
            const response = await axios.get(`https://dummyjson.com/products/${id}`);
            if (response && response.data) {
                setProduct(response.data);
                setImages(response.data.images)
                setLoading(false);
            }
        } catch (err) {
            console.log('error: ', err.message);
        }
    }
    const onCartScreen = (product) => {
            navigation.navigate('Cart')
            addToCart(product);
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white, position: 'relative' }}>
            <StatusBar style={"light"} />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 30 }}
            >
                {/* image */}
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <BannerCarousel images={images} />

                </View>

                {/* back button */}
                <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{ width: '100%', position: 'absolute', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 14 }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8, borderRadius: 50, marginLeft: 10, backgroundColor: COLORS.white }}>
                        <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={COLORS.secondaryLight} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)} style={{ padding: 8, borderRadius: 50, marginRight: 10, backgroundColor: COLORS.white }}>
                            <HeartIcon size={hp(4.5)} strokeWidth={4.5} color={isFavourite ? "red" : "gray"} />
                        </TouchableOpacity>
                        <View style={{ padding: 8, borderRadius: 50, marginRight: 10, backgroundColor: COLORS.white }}>
                            <ShoppingCartIcon size={hp(4.5)} strokeWidth={3} color={COLORS.secondaryLight} />
                            {cart.length > 0 && (
                                <View
                                    style={{
                                        position: 'absolute',
                                        top: -5,
                                        right: -5,
                                        backgroundColor: 'red',
                                        borderRadius: 10,
                                        paddingHorizontal: 5,
                                    }}
                                >
                                    <Text style={{ color: 'white', fontSize: 12 }}>{cart.length}</Text>
                                </View>
                            )}
                        </View>
                    </View>

                </Animated.View>

                {/* Product description */}
                {
                    loading ? (
                        <Loading size="large" style={{ marginTop: wp(6) }} />
                    ) : (
                        <View style={{
                            paddingHorizontal: wp(4),
                            justifyContent: 'space-between',
                            paddingTop: 8,
                            paddingBottom: 8,
                        }} >
                            {/* name and area */}
                            <Animated.View entering={FadeInDown.duration(700).springify().damping(12)} style={{ paddingBottom: wp(2) }}>
                                <Text style={{ fontSize: hp(3), fontWeight: 'bold', flex: 1, color: COLORS.dark }}>
                                    {product?.title}
                                </Text>
                                <Text style={{ fontSize: hp(2), fontWeight: 'normal', flex: 1, color: COLORS.dark }}>$
                                    {product?.price}
                                </Text>
                            </Animated.View>

                            {/* misc */}
                            <Animated.View entering={FadeInDown.delay(100).duration(700).springify().damping(12)} style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <View style={{ flexDirection: 'column', borderRadius: 99, backgroundColor: COLORS.secondary, padding: wp(2) }}>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5), backgroundColor: COLORS.white, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                        <ShoppingBagIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={{ alignItems: 'center', paddingVertical: wp(2), justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: COLORS.dark }}>
                                            {product.stock}
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: COLORS.dark }}>
                                            Stock
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', borderRadius: 99, backgroundColor: COLORS.secondary, padding: 10 }}>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5), backgroundColor: COLORS.white, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                        <StarIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={{ alignItems: 'center', paddingVertical: wp(2), justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: COLORS.dark }}>
                                            {product.rating}
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: COLORS.dark }}>
                                            Rating
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', borderRadius: 99, backgroundColor: COLORS.secondary, padding: 10 }}>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5), backgroundColor: COLORS.white, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                        <ReceiptPercentIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={{ alignItems: 'center', paddingVertical: wp(2), justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: COLORS.dark }}>
                                            {product.discountPercentage}
                                        </Text>
                                        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: COLORS.dark }}>
                                            %
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'column', borderRadius: 99, backgroundColor: COLORS.secondary, padding: 10 }}>
                                    <View
                                        style={{ height: hp(6.5), width: hp(6.5), backgroundColor: COLORS.white, borderRadius: 99, alignItems: 'center', justifyContent: 'center' }}>
                                        <Square3Stack3DIcon size={hp(4)} strokeWidth={2.5} color="#525252" />
                                    </View>
                                    <View style={{ alignItems: 'center', paddingVertical: wp(2), justifyContent: 'space-between', }}>
                                        <Text style={{ fontSize: hp(2), fontWeight: 'bold', color: COLORS.dark }} className="font-bold text-neutral-700">
                                            {product.brand.length > 4 ? product.brand.slice(0, 4) + '...' : product.brand}
                                        </Text>
                                        <Text style={{ fontSize: hp(1.3), fontWeight: 'bold', color: COLORS.dark }} className="font-bold text-neutral-700">
                                            Brand
                                        </Text>
                                    </View>
                                </View>
                            </Animated.View>

                            {/* Description */}
                            <Animated.View entering={FadeInDown.delay(300).duration(700).springify().damping(12)} style={{ paddingVertical: wp(5) }}>
                                <Text style={{ flex: 1, fontSize: hp(2.5), fontWeight: 'bold', color: COLORS.dark }}>
                                    Description
                                </Text>
                                <Text style={{ fontSize: hp(1.6), color: COLORS.dark }}>
                                    {
                                        product?.description
                                    }
                                </Text>
                            </Animated.View>

                        </View>
                    )
                }
            </ScrollView>
            <View style={{
                bottom: wp(1),
                position: 'absolute',
                flexDirection: 'row',
                width: wp(85),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: wp(7)
            }}>
                <TouchableOpacity
                    onPress={() => handleAddToCart(item)}
                    style={{
                        width: wp(45),
                        height: wp(15),
                        backgroundColor: COLORS.secondary,
                        borderRadius: wp(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: wp(1),
                        flexDirection: 'row'
                    }}>
                    <ShoppingCartIcon size={hp(4)} strokeWidth={3} color={COLORS.white} />
                    <Text style={{ color: COLORS.white, fontSize: wp(5) }}>
                        Add to Cart
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    
                    style={{
                        width: wp(45),
                        height: wp(15),
                        backgroundColor: COLORS.secondary,
                        borderRadius: wp(10),
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: wp(1)
                    }}>
                    <Text style={{ color: COLORS.white, fontSize: wp(5) }}>
                        Buy Now
                    </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

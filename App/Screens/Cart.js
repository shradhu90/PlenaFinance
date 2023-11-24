// CartScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { useCart } from '../Services/CartContext';
import { COLORS } from '../Constant/theme';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon, NoSymbolIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, { FadeIn } from 'react-native-reanimated';
import CartCard from '../Components/CartCard';
const Cart = () => {
    const navigation = useNavigation();
    const { cart, removeFromCart, handleDecrement, handleIncrement, totalPrice } = useCart();

    const handleRemoveFromCart = (item) => {
        removeFromCart(item);
    };
    const handleDecrementFromCart = (item) => {
        handleDecrement(item)
    }
    return (
        <View style={{ flex: 1, backgroundColor: COLORS.white }}>
            <Animated.View entering={FadeIn.delay(200).duration(1000)} style={{ width: wp(15), height: wp(8), backgroundColor: COLORS.white }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: wp(3), borderRadius: wp(50), marginLeft: wp(1), backgroundColor: COLORS.white }}>
                    <ChevronLeftIcon size={hp(3.5)} strokeWidth={4.5} color={COLORS.secondaryLight} />
                </TouchableOpacity>
            </Animated.View>
            {cart.length === 0 ? (
                <View style={{ top: wp(10), justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <NoSymbolIcon size={hp(4)} strokeWidth={3} color={COLORS.dark} />
                    <Text style={{ color: COLORS.dark, fontSize: wp(6), marginHorizontal: wp(2) }}>Cart is empty</Text>
                </View>
            ) : (
                <FlatList
                    data={cart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <CartCard 
                        item={item} 
                        handleRemoveFromCart={handleRemoveFromCart} 
                        handleDecrementFromCart={handleDecrementFromCart} 
                        handleIncrement={handleIncrement}
                        />
                    )}
                />
            )}
            <View
                style={{
                    position: 'absolute',
                    bottom: wp(1),
                    width: wp(98),
                    height: wp(15),
                    backgroundColor: COLORS.secondary,
                    borderRadius: wp(10),
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginHorizontal: wp(1),
                }}>
                <Text style={{ color: COLORS.white, fontSize: wp(5) }}>
                    Total Price: $ {totalPrice}
                </Text>
            </View>
        </View>
    );
};

export default Cart;

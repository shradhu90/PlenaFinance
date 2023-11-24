import { View, Text,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS } from '../Constant/theme';

const CartCard = ({item,handleRemoveFromCart,handleDecrementFromCart,handleIncrement}) => {
    
    return (
        <View style={{ marginTop: wp(5), borderRadius: wp(8), overflow: 'hidden', backgroundColor: COLORS.white, elevation: 2, marginBottom: wp(15) }}>
            <Image source={{ uri: item.thumbnail }} style={{ width: '100%', height: 150, borderTopLeftRadius: 8, borderTopRightRadius: 8 }} />
            <View style={{ padding: 12 }}>
                <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.title}</Text>
                <Text style={{ fontSize: 14, color: 'gray', marginVertical: 4 }}>{item.description}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'green' }}>${item.price}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(2), justifyContent: 'space-between' }}>
                    <TouchableOpacity onPress={() => handleRemoveFromCart(item)}
                        style={{
                            backgroundColor: COLORS.secondaryLight,
                            padding: wp(2),
                            borderRadius: wp(10),
                            marginRight: wp(2),
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                        <Text style={{ color: 'white', padding:wp(1) }}>Remove Item</Text>
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => handleDecrementFromCart(item)}
                            style={{
                                backgroundColor: COLORS.secondaryLight,
                                padding: wp(2),
                                borderRadius: wp(10),
                                marginRight: wp(2),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ color: 'white', padding:wp(1) }}>-</Text>
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.quantity}</Text>
                        <TouchableOpacity onPress={() => handleIncrement(item)}
                            style={{
                                backgroundColor: COLORS.secondaryLight,
                                padding: wp(2),
                                borderRadius: wp(10),
                                marginLeft: wp(2),
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                            <Text style={{ color: 'white', padding:wp(1) }}>+</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default CartCard
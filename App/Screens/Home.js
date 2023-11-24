import { View, Text, ScrollView, Image, StatusBar, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios';
import { ShoppingCartIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../Constant/theme';
import Category from '../Components/Category';
import Products from '../Components/Products';
import { useCart } from '../Services/CartContext';
const Home = () => {
  const {  cart } = useCart();
  const navigation = useNavigation();
  const [activeCategory, setActiveCategory] = useState('smartphones');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([])
  useEffect(() => {
    getRecipes();
  }, [])
  
  useEffect(() => {
    // Filter products based on selected category
    if (activeCategory) {
      const filtered = products.filter(product => product.category === activeCategory);
      setFilteredProducts(filtered);
    } else {
      // If no category is selected, display all products
      setFilteredProducts(products);
    }
  }, [activeCategory, products]);

  const handleChangeCategory = category => {
    setActiveCategory(category);
  }
  
  const getRecipes = async () => {
    try {
      const response = await axios.get(`https://dummyjson.com/products`);
      //console.log('got : ',response.data.products);
      if (response && response.data) {
        setProducts(response.data.products);
        setCategories([...new Set(response.data.products.map(product => product.category))])
      }
    } catch (err) {
      console.log('error: ', err.message);
    }
  }
  const onCartScreen = () => {
    navigation.navigate('Cart')
  }
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollview}
      >
        <View style={styles.searchBarContainer}>
          <Image source={require('../assets/images/welcome.png')} style={{ width: wp(13), height: wp(13), borderRadius: wp(10) }} />
          <TouchableOpacity onPress={() => onCartScreen()} style={{ backgroundColor: COLORS.white, padding: wp(3), borderRadius: 100 }}>
            <ShoppingCartIcon size={hp(3)} strokeWidth={3} color={COLORS.secondaryLight} />
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
          </TouchableOpacity>
        </View>

        {/* categories */}
        <View>
          {categories.length > 0 && <Category categories={categories} activeCategory={activeCategory} handleChangeCategory={handleChangeCategory} />}
        </View>

        <View>
          <Products filteredProducts={filteredProducts} categories={categories} />
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white
  },
  scrollview: {
    paddingTop: 14, // pt-14
    paddingBottom: 50,
    paddingHorizontal: 6, // space-y-6
  },
  searchBarContainer: {
    marginHorizontal: 4, // mx-4
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 999, // rounded-full
    padding: 6, // p-[6px]
  }
})
export default Home

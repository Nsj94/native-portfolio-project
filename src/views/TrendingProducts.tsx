import {FlatList, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../App';

export default function TrendingProducts() {
  const [products, setProducts] = useState<Product[]>();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamsList>>();

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://fakestoreapi.com/products')
        .then(res => res.json())
        .then(json => setProducts(json));
    };
    fetchData();
  }, []);
  return (
    <View>
      <FlatList
        data={products}
        keyExtractor={(item: Product) => item.id.toString()}
        renderItem={({item}) => {
          return (
            <Pressable
              onPress={() =>
                navigation.push('SingleProductDetails', {productId: item.id})
              }>
              <ProductCard item={item} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const ProductCard = ({item}: any) => {
  return (
    <View style={styles.card}>
      {item?.image && (
        <Image style={{height: 120, width: 120}} source={{uri: item?.image}} />
      )}
      <View style={styles.mainContent}>
        <View style={styles.mainContentLeft}>
          <Text style={styles.title}>{item?.title}</Text>
          <Text style={styles.category}>{item?.category}</Text>
        </View>
        <View>
          <Text style={styles.price}>$ {item?.price}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '80%',
    padding: 20,
    elevation: 5,
    backgroundColor: '#fff',
    marginBottom: 5,
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  mainContent: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainContentLeft: {
    flex: 0.75,
  },
  title: {
    fontSize: 14,
  },
  category: {
    fontSize: 14,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

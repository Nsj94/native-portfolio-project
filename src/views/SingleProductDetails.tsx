import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

export default function SingleProductDetails({
  route,
}: {
  route: {params: {productId: number}};
}) {
  const {productId} = route.params;

  const [singleProductDetails, setSingleProductDetails] =
    useState<Product | null>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      await fetch(`https://fakestoreapi.com/products/${productId}`)
        .then(res => res.json())
        .then(json => {
          setSingleProductDetails(json);
          setLoading(false);
        });
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {singleProductDetails?.image && (
        <Image
          style={styles.image}
          source={{uri: singleProductDetails?.image}}
        />
      )}
      <View style={styles.mainContent}>
        <Text style={styles.title}>{singleProductDetails?.title}</Text>
        <Text style={styles.desc}>
          {singleProductDetails?.description.slice(0, 70)}...
        </Text>
        <Text style={styles.category}>{singleProductDetails?.category}</Text>
        <Text style={styles.price}>$ {singleProductDetails?.price}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
  },
  mainContent: {
    padding: 20,
    flex: 1,
    gap: 3,
  },
  image: {height: 200, width: 200, objectFit: 'contain'},
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    letterSpacing: 1,
  },
  desc: {
    fontSize: 15,
    fontStyle: 'italic',
    letterSpacing: 0.4,
  },
  category: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#000',
  },
});

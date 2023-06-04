import React, { useContext, useEffect } from "react";
import { Text, View, Button, Image, FlatList } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { userInfo, products, isLoading, logout, getProducts } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
  }, []);

  const renderItem = ({ item }) => (
    <View key={item.id}>
      <Text>{item.title}</Text>
      <Text>{item.description}</Text>
      <Image source={{ uri: item.image }} style={{ width: 200, height: 200 }} />
    </View>
  );

  return (
    <View className="flex-1 items-center justify-center">
      <Spinner visible={isLoading} />
      {userInfo && (
        <Text className="text-lg mb-8">Welcome {userInfo.user.name}</Text>
      )}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

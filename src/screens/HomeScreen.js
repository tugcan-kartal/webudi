import React, { useContext, useEffect } from "react";
import { Text, View, Button } from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { AuthContext } from "../context/AuthContext";

const HomeScreen = () => {
  const { userInfo, products, isLoading, logout, getProducts } = useContext(AuthContext);

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <View className="flex-1 items-center justify-center">
      <Spinner visible={isLoading} />
      {userInfo && (
        <Text className="text-lg mb-[8]">Welcome {userInfo.user.name}</Text>
      )}
      {products.map((product) => (
        <Text key={product.id}>{product.title}</Text>
      ))}
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

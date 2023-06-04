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
    <View className="bg-white p-6 border-[1px] border-gray-400 rounded-lg shadow-2xl my-[10%]" key={item.id}>
      <Image source={{ uri: item.image }} className="w-[75vw] h-[25vh]" />
      <Text className="text-gray-500 text-xl mt-[1vh]">{item.category.title}</Text>
      <Text className="text-lg font-semibold">{item.title}</Text>
      <Text className="text-md font-bold text-blue-500">{item.price} $</Text>
    </View>
  );

  return (
    <View className="flex items-center justify-center bg-gray-50 pb-[15vh]">
      <Spinner visible={isLoading} />
      {userInfo && (
        <View className="flex-row gap-x-4 pt-[5vh] pb-[5vh]">
          <Text className="text-xl">Welcome</Text>
          <Text className="text-xl font-bold">{userInfo.user.name}</Text>
        </View>
      )}
      <FlatList
        className="mb-[5vh]"
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
      <Button title="Logout" color="red" onPress={logout} />
    </View>
  );
};

export default HomeScreen;

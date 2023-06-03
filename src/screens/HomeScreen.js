import React,{useContext} from "react";
import {Text, View,Button} from "react-native";
import Spinner from "react-native-loading-spinner-overlay/lib";
import {AuthContext} from "../context/AuthContext";

const HomeScreen = () => {

    const {userInfo,isLoading} = useContext(AuthContext);

    return (
        <View className="flex-1 items-center justify-center">
            <Spinner visible={isLoading} />
            <Text className="text-lg mb-[8]">Welcome {userInfo.user.name}</Text>
            <Button title="Logout" color="red" />
        </View>
    );
};

export default HomeScreen;
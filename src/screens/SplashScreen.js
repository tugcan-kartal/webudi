import React from "react";
import { ActivityIndicator,View } from "react-native";

const SplashScreen = () => {
    return (
        <View className="flex-1 justify-center bg-[#06bcee]">
            <ActivityIndicator size="large" color="#ffffff"/>
        </View>
    )
};

export default SplashScreen;
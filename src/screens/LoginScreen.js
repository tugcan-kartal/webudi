import React,{useContext, useState} from "react";
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import { AuthContext } from "../context/AuthContext";


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const val=useContext(AuthContext);

    return (
        <View className="flex-1 items-center justify-center">
            <View className="w-[80%]">
                <Text>{val}</Text>
                <TextInput value={email} className="mt-[12] border-[1px] border-[#bbb] rounded-[5px] px-[14]" placeholder="Enter email" onChangeText={(text)=>setEmail(text)}/>
                <TextInput value={password} placeholder="Enter Password" onChangeText={(text)=>setPassword(text)} secureTextEntry/>

                <Button title="Login"/>

                <View className="flex-row gap-x-2 mt-[20]">
                    <Text>Don't have an account</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Register")}}>
                        <Text className="text-blue-600">Register</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    );
};

export default LoginScreen;
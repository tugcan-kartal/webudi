import React,{useContext, useState} from "react";
import {Button, Text, TextInput, TouchableOpacity, View} from "react-native";
import { AuthContext } from "../context/AuthContext";
import Spinner from "react-native-loading-spinner-overlay";


const LoginScreen = ({navigation}) => {

    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const {isLoading,login} = useContext(AuthContext);

    return (
        <View className="flex-1 items-center justify-center">
            <Spinner visible={isLoading}/>
            <View className="w-[80%]">
                <TextInput value={email} className="mt-[12] mb-[5%] border-[1px] border-[#bbb] rounded-[5px] px-[14]" placeholder="Enter email" onChangeText={(text)=>setEmail(text)}/>
                <TextInput value={password} className="mt-[12] mb-[10%] border-[1px] border-[#bbb] rounded-[5px] px-[14]" placeholder="Enter Password" onChangeText={(text)=>setPassword(text)} secureTextEntry/>

                <Button title="Login" onPress={()=>login(email,password)}/> 

                <View className="flex-row gap-x-4 mt-[20]">
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
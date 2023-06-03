import React,{useContext,useState} from "react";
import {
    Button,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    StyleSheet,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import {AuthContext} from '../context/AuthContext';


const RegisterScreen = ({navigation}) => {

    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const {isLoading,register}=useContext(AuthContext);


    return (
        <View className="flex-1 items-center justify-center">
            <Spinner visible={isLoading}/>
            <View className="w-[80%]">
                <TextInput className="mt-[12] border-[1px] border-[#bbb] rounded-[5px] px-[14px]" value={name} placeholder="Enter name" onChangeText={text=>setName(text)}/>
                <TextInput className="mt-[12] border-[1px] border-[#bbb] rounded-[5px] px-[14px]" value={email} placeholder="Enter email" onChangeText={text=>setEmail(text)}/>
                <TextInput className="mt-[12] border-[1px] border-[#bbb] rounded-[5px] px-[14px]" value={password} placeholder="Enter password" onChangeText={text=>setPassword(text)}/>

                <Button title="Register" onPress={()=>{register(name,email,password);}}/>

                <View className="flex-row mt-[20]">
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={()=>{navigation.navigate("Login")}}>
                        <Text className="text-blue-700">Login</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default RegisterScreen;
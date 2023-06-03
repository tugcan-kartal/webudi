import React, { createContext, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo,setUserInfo] = useState({});
    const [isLoading,setIsLoading] = useState(false);    

    const register = (name, email, password) => {
        setIsLoading(true);
        axios
            .post(`${BASE_URL}/register`, {
                name,
                email,
                password,
                password_confirmation: password,
            }, {
                headers: {
                'Content-Type': 'application/json',
                },
            })
            .then((res) => {
                let userInfo = res.data;
                setUserInfo(userInfo);
                AsyncStorage.setItem('userInfo', JSON.stringify(userInfo))
                .then(() => {
                  setIsLoading(false);
                  console.log(userInfo);
                })
                .catch((error) => {
                  console.log('AsyncStorage error:', error);
                  setIsLoading(false);
                });
                setIsLoading(false);
                console.log(userInfo);
            })
            .catch((error) => {
                console.log('register error:', error);
                if (error.response) {
                    console.log('register error response:', error.response);
                    console.log('register error data:', error.response.data);
                } else {
                    console.log(`register error ${error}`);
                }
                setIsLoading(false);
            });
            
      };
      

    return (
        <AuthContext.Provider value={{isLoading,userInfo,register}}>
            {children}
        </AuthContext.Provider>
    )
}
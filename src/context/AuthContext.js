import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../config";
import AsyncStorage from '@react-native-async-storage/async-storage'

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [userInfo,setUserInfo] = useState({});
    const [isLoading,setIsLoading] = useState(false);    
    const [splashLoading,setSplashLoading] = useState(false);

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
                alert("Kullanıcı Başarıyla Oluşturuldu");
                console.log(userInfo);
            })
            .catch((error) => {
                alert("Hata: " + error.response.data.message);
                console.log('register error:', error.response.data);
                setIsLoading(false);
            });
            
    };
      
    const login=(email,password)=>{
        setIsLoading(true);

        axios.post(`${BASE_URL}/login`,{
            email,
            password
        },{
            headers:{
                'Content-Type':'application/json'
            }
        }).then(res=>{
            let userInfo=res.data;
            console.log(userInfo);
            setUserInfo(userInfo);
            AsyncStorage.setItem('userInfo',JSON.stringify(userInfo));
            setIsLoading(false);
            alert("Giriş Başarılı");
        }).catch(error=>{
            alert("Hata: "+error.response.data.message);
            console.log(`login error ${error}`);
            setIsLoading(false);
        });
    };

    const logout=()=>{
        setIsLoading(true);
        AsyncStorage.removeItem('userInfo')
        .then(()=>{
            setUserInfo({});
            setIsLoading(false);
        }
        ).catch(error=>{
            console.log(`logout error ${error}`);
            setIsLoading(false);
        }   
        );
        alert("Çıkış Yapıldı");
    };

    const isLoggedIn=async()=>{
        try {
            setSplashLoading(true);

            let userInfo=await AsyncStorage.getItem('userInfo');
            userInfo=JSON.parse(userInfo);

            if (userInfo) {
                setUserInfo(userInfo); 
            } 

            setSplashLoading(false);
        } catch (error) {
            setSplashLoading(false);
            console.log(`is logged in error ${error}`);
        }
    };
    
    useEffect(()=>{
        isLoggedIn();
    },[]);

    return (
        <AuthContext.Provider value={{isLoading,userInfo,splashLoading,register,login,logout}}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { createContext } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const register = (name, email, password) => {
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
                console.log(userInfo);
            })
            .catch((error) => {
                if (error.response) {
                  console.log(error.response.data); // Hata yanıtını logla
                } else {
                  console.log(`register error ${error}`);
                }
              });
      };
      

    return (
        <AuthContext.Provider value={{register}}>
            {children}
        </AuthContext.Provider>
    )
}
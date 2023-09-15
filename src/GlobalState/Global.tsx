import axios from "axios";
import React, { createContext, PropsWithChildren, useState, useEffect } from "react";
import { Conversation } from "../Types/UsersTypes";

export const userContext = createContext<Conversation | null>(null);

export const GlobalFunc: React.FC<PropsWithChildren> = ({ children }) => {
  // const user_token = localStorage.getItem("auth_Token");
  // const [userData, setUserData] = useState<Conversation | undefined>();

  const a = "fghyuhj"
  // useEffect(() => {
  //   const getSingleUser = async () => {
  //     try {
  //       const config = {
  //         authorization: `Bearer ${user_token}`,
  //       };

  //       const res = await axios.get("http://localhost:1000/api/user/single_user", {
  //         headers: config,
  //       });

  //       setUserData(res.data); // Assuming res.data has the structure of Conversation
  //       console.log(res);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (user_token) {
  //     getSingleUser();
  //   }
  // }, [user_token]);

  return (
    <userContext.Provider value={{a}}>
      {children}
    </userContext.Provider>
  );
};
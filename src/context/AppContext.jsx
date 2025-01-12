"use client";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import {getItemFromLocalStorage} from "../../utils/localstorage";

export const AppContext = createContext(undefined);

const AppContextProvider = (props) => {
  const currencySymbol = "$";
  // const userIdFromLocal = localStorage.getItem("userId") || '';
  const userIdFromLocal = '';
  const backendUrl = process.env.NEXT_PUBLIC_API_URL;

  const [doctors, setDoctors] = useState(null);
  const [token, setToken] = useState(null);
  const [streamToken, setStreamToken] = useState()
  const [userData, setUserData] = useState(null);
  const [user1Data, setUser1Data] = useState(null);
  const [user2Data, setUser2Data] = useState(null);
  const [notifications, setNotifications] = useState(0)


  const [doctor, setDoctor] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    try {
      // setToken(localStorage.getItem("token"));
      setToken(getItemFromLocalStorage("token"));
      // setUserId(localStorage.getItem("userId"));
      setUserId(getItemFromLocalStorage("userId"));
    }
    catch (error) {
      console.log(error);
    }
  }, [setToken, token]);

  // Getting Doctors using API
  const getDoctosData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "api/doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "sss",
          "Cache-Control": "no-cache",
        },
      });
   console.log( data)
      console.log( 'dghdfgdfgdfgdfg' )
      if (data) {
        setDoctors(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getDoctor = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + `api/doctors/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "sss",
        },
      });
       console.log( 'getDoctore data' , data)

      if (data) {
        setDoctor(data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getUser1 = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + `api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data) {
        setUser1Data(data)
        // console.log('data---all--', data)
        return data;
      }
    } catch (error) {
      toast.error('User not found');
      // console.log(error);
    }
  };

  const getUser2 = async (id) => {
    try {
      const { data } = await axios.get(backendUrl + `api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (data) {
        setUser2Data(data)
        console.log('data---2--', data)
      }

    } catch (error) {
      toast.error('User not found');
      console.log(error);
    }
  };


    const getNotifications = async () => {
    try {
      const { data } = await axios.get('http://localhost:5173/api/notification/32', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
    if (data) {

        setNotifications(data)

       }

    } catch (error) {
      console.log(error);
    }
  };


    const getStreamToken = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:5173/api/token/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
        })

        if (data) {
        setStreamToken(data)
        }
    }
    catch (error) {
        console.log(error);
    }
    };






  // Getting User Profile using API
  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + `api/patients/${userIdFromLocal}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "sss",
          },
        }
      );

      if (data) {
        console.log("object data", data);
        setUserData(data.data);
      }
    } catch (error) {
      //   console.log(error);
      //   toast.error(error.message);
    }
  };

  const value = {
    doctors,
    getDoctosData,
    currencySymbol,
    backendUrl,
    setToken,
    loadUserProfileData,
    userId,
    setUserId,
    getDoctor,
    setUser2Data,
    setUser1Data,
    user1Data,
    user2Data,
    doctor,
    userData,
    setUserData,
    getUser2,
    getUser1,
    notifications,
    setNotifications,
    getNotifications,
    token,
    streamToken,
    getStreamToken,

  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;

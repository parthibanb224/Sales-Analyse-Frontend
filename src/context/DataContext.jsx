import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import jwtDecode from 'jwt-decode';

const DataContext = createContext({
  input: [],
  setInput: () => Promise,
  handleSignup: () => null,
  handleLogin: () => null,
  handleMail: () => null,
  loaded: "",
  setLoaded: () => Promise,
  signinUser: "",
  setSigninUser: () => Promise,
  handleLogout: () => null,
  isLoggedin: Boolean,
  setIsLoggedin: () => Promise,
  data: [],
  setData: () => Promise,
  fetchData: () => null,
  selectedMonth: 'March',
  setSelectedMonth: () => Promise,
  filteredData: () => null,
})

export const useData = () => useContext(DataContext);

export default function DataContextProvider({ children }) {
  const [input, setInput] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [loaded, setLoaded] = useState("");
  const [signinUser, setSigninUser] = useState("");
  const [data, setData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('March');

  // useEffect(() => {
  //   const URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/users/${signinUser}` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/users/${signinUser}`;
  //   axios.get(URL)
  //     .then(res => {
  //       // console.log(res.data.result);
  //       setUser(res.data.result);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // }, [signinUser])

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const URL =
        import.meta.env.MODE === 'development'
          ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/data/get`
          : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/data/get`;

      const response = await axios.get(URL);
      setData(response.data.result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const navigat = useNavigate();
  const handleSignup = (event) => {
    event.preventDefault();
    const SIGNUP_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/signup/createUser` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/signup/createUser`;
    axios.post(SIGNUP_URL, input)
      .then(res => {
        navigat('/login')
      })
      .catch(err => {
        alert("Something Went Wrong")
        console.log("Account Created Failed", err);
      })
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const axiosConfig = {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    };
    const LOGIN_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/login` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/login`;
    axios.post(LOGIN_URL, input, axiosConfig)
      .then(res => {
        if (res.data.success) {
          if (res.data.message === "Login Successful!!") {
            sessionStorage.setItem("Authorization", res.data.token);
            var decoded = jwtDecode(res.data.token);
            // sessionStorage.setItem("Token", JSON.stringify(decoded))
            setSigninUser(decoded.name);
            setIsLoggedin(true);
            navigat('/', { replace: true });
          }
          else {
            alert("Password is wrong, Try Again!!");
          }
        }
        else {
          alert("Account Does not Exists, Please create your account to continue!!");
        }
      })
      .catch(err => {
        alert("Something Went Wrong");
        console.log(err);
      })
  }


  const handleMail = (event) => {
    event.preventDefault();
    // toast("Email Sending.....",{autoClose: 2000,pauseOnHover: false});
    setLoaded("true");
    const FORGOT_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/forgot` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/forgot`;
    axios.put(FORGOT_URL, input)
      .then(response => {
        if (response.data.success) {
          setLoaded("false");
          toast("Email Sending Successfully");
          // alert(`${response.data.message} => Go to Mail`)
        }
      })
      .catch(err => {
        setLoaded("false");
        toast("Enter Valid Email");
      })
  }

  const handleLogout = async (event) => {
    const axiosConfigs = {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, private',
      },
    };
    const LOGOUT_URL = import.meta.env.MODE === 'development' ? `${import.meta.env.VITE_REACT_APP_DEV_URL_FOR_BACKEND}/login/logout` : `${import.meta.env.VITE_REACT_APP_PRO_URL_FOR_BACKEND}/login/logout`;
    await axios.post(LOGOUT_URL, axiosConfigs)
      .then(res => {
        if (res.data === "Logged out successfully") {
          setIsLoggedin(false);
          sessionStorage.removeItem('Authorization');
          navigat('/', { replace: true });
          window.location.reload();
        }
      })
      .catch(err => console.log(err))
  }

  // Helper function to get month number from month name
  const monthNumber = (monthName) => {
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    return months.indexOf(monthName);
};

// Filter data based on selected month
const filteredData = selectedMonth
    ? data.filter((record) => {
        const saleMonth = new Date(record.dateOfSale).getMonth();
        return saleMonth === monthNumber(selectedMonth);
    })
    : data;




  const value = {
    input,
    setInput,
    handleSignup,
    handleLogin,
    handleMail,
    loaded,
    signinUser,
    setSigninUser,
    isLoggedin,
    handleLogout,
    setIsLoggedin,
    data,
    setData,
    fetchData,
    selectedMonth,
    setSelectedMonth,
    filteredData,
  }

  return (
    <DataContext.Provider value={value}>{children}</DataContext.Provider>
  )
};

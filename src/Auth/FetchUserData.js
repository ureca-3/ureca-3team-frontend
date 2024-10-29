import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_DOMAIN } from "../api/domain";
import axios from "axios";

const FetchUserData = () => {
    const [accessToken, setAccessToken] = useState('');
    const [childData, setChildData] = useState(null);
    const location = useLocation();

    const getChildData = async (token) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/child`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            console.log(response.data.result);
            setChildData(response.data.result);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const token = queryParams.get("token");

        if (token) {
            setAccessToken(token);
            localStorage.setItem("jwtToken", token);
            getChildData(token);
        }

    }, [location.search]);

    useEffect(() => {
        if (childData === null) {
            window.location.replace("http://localhost:3000/mypage");
        } else {
            window.location.replace("http://localhost:3000/register");
        }
    }, [childData]);

    return null;
};

export default FetchUserData;

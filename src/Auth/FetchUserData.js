import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { API_DOMAIN, CLIENT_DOMAIN } from "../api/domain";
import axios from "axios";

const FetchUserData = () => {
    const [accessToken, setAccessToken] = useState('');
    const [childData, setChildData] = useState(null);
    const [userRole, setUserRole] = useState('');
    const location = useLocation();

    const getData = async (accessToken) => {
        const kakaoUser = await axios.get(`${API_DOMAIN}/auth/user`, {
            headers:
            {
                Authorization: `Bearer ${accessToken}`

            }
        });

        // console.log(kakaoUser.data.result.id);
        setUserRole(kakaoUser.data.result.role);
        return kakaoUser.data.result.oauthInfo;
    }

    const getChildData = async (token) => {
        try {
            const response = await axios.get(`${API_DOMAIN}/child`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            // console.log(response.data);
            setChildData(response.data);
            console.log(childData.result)
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
            getData(token); 
        } 
        else {
            window.location.href = `${CLIENT_DOMAIN}/sign`;
        }

    }, [location.search]);

    useEffect(() => {
        if (userRole && userRole === "USER") getChildData(accessToken);
        if (userRole && userRole === "GUEST") window.location.href = `${CLIENT_DOMAIN}/admin`;
    }, [userRole, accessToken]);

    useEffect(() => {
        if (childData !== null) {
            if (childData.result && childData.result.length > 0) window.location.href = `${CLIENT_DOMAIN}/mypage`;
            else window.location.href = `${CLIENT_DOMAIN}/register`;
        }
    }, [childData]);

    return null;
};

export default FetchUserData;

import { Cookies } from 'react-cookie';

const cookies = new Cookies();

// Refresh Token을 cookie에 저장
export const setRefreshToken = (refreshToken) => {
    const today = new Date();
    const expireDate = today.setDate(today.getDate + 7);

    return cookies.set('refereshToken', refreshToken, {
        sameSite: 'strict',
        path: "/",
        expires: new Date(expireDate)
    });
};

// cookie에 저장된 Refresh Token 값을 갖고 오기
export const getCookieToken = () => {
    return cookies.get('refreshToken');
}

// cookie 삭제 
export const removeCookieToken = () => {
    return cookies.remove('refreshToken', {
        sameSite: 'strict',
        path: "/"
    })
}
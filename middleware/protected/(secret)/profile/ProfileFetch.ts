import Cookies from "universal-cookie";

export const userDataFetcher = async (url) => {
    const cookies = new Cookies();
    const token = await cookies.get('@Token');
    console.log("profile fetch token : ", token)
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).then(res => res.json());
};
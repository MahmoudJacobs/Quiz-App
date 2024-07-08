export const getBaseUrl = () => "https://upskilling-egypt.com:3005";
export const getRequestHeaders = () => {
    return { Authorization: `${localStorage.getItem("token")}` };
};
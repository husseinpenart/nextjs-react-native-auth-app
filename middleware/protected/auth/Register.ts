export const RegisterFetcher = async (url, options) => {
    const response = await fetch(url, options);
    const data = await response.json();
    return { status: response.status, data };
};
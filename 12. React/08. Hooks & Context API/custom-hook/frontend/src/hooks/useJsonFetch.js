import { useEffect, useState } from 'react';

const fetchUrl = async (url) => {
    const response = await fetch(url);
    if (response.status !== 200) {
        return response.statusText;
    }
    const data = await response.json();
    return data;
};

export const useJsonFetch = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetchUrl(url);
            setData(response);
        } catch (error) {
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [url]);

    return { data, loading };
};

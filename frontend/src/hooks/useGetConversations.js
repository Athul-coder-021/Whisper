import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    const [conversations, setConversations] = useState([]);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true)
            try {
                const res = await fetch('/api/users');//by default get request so we don't need to add the options as we did for POST request
                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);

            } catch (error) {
                toast.error(error.message);
            }
            finally {
                setLoading(false);
            }
        }

        getConversations();
    }, []);

    return { loading, conversations };
}

export default useGetConversations
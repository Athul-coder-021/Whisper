import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const useSignup = () => {
    const [loading,setLoading] = useState(false);
    const {setAuthUser} = useAuthContext();

    const signup = async({fullname,username,password,confirmPassword,gender})=>{
        const success = handleInputErrors({fullname,username,password,confirmPassword,gender})
        if(!success)return;
        let fullName = fullname;
        setLoading(true);
        try {
            const res = await fetch("/api/auth/signup",{
                method:"POST",
                headers:{"Content-Type":"application/json"},
                body:JSON.stringify({fullName,username,password,confirmPassword,gender})
            })

            const data = await res.json();
            console.log(data);
            if(data.error)
            {
                throw new Error(data.error)
            }
            
            //we store this user to localstorage so that we know that the user is loggedin
            localStorage.setItem("chat-user",JSON.stringify(data))
            //context
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    return {loading,signup};
};
export default useSignup

function handleInputErrors({fullname,username,password,confirmPassword,gender})
{
    if(!fullname||!username||!password||!confirmPassword||!gender)
    {
        toast.error('Please fill in all fields')
        // console.log("error");
        // console.log(fullname);
        // console.log(username);
        // console.log(password);
        // console.log(confirmPassword);
        // console.log(gender);

        return false;
    }

    if(password!=confirmPassword)
    {
        toast.error('Passwords do not match')
        return false;
    }

    if(password.length <6)
    {
        toast.error('Password must be atleast of 6 characters')
        return false;
    }

    return true;
}
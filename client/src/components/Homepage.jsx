import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";

export default function Homepage() {
    const [isLogged, setisLogged] = useState(false);
    const [username,setUsername] = useState("");

    async function fetchusername() {
        const username1 = await axios.post("http://localhost:8000/api/users/check", {token: localStorage.getItem("token")});
        setUsername(username1.data.username)
    }

    useEffect(() => {
        if(localStorage.getItem("token")){
            fetchusername();
            setisLogged(true);
        }
    },[])
    return(
        <div>
            {isLogged && (
                <div className="">
                    <div className="text-center font-bold text-2xl my-1">
                        {username}
                    </div>
                    <div>
                        <button className="bg-blue-500 rounded-sm p-3 text-white mx-4 my-3">
                            <Link to="/candidates">
                                Candidates
                            </Link>
                        </button>
                    </div>
                </div>
                
            )}
            {!isLogged && (
                <div className="p-2 h-screen">
                    <div className="text-center">
                        You are not Logged in
                    </div>
                    <div className="flex justify-center">
                        <button className="bg-blue-500 rounded-sm text-white p-2 border">
                            <Link to="/signin">
                                Signin
                            </Link>
                        </button>
                        <button className="bg-blue-500 rounded-sm text-white p-2 border">
                            <Link to="/signup">
                                Signup
                            </Link>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
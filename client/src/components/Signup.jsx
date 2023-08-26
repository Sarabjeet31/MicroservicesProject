import axios from "axios";
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

export default function Signup(){
    const [username, Setusername] = useState('');
    const [password, Setpassword] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem("token")){
            navigate("/");
        }
    },[])
    async function Signup(ev) {
        ev.preventDefault();
        await axios.post('http://localhost:8000/api/users/signup', {username,password});
        localStorage.setItem("token",Cookies.get('token') );
        navigate("/");
    }
    return(
        <div className="bg-blue-50 h-screen flex items-center">
            <form className="w-64 mx-auto" onSubmit={Signup}>
                <input 
                    value={username} 
                    onChange={ev => Setusername(ev.target.value)} 
                    type="text" 
                    placeholder="Usename" 
                    className="block w-full rounded-sm p-2 mb-2 border" 
                />
                <input 
                    value={password} 
                    onChange={ev => Setpassword(ev.target.value)} 
                    type="password" 
                    placeholder="Password" 
                    className="block w-full rounded-sm p-2 mb-2 border" 
                />
                <button className="bg-blue-500 text-white block w-full rounded-sm p-2 ">Register</button>
                <div className="text-center mt-2">
                    Already a member? <Link to="/signin"> Login here </Link>
                </div>
            </form>
        </div>
    )
}

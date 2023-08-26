import axios from "axios"
import { useEffect, useState } from "react"

export default function Candidates() {
    const [isAdmin, setisAdmin] = useState(false);
    const [candidates,setcandidates] = useState([]);
    const [username1,setUsername1] = useState("");

    async function checkAdmin() {
        const username2 = await axios.post("http://localhost:8000/api/users/check", {token: localStorage.getItem("token")});
        setisAdmin(username2.data.isAdmin);
        setUsername1(username2.data.username);
    }

    async function showcandidates() {
        const Candidates1 = await axios.get(`http://localhost:8000/api/candidates?username=${username1}`)
        setcandidates(Candidates1.data);
    }

    useEffect(() => {
        checkAdmin();
    },[isAdmin])
    return (
        <div>
            <div className="flex w-full">
                {isAdmin && (
                    <button className="bg-blue-500 rounded-sm text-white p-2 mx-3 my-2">
                        Add Candidate
                    </button>
                )}
                <button onClick={() => {showcandidates()}} className="bg-blue-500 rounded-sm text-white p-2 my-2 ml-3">
                    Show Candidates
                </button>
            </div>
            <div>
                {candidates.map((candidate) => {
                    return(
                        <div key={candidate._id}>
                            {isAdmin && (
                                <div className="container mx-auto p-4 w-1/2">
                                    <table className="w-full">
                                        <tbody>
                                        <tr className="grid gap-4">
                                            <td className="p-6 rounded shadow-md flex-col bg-gray-50">
                                                <div className="flex mb-2">
                                                    <p className="font-semibold w-1/2">Name</p>
                                                    <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.Name}</p></div>
                                                </div>
                                                <hr className="w-full h-5 mx-auto"/>
                                                <div className="flex mb-2">
                                                    <p className="font-semibold w-1/2">Rollno</p>
                                                    <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.Rollno}</p></div>
                                                </div>
                                                <hr className="w-full h-5 mx-auto"/>
                                                <div className="flex mb-2">
                                                    <p className="font-semibold w-1/2">Marks</p>
                                                    <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.Marks}</p></div>
                                                </div>
                                                <hr className="w-full h-5 mx-auto"/>
                                                <div className="flex mb-2">
                                                    <p className="font-semibold w-1/2">University</p>
                                                    <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.University}</p></div>
                                                </div>
                                                <hr className="w-full h-5 mx-auto"/>
                                                <div className="flex mb-2">
                                                    <p className="font-semibold w-1/2">Password</p>
                                                    <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.Password}</p></div>
                                                </div>
                                                <hr className="w-full h-5 mx-auto"/>
                                            </td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            )}
                            {!isAdmin && (
                                <div className="container mx-auto p-4 w-1/2">
                                <table className="w-full">
                                    <tbody>
                                    <tr className="grid gap-4">
                                        <td className="bg-white p-6 rounded shadow-md flex-col">
                                            <div className="flex mb-2">
                                                <p className="font-semibold w-1/2">Name</p>
                                                <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.Name}</p></div>
                                            </div>
                                            <hr className="w-full h-5 mx-auto"/>
                                            <div className="flex mb-2">
                                                <p className="font-semibold w-1/2">University</p>
                                                <div className="text-gray-600 w-1/2"><p className="flex justify-end font-semibold">{candidate.University}</p></div>
                                            </div>
                                            <hr className="w-full h-5 mx-auto"/>
                                        </td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            )}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
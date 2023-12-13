import { useState } from "react";

function Authenticate({token,setUsername,username}){
    const[successMessage,setSuccessMessage] = useState(null)
    const[error,setError] = useState(null)
    async function handleClick(){
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/authenticate",{
                method: "GET",
                headers: { 
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                 },
            })
            const result = await response.json()
            setUsername(result.data.username.username) 
            setSuccessMessage(result.message)
        }catch(error){
            setError(error.message)
        }
    }
    return(
        <>
            <h2>Authenticate</h2>
            {successMessage && <p>{successMessage}</p>}
            {error && <p>{error}</p>}
            <h3>{username}</h3>
            <button onClick={handleClick}>Authenticate Token</button>
        </>
    )
}
export default Authenticate
import { useState } from 'react';

function SignUpForm({setToken}){
    const[username,setUsername] = useState("")
    const[password,setPassword] = useState("")
    const[error,setError] = useState([])
    const[submitting,setSubmitting] = useState(false)

    const validateForm = () => {
        const error = []

        // Check if password is empty
        if(password.length < 8){
            error.password = "Password should be at least 8 characters long"
        }
        return error
    }

    async function handleSubmit(event){
        event.preventDefault()
        setError(validateForm())
        setSubmitting(true)
        try{
            const response = await fetch("https://fsa-jwt-practice.herokuapp.com/signup",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: {username},
                    password: {password}
                })
            })
            const result = await response.json()
            setToken(result.token)
        }catch(error){
            setError(error.message)
        }
    }

    return(
        <>
        <h2>Sign Up</h2>
        {error && <p>{error}</p>}
        {Object.keys(error).length === 0 && submitting ? (
        <span className="success">Successfully submitted</span>
        ) : null}
        <form method='post' onSubmit={handleSubmit}>
        <label>
        <input placeholder="Username" name="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required/>
        </label>
        <br/>
        <label>     
            <input placeholder="Password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
        </label>
        {error.password ? (
            <p className="error">{error.password}</p>
          ) : null}
        <input type="submit" value="submit"/>
        </form>
        </>
    )
}
export default SignUpForm
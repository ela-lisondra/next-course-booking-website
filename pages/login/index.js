import {useState, useEffect, useContext} from 'react'
import {Form,Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Router from 'next/router'
import UserContext from '../../userContext'
import {GoogleLogin} from 'react-google-login'

export default function Login(){

    const {user,setUser} = useContext(UserContext)
    console.log(user)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [isActive, setIsActive] = useState(true)
    useEffect(()=> {
            if(email !== "" && password !== ""){

                setIsActive(true)
            } else {
                setIsActive(false)
            }
    }, [email, password])

    function authenticate(e){
        e.preventDefault()

        fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/login',{

            method: "POST",
            headers: {

                'Content-Type': 'application/json'
            },
            body: JSON.stringify({

                email:email,
                password: password
            })

        })
        .then(res=>res.json())
        .then(data=> {
            // console.log(data)
            if(data.accessToken){
                localStorage.setItem("token", data.accessToken)
                fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/details', {

                    headers: {
                        Authorization: `Bearer ${data.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('isAdmin', data.isAdmin)
                    // //after getting the user's details from the api server, we will set
                    // the global user state
                    setUser({
                        email:data.email,
                        isAdmin: data.isAdmin
                    })
                })

                Swal.fire({

                    icon:"success",
                    title: "Successfully Logged in.",
                    text: "Thank you for Logging in!"
        
                })
                Router.push('/')
                
            } else {
                Swal.fire({

                    icon:"success",
                    title: "Successfully Logged in.",
                    text: "Thank you for Logging in!"

                })
            }
        })

        setEmail ("")
        setPassword("")
    }

    function authenticateGoogleToken(response){
        console.log(response)
        fetch('https://murmuring-meadow-95026.herokuapp.com/api/users/verify-google-id-token',{
            method: 'POST',
            headers: {
                'Content-Type':'application/json'               
            },
            body: JSON.stringify({
                tokenId: response.tokenId
            })
        })
        .then(res=>res.json())
        .then(data=> {
            if(typeof data.accessToken !== 'undefined'){
                localStorage.setItem('token', data.accessToken)

                fetch('http://localhost:8000/api/users/details',{
                    headers: {
                        'Authorization': `Bearer ${data.accessToken}`
                    }
                })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('email', data.email)
                    localStorage.setItem('isAdmin', data.isAdmin)

                    setUser({
                        email:data.email,
                        isAdmin:data.isAdmin
                    })

                    Swal.fire({
                        icon:'success',
                        title: 'Successful Login'
                    })
                    Router.push('/courses')
                })
            } else {
                if(data.error === "google-auth-error"){
                    Swal.fire({
                        icon: 'error',
                        title: 'Google Authentication Failed.'
                    })
                } else if(data.error === "login-type-error"){
                    Swal.fire({
                        icon:'error',
                        title: 'Login Failed',
                        text: 'You may have registered through a different procedure.'
                    })
                }
            }
            // console.log(data)
        })
    }

    //component return
    return(

        <Form onSubmit={e => authenticate(e)}>
            <Form.Group controlId="userEmail">
                <Form.Label>Email:</Form.Label>
                <Form.Control type="email" placeholder="Enter Email"  value={email} onChange={e => setEmail(e.target.value)} required/>               
            </Form.Group>
            <Form.Group controlId="userPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} required/>            
            </Form.Group>
            {
				isActive
				?
				<Button variant="primary" type="submit" className="btn-block">Submit</Button>
				:
				<Button variant="primary" disabled className="btn-block">Submit</Button>
			}
                    
            
        </Form>
    )
}

/* <GoogleLogin
                clientId="417135322331-a6tv9eq9sf6cp410cts4jva4bvcvfc4s.apps.googleusercontent.com"
                buttonText="Login Using Google"
                onSuccess={authenticateGoogleToken}
                onFailure={authenticateGoogleToken}
                cookiePolicy={'single_host_origin'}
                className="w-100 my-40 text-center d-flex justify-content-center" />  */
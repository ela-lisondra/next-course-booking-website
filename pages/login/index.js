import {useState, useEffect, useContext} from 'react'
import {Form,Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import Router from 'next/router'
import UserContext from '../../userContext'

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

        fetch('http://localhost:8000/api/users/login',{

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
                fetch('http://localhost:8000/api/users/details', {

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
				<Button variant="primary" type="submit">Submit</Button>
				:
				<Button variant="primary" disabled>Submit</Button>

			}
        </Form>
    )
}
import {useEffect,useContext,useState} from 'react'
import {Form, Button} from 'react-bootstrap'
    
//import router from nextJS  for user redirection
import Router from 'next/router'
    
//import Swal
import Swal from 'sweetalert2'
export default function Register(){
    
    /*What do we bind to our input to track user input in real time*/
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNo, setMobileNo] = useState(0)
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    
        // State for conditionally rendering the submit button
    const [isActive,setIsActive] = useState(true)
    
        // will run on every change to our user's input
    useEffect(()=>{
    
        if((firstName !== "" && lastName !== "" && email != "" && mobileNo !== "" && password1 !== "" && password2 !== "") && (password1 === password2) && (mobileNo.length===11)){
    
            setIsActive(true)
        }else{
    
            setIsActive(false)
        }
    
    },[firstName, lastName,email,mobileNo,password1,password2])
    
    function registerUser(e){    
        e.preventDefault()    
            //check if an email already exists
        fetch('http://localhost:8000/api/users/email-exists',{
    
            method: 'POST',
            headers: {   
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({    
                    email: email
                })    
            })
            .then(res=> res.json())
            .then(data =>{    
                console.log(data)//boolean
                /*
                    If the email used is already registered what will bereturned? -- TRUE    
                */   
            if(data === false){
    
                fetch('http://localhost:8000/api/users',{
                        method: 'POST',
                            //kapag POST matic na yung may {Content-Type}
                        headers: {'Content-Type': 'application/json'},
                        body: JSON.stringify({
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            mobileNo: mobileNo,
                            password: password1   
                        })
                    })
                    .then(res=>res.json())
                    .then(data=>{
                            //ang laman ni data ay boolean
                        console.log(data);
    
                        if(data){
    
                            Swal.fire({    
                                icon: "success",
                                title: "Successfully Registered.",
                                text: "Thank you for Registering."
                            })
                            Router.push('/login')   
                        }else{
                            Swal.fire({    
                                icon: "error",
                                title: "Regiration Unsuccessful.",
                                text: "Please try again."
                            })    
                        }                                  
                    })        
            }else{    
                Swal.fire({
                            icon: "error",
                            title: "Regiration Unsuccessful.",
                            text: "Email already Exists"        
                })
            }    
        })                   
                    setFirstName("")
                    setLastName("")
                    setEmail("")
                    setMobileNo(0)
                    setPassword1("")
                    setPassword2("")               
    }    
    return(    
        <Form onSubmit={e=> registerUser(e)}>
            <Form.Group controlId="userFirstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control type="text" placeholder="Enter First Name" value={firstName} onChange={e=> setFirstName(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="userLastName">
                    <Form.Label>Last Name:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Last Name" value={lastName} onChange={e=> setLastName(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="userEmail">
                    <Form.Label>Email:</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e=> setEmail(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="usermobileNo">
                    <Form.Label>Mobile Number:</Form.Label>
                    <Form.Control type="text" placeholder="Enter Mobile Number" value={mobileNo} onChange={e=> setMobileNo(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="userPassword1">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password1} onChange={e=> setPassword1(e.target.value)} required/>
                </Form.Group>
                <Form.Group controlId="userPassword2">
                    <Form.Label> Confirm Password:</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={password2} onChange={e=> setPassword2(e.target.value)} required/>
                </Form.Group>
                {   
                    isActive
                    ?
                    <Button variant="primary" type="submit"> Register</Button>    
                    :
                    <Button variant="primary" type="submit" disabled> Register</Button>    
                }                        
        </Form>    
        )
}

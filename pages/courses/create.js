import {useState, useEffect, useContext} from 'react'
import {Form, Button} from 'react-bootstrap'
import Swal from 'sweetalert2'
import userContext from '../../userContext'

export default function create(){

    const {user} = useContext(userContext)
    // console.log(useContext(userContext))
    //STATES
    const [courseName, setCourseName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState(0)

    const [isActive, setIsActive] = useState(true)
    //CHECK USER'S INPUT AND SET THE BUTTON AS DISABLED IF THE INPUTS ARE NOT FILLED
    useEffect(()=>{
        if(courseName !== '' && description !== '' && price !== '') {

            setIsActive(true)
        } else {

            setIsActive(false)
        }
    },[courseName, description, price])
    //IF THE ABOVE STATE VARS BUT ISACTIVE IS NOT INCLUDED. DON'T INCLUDE USEEFFECT IN DEPENDENCY
    console.log(isActive)

    function addCourse(e){
        let token = localStorage.getItem("token")
        e.preventDefault()

        fetch('http://localhost:8000/api/courses', {
		method: 'POST',
		headers: {

			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`

		},
		body: JSON.stringify({
			name: courseName,
			description: description,
			price: price
		})
	})
	.then(res => res.json())
	.then(data => {
        
        if (data === true){
            Swal.fire({

                icon:"success",
                title:"Course Added.",
                text: "Course Creation Success."
            })
        } else {
            Swal.fire({

                icon:"error",
                title:"Failed to add course.",
                text: "Course Creation Failed. Something Went Wrong."
            })
        }
        setCourseName("")
        setDescription("")
        setPrice(0)       
            })    
    }
    return (
            <>
                <h1>This is the Create a Course Page</h1>
                <Form onSubmit={e => addCourse(e)}>
                    <Form.Group controlId="courseName">
                        <Form.Label>Course Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Course Name" value={courseName} onChange={e => setCourseName(e.target.value)} required/> 
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} required/> 
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Price</Form.Label>
                        <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)} required/> 
                    </Form.Group>

                    {
                        isActive
                        ?
                        <Button type="submit" variant="primary">Add Course</Button>
                        :
                        <Button type="submit" variant="primary" disabled>Submit</Button>
                    }
                </Form>
            </>         
    )
}


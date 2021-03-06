import {useState, useEffect, useContext} from 'react'
import {Table, Button} from 'react-bootstrap'
import Course from '../../components/Course'
import UserContext from '../../userContext'


export default function Courses(){

    const {user}= useContext(UserContext)
        console.log(user)

    const [courses, setCourses] = useState([])
    const [allCourses, setAllCourses] = useState([])
    //get all active
    useEffect(()=> {

        fetch('https://murmuring-meadow-95026.herokuapp.com/api/courses/')
        .then(res => res.json())
        .then(data => {

            setAllCourses(data)
            let tempActive = data.filter(course => {
                if(course.isActive === true) {
                    return true
                }
            })
        setCourses(tempActive)    
        })

    },[])
    //get al courses
    console.log(courses)
    console.log(allCourses)

    // useEffect(()=> {
    //     fetch('https://murmuring-meadow-95026.herokuapp.com/api/courses/all')
    //     .then(res => res.json())
    //     .then(data=>{
    //         console.log(data)
    //     },[])
    // })

    const coursesCards = courses.map(course => {

        // console.log(course)
        return (
            <Course key={course._id} courseProp={course} />
        )
    })

    const coursesRows = allCourses.map(course => {

        return(
            <tr key={course._id}>
                <td>{course.name}</td>
                <td>{course.price}</td>
                <td>{course.isActive ? "Active" : "Inactive"}</td>
                <td>{
                    course.isActive 
                    ? <Button variant="danger">Disable</Button>
                    : <Button variant="success">Enable</Button>
                    }
                    </td>
            </tr>
        )
    })
    return (
            user.isAdmin
            ?
            <>
                <h1 className="my-4 text-center">Course Dashboard</h1>  
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                       {coursesRows}
                    </tbody>   
                </Table> 
            </>
                :
                <>         
                    <h1 className="my-4">Welcome to Course</h1>
                    {coursesCards}
                </>
        )
}
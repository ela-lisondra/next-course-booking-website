import {useState, useEffect, useContext} from 'react'
import {Card, Button} from 'react-bootstrap'

export default function Course({courseProp}){

    const {_id, name, description, price} = courseProp
    // console.log(courseProp)
    return (
    
                <Card className="my-3">
                    <Card.Body>
                        <Card.Title>{name}</Card.Title>
                        
                        <Card.Text>{description}</Card.Text>
                            
                        <Card.Text>Price: $ {price}</Card.Text>
                        <Button variant="primary">Enroll</Button>
                    </Card.Body>
                </Card>
        )
}


import {Jumbotron, Row, Col} from 'react-bootstrap'

import Link from 'next/link'

export default function Banner({dataProp}){

    //deconstructing dataProp, items inside are keys of the object
    const {title, content, destination, label} = dataProp

    return (
        <Row>
            <Col>
                <Jumbotron>
                    <h1>{title}</h1>
                    <p>{content}</p>
                    <Link href={destination}><a>{label}</a></Link>
                </Jumbotron>
            </Col>
        </Row>
    )
}
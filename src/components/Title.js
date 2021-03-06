import React from 'react'
import {Row, Col, Jumbotron} from 'reactstrap';

const Title = () =>{
    return (
        <div>
            <Row>
                <Col xs="12">
                    <Jumbotron className="text-center">
                        <h1 className="display-5">Simple CRUD React</h1>
                        <p className="lead">ReactJS + Firestore</p>
                    </Jumbotron>
                </Col>
            </Row>
            
        </div>
    )
}

export default Title;
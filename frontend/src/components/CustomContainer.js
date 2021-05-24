import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export default function CustomContainer() {
    return (
        <Container className='h-auto my-4 pt-3'>
            <Row className='h-100'>
                <Col className="text-center m-auto">
                    <h2 className='text-uppercase'>Passionate Cooks, Sharing Joy through Food</h2>
                    <p className='m-auto w-75 pb-lg-5'>Food is Joy, especially when it’s made with a whole lotta love.  Homemade meals satisfy more than just our appetites: they connect people.  One of the biggest joys of a passionate cook is to share their creations, and to see the delight their dish brings to people. DishDivvy allows you to share your signature dishes with people in your community, and get immediate feedback on the impact your food is making in your neighborhood.
                    </p>
                </Col>
            </Row>
        </Container>
    );
}
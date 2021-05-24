import React from 'react';
import {Col, Container, Row} from "react-bootstrap";

export default function ColumnsContainer() {
    return (
        <Container className='mt-4'>
            <Row className='text-center'>
                <Col>
                    <h2>Our Mission</h2>
                </Col>
            </Row>
            <Row className='mt-3 text-left h-auto mb-4'>
                <Col className='mx-auto' md={5}>
                    <h5>Support local cooks, unlike restaurants, you know exactly who is preparing your food so you can enjoy your meal at a reasonable price
                    </h5>
                </Col>

                <Col className='mx-auto' md={5}>
                    <h5>Explore new cultures, reconnect with your heritage or discover new cultures through traditional homemade dishes
                    </h5>
                </Col>
            </Row>
        </Container>
    );
}
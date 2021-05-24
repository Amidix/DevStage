import React, { Component } from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import DeliveryCard from "./DeliveryCard";
import { connect } from "react-redux";
import {Form, FormControl} from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import InputGroup from "react-bootstrap/InputGroup";
import { useDispatch, useSelector } from 'react-redux'
import  { useState } from 'react'
import Loader from './Loader';


const DeliveryMenu = () => {
    const dispatch = useDispatch()
 const productList = useSelector((state) => state.productList)
const { loading, error, products } = productList

const [search, setSearch] = useState('')

const handleChange = (e) => {
    setSearch(e.target.value.toUpperCase())
};
const itemsIterate = (meal) => {
    if(products != null){
    return Object.values(products)
        .filter(item =>
           (item.name.toUpperCase().includes(search) || item.description.toUpperCase().includes(search) || item.price.toString().toUpperCase().includes(search))
        ).map(item =>cardRender(item));
}}
  /*  const itemsIterate = () => {
        return Object.values(products)
        .filter(item =>
             (item.name.toUpperCase().includes(state.search) || item.description.toUpperCase().includes(state.search) || item.price.toUpperCase().includes(state.search))
           .map(item =>cardRender(item))
    };*/

    const cardRender = (product) => <DeliveryCard img={product.image} title={product.name} price={product.price} description={product.description} num={product.qty} id={product._id}/>;

    
        const appetizer = itemsIterate('appetizer')
          

        return (
            <Container className='Delivery'>
                <Form className='justify-content-center' inline>
                    <InputGroup style={{width: "50%"}}>

                        <FormControl onChange={handleChange} type="text" placeholder='Search items'/>
                        <InputGroup.Append>
                            <InputGroup.Text id="inputGroupPrepend">
                                <FaSearch/>
                            </InputGroup.Text>
                        </InputGroup.Append>
                   
                    </InputGroup>
                </Form>

             
                    <h1 className='pt-5 mx-auto'>Menu</h1>
                    <Row className='pb-3'>
                        {appetizer}
                    </Row>
                

                


            </Container>
        );
    
}



export default DeliveryMenu;
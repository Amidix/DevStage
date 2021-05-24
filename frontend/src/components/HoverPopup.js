import React, {useRef} from 'react';
import ReactDOM from 'react-dom';
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";
import Badge from "react-bootstrap/Badge";
import { useSelector } from 'react-redux'
import {FaShoppingCart} from "react-icons/fa";
import {Form} from "react-bootstrap";
import ScrollArea from "react-scrollbar";
import HoverPopupItem from './HoverPopupItem'
import {Link} from "react-router-dom";
import  { useState } from 'react'


const HoverPopup =()=> {

    const cart = useSelector((state) => state.cart)
    const { cartItems } = cart
    const ref = useRef(null);

    const [show, setShow] = useState(false)
    const [target, setTarget] = useState(null);

    const toggle = () => {
        setShow(!show)
    };

    const showt = (event) => {
        setShow(true)
        setTarget(event.target)
    };

    const hide = () => {
        setShow(false)
    };

    const HoverPopupItemRender = (item) => <HoverPopupItem product={item.product} image={item.image} name={item.name} price={item.price} qty={item.qty}/>;


        const checkout = (cartItems.length != 0) ?
            (<Button variant='warning' onClick={hide}>Checkout</Button>) :
            (<Button disabled variant='warning' onClick={hide}>Checkout</Button>);


        const popup = (cartItems.length != 0) ?
            (<Overlay {...{
                show: show,
                container: ref.current,
                target:target
            }} placement="bottom">
                <Popover className='text-dark' onMouseOver={showt} onMouseOut={toggle}>
                    <Popover.Title as="h2" className='text-center'>
                        My Cart
                    </Popover.Title>
                    <Popover.Content>
                        <ScrollArea speed={0.3} style={{maxHeight: 400}} horizontal={false}>
                            {Object.values(cartItems).map(item =>
                                (item.qty > 0) ? HoverPopupItemRender(item) : null
                            )}
                        </ScrollArea>
                    </Popover.Content>
                    <Popover.Title className='text-center text-dark' as="h2">
                    
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) : 
              
              
              {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)} Dh
                    </Popover.Title>

                    <Popover.Title as="h2">
                        <Form className='mx-4 d-flex justify-content-between'>
                            <Link to='/cart'>
                                <Button variant='dark' onClick={hide}>My Cart</Button>
                            </Link>
                            <Link to='/shipping'>
                                {checkout}
                            </Link>
                        </Form>
                    </Popover.Title>
                </Popover>
            </Overlay>) : null;

        return (
            <React.Fragment>
                <Link to='/cart'>
                    <Button variant="dark" style={{position: 'relative'}} ref={target} onClick={toggle}
                            onMouseOver={showt}
                            onMouseOut={hide}>
                        <FaShoppingCart className='mr-1' size='1.5em'/>
                        <Badge style={{position: 'absolute', top: -8, right: -8}} pill variant="warning">{cartItems.length} </Badge>
                    </Button>
                </Link>
                {popup}
            </React.Fragment>
        );
    
}



export default HoverPopup
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Image from "next/image";
import { Container, Row, Col, Button } from "react-bootstrap";
import products from "../../data";
import TopNav from "../../../components/TopNav";
import SelectQuantity from "../../../components/products/select_quantity";
import Message from "../../../components/message";

function details() {
    const [ qty, setQty ] = useState(1);
    const dispatch = useDispatch();
    const router = useRouter();
    const { product_id } = router.query;
    const product = products.find(product => product.id === +product_id);
    const msg = useSelector(state => state.message);  
    const cart = useSelector(state => state.cart);  
    console.log("cart", cart)

    const handleChange = (e) => {
        e.preventDefault();
        setQty(e.target.value);
    }

    const handleSubmit = () => {
        dispatch({ 
            type: "ADD_TO_CART", 
            payload: {
                name: product.name,
                qty
            }
        })
        dispatch({ 
            type: "DISPLAY_MESSAGE", 
            payload: `${product.name} has been added to your cart.`
        })
    }

    if (product) {
        const { img, name, description, price } = product;
        return (
            <div style={{ height: "100%", position: "relative" }}>  
                {msg && <Message msg={msg} />}
                <TopNav />
                <Container>
                    <Button variant="link" href="/">Back to Products</Button>
                    <Row className="mt-4">
                        <Col xs={4}>
                            <div style={{width: '100%', height: "500px", position: 'relative'}}>
                                <Image variant="top" src={img} alt={name} layout="fill" objectFit="cover" className="card-img-top img-responsive"/>
                            </div>                    
                        </Col>
                        <Col xs={8}>   
                            <Row>
                                <Col>
                                    <h1>
                                        {name}
                                    </h1>
                                    <h4 className="text-muted">
                                        ${price}
                                    </h4>
                                </Col>
                            </Row>
                            <Row className="my-4">
                                <Col>
                                    <p>{description}</p>
                                </Col>
                            </Row>
                            <Row>
                                <Col className="d-flex align-items-center">
                                    <SelectQuantity handleChange={handleChange} />
                                    <Button variant="primary" onClick={handleSubmit}>Add to Cart</Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Container>
            </div>
        )    
    }
    return null;
}

export default details;
import { Container, Row, Col } from "react-bootstrap";
import Product from "./productDetails";
import products from "../data"

const Products = () => {
    return (
        <Container>
            <Row md={4}>
                {products.map(product => {
                    return (
                        <Col key={product.id}>
                            <Product {...product} />
                        </Col>
                    )
                })}
            </Row>
        </Container>
    )
}

export default Products;
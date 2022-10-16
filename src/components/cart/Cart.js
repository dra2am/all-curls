import { useSelector } from "react-redux"
import TopNav from "../../components/TopNav"
import { Container, Table } from "react-bootstrap"
const Cart = () => {
    const cart = useSelector(state => state.cart)
    console.log('cart', cart)

    return (
        <>
        <TopNav />
        <Container>
            <h1>Shopping Cart</h1>
            { cart.length ? 
                <Table className="mt-5">
                    <thead>
                        <th>Qty.</th>
                        <th>Name</th>
                    </thead>
                    <tbody>
                        {cart.map((product, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {product.qty}
                                    </td>
                                    <td>
                                        {product.name}
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </Table>
             : "Your cart is empty."}
        </Container>
        </>
    );
}

export default Cart;
// import {React, useState, useEffect} from 'react'
// import { Container, Card } from 'react-bootstrap'
// import {getDatabase, get, ref, set} from 'firebase/database';
// import app from './server';

// export default function UpdateOrders() {
//     const db = getDatabase(app);
//     const [orders, setOrders] = useState([]);

    
//     useEffect(() => {
//         getAllOrders();
//     })

//     async function getAllOrders(){
//         const getOrdersFromFirebase = [];
//         const userRef = ref(db,"Users/"); 
//         const collectionsnap = await get((userRef));
//             collectionsnap.forEach(doc=>{
//                 var order = doc.val().Orders;
//                 getOrdersFromFirebase.push(order);
//             });
//         setOrders(getOrdersFromFirebase);
//         }
//   return (
//     <Container className="d-flex absolute align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
//             <Card className=" d-flex w-100" border="danger" style= {{ maxWidth: "1000px"}}>
//                 <Card.Body>
//                     <h2 className="text-center mb-4" id="cart-title">Here Are All Users Orders Below:</h2>
//                 </Card.Body>
//                 {/*the following div is where items will be inserted*/}
//                 <div id = "usercart">
//                 <table id="cartItems"> 
//                     {orders.length > 0 ? (
//                         orders.map((order) => <div><table><tr>
//                             <td>{order}</td>
//                             </tr></table></div>)
//                         ) : (<h1>No orders yet</h1>)}
//                 </table>
//                 </div>
//             </Card>
//         </Container>
//   )
// }

import {Card, Container, Row, Col, Button} from 'react-bootstrap';
import './checkout.css';
import {buildUpdateOrders} from "./buildUpdateOrders.js";

var products;

const UpdateOrders = () => {
    
    window.onload=(buildUpdateOrders(false));

    return (
        <Container className="my-3 d-flex align-items-center justify-content-center" style={{ minHeight: "50vh"}}>
            <Card className="d-flex w-100" border="danger" style= {{ maxWidth: "1000px"}}>
                <Card.Body>
                    <h2 className="text-center mb-4" id="cart-title">All Users Orders:</h2>
                </Card.Body>
                {/*the following div is where items will be inserted*/}
                <div id = "usercart">
                <table id="cartItems"> 

                </table>
                </div>
            </Card>
        </Container>
    );
}

export default UpdateOrders;

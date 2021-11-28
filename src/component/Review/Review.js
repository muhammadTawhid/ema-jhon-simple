import React, { useEffect, useState } from 'react';
import {getDatabaseCart, processOrder, removeFromDatabaseCart} from '../../utilities/databaseManager';
import fakeData from '../../fakeData'
import ReviewItem from '../ReviewItem/ReviewItem';
import Cart from '../Cart/Cart';
import happyImg from '../../images/giphy.gif';
import { useHistory } from 'react-router';

const Review = () => {
    const [cart, setCart] = useState([]);
    const [orderPlaced, setOrderPlaced] = useState(false)
    const history = useHistory();

    const handleProceedCheckout = () => {
        // setCart([]);
        // setOrderPlaced(true);
        // processOrder();
        history.push("/shipment")
    }

    useEffect(() => {
        const saveCart = getDatabaseCart();
        const productKeys = Object.keys(saveCart);
        const cartProducts = productKeys.map(key =>{
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = saveCart[key];
            return product
        })
        setCart(cartProducts);
    }, [])

    const removeItem = productKey => {
        console.log('object');
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart)
        removeFromDatabaseCart(productKey);
    }

    let orderPlacedImg;
    if(orderPlaced){
        orderPlacedImg = <img src={happyImg} alt="" />;
    }

    return (
        <div className="twin-container">
           <div className="product-container">
            {
                cart.map(pd => <ReviewItem removeItem={removeItem} key={pd.key} product={pd}/>)
            }
            {orderPlacedImg}
           </div>
           <div className="cartContainer">
                <Cart cart={cart}>
                    <button onClick={handleProceedCheckout} className="main-btn">Proceed Checkout</button>
                </Cart>
           </div>
        </div>
    );
};

export default Review;
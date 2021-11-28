import './Shop.css'
import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import {addToDatabaseCart, getDatabaseCart} from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])

    useEffect(() => {
        const savedCart = getDatabaseCart()
        const productKeys = Object.keys(savedCart);
        const previousCart = productKeys.map(existingKey => {
            const product = fakeData.find(pd => pd.key === existingKey)
            product.quantity = savedCart[existingKey];
            return product;
        })
        setCart(previousCart)
    }, [])

    const handleAddProduct = (product) =>{
        const ToBeAdded = product.key
        // const newCart = [...cart , product]
        // setCart(newCart);
        const sameProduct = cart.find(pd => pd.key === ToBeAdded);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== ToBeAdded)
            newCart = [...others, sameProduct]
        }
        else{
            product.quantity = 1; 
            newCart = [...cart, product]
        }
        setCart(newCart);
        // const count = sameProduct.length;
        addToDatabaseCart(product.key, count)
    }
    return (
        <div className="twin-container">
            <div className="product-container">
                {
                    products.map(product => <Product showAddToCart={true} handleAddProduct={handleAddProduct} product = {product} key={product.key}/>)
                }
            </div>
            <div className="cartContainer">
                <Cart cart={cart}>
                    <Link to="/review"><button className="main-btn">Order Review</button></Link>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;
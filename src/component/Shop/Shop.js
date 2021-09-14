import './Shop.css'
import React, { useState } from 'react';
import fakeData from '../../fakeData'
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProducts] = useState(first10)
    const [cart, setCart] = useState([])

    const handleAddProduct = (product) =>{
        console.log('object', product);
        const newCart = [...cart , product]
        setCart(newCart);
    }
    return (
        <div className="shopContainer">
            <div className="productContainer">
                {
                    products.map(product => <Product handleAddProduct={handleAddProduct} product = {product} key={product.key}/>)
                }
            </div>
            <div className="cartContainer">
                <Cart cart={cart}/>
            </div>
        </div>
    );
};

export default Shop;
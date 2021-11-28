import React from 'react';
import { useParams } from 'react-router';
import fakeData from '../../fakeData';
import Product from '../Product/Product';

const ProductDetails = () => {
    const {productKey} = useParams();
    const product = fakeData.find(product => product.key === productKey);
    // console.log(product);

    return (
        <div>
            <h1>this is your product </h1>
            <Product showAddToCart={false} product={product}/>
        </div>
    );
};

export default ProductDetails;
import React from 'react';

const ReviewItem = (props) => {
    const {name, quantity, key, price } = props.product;
    const reviewItemStyle = {
        borderBottom:"1px solid lightgray",
        marginLeft: "200px",
        marginBottom: "5px", 
        paddingBottom: "5px"
    }
    return (
        <div style={reviewItemStyle} className="review-item">
            <h4 className="product-name">{name}</h4>
            <p>Quantity{quantity}</p>
            <p><small>${price}</small></p>
            <br />
            <button onClick={() => props.removeItem(key)} className="main-btn">Remove</button>
        </div>
    );
};

export default ReviewItem;
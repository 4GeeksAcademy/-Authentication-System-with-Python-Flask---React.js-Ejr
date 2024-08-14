import React from "react";

const Product = (img, name, price) => {
    return (
<div className="container product-card d-flex">
<img src={img} alt="product-image" />
<div className="container description-container d-flex flex-column">
<h2>{name}</h2>
<h4>{price}</h4>
</div>

</div>
    )
}

export default Product;
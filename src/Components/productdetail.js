import React from "react";

const ProductDetail = (props) => {
  const { img, title, desc, price } = props;

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <img src={img} className="card-img-top" alt="Product" />
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <p className="card-text">{desc}</p>
              <p className="card-text">$ {price}</p>
              {/* Add more details or information about the product here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

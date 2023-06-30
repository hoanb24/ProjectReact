import React from "react";
import swal from "sweetalert";
import { useCart } from "react-use-cart";
import { Link } from "react-router-dom";

const Itemcard = (props) => {
  const { addItem } = useCart();

  const handleAddToCart = (item) => {
    addItem(item);
    swal({
      title: "Success",
      text: "Item added to cart successfully",
      icon: "success",
      button: "OK",
    });
  };

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div className="card shadow">
        <img src={props.img} className="card-img-top img-fluid" alt="..." />
        <div className="card-body text-center">
          <h5 className="card-title">{props.title}</h5>
          <h5 className="card-title">$ {props.price}</h5>
          <p className="card-text">{props.desc}</p>

          <button
            className="btn btn-success mr-2"
            onClick={() => handleAddToCart(props.item)}
          >
            Add to Cart
          </button>

          <Link to={`/product/${props.id}`} className="btn btn-primary">
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Itemcard;

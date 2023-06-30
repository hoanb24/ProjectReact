import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductDetail from "./productdetail";

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://643918404660f26eb1aa3099.mockapi.io/data?id=${productId}`)
      .then((response) => response.json())
      .then((data) => setProduct(data[0]))
      .catch((error) => console.error(error));
  }, [productId]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Product Detail</h1>
      <ProductDetail
        img={product.img}
        title={product.title}
        desc={product.desc}
        price={product.price}
      />
    </div>
  );
};

export default ProductDetailPage;

import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";

const AdminPage = () => {
  const [productData, setProductData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalId, setModalId] = useState(0);
  const [modalImg, setModalImg] = useState("");
  const [modalPrice, setModalPrice] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://643918404660f26eb1aa3099.mockapi.io/data");
      const data = await response.json();
      setProductData(data);
    } catch (error) {
      console.log("Error fetching data from API:", error);
    }
  };

  const handleAddProduct = () => {
    setModalTitle("Thêm sản phẩm");
    setModalId(0);
    setModalImg("");
    setModalPrice(0);
    setShowModal(true);
  };

  const handleEditProduct = (id) => {
    const product = productData.find((p) => p.id === id);
    if (product) {
      setModalTitle("Chỉnh sửa sản phẩm");
      setModalId(product.id);
      setModalImg(product.img);
      setModalPrice(product.price);
      setShowModal(true);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`https://643918404660f26eb1aa3099.mockapi.io/data/${id}`, {
        method: "DELETE",
      });
      const updatedData = productData.filter((product) => product.id !== id);
      setProductData(updatedData);
    } catch (error) {
      console.log("Error deleting product:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (modalId === 0) {
      // Thêm sản phẩm mới
      const newProduct = {
        img: modalImg,
        title: event.target.title.value,
        desc: "",
        price: parseFloat(modalPrice),
      };

      try {
        const response = await fetch("https://643918404660f26eb1aa3099.mockapi.io/data", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });

        if (response.ok) {
          const data = await response.json();
          setProductData([...productData, data]);
        } else {
          console.log("Error adding product:", response.status);
        }
      } catch (error) {
        console.log("Error adding product:", error);
      }
    } else {
      // Chỉnh sửa thông tin sản phẩm
      const updatedProduct = {
        img: modalImg,
        title: event.target.title.value,
        price: parseFloat(modalPrice),
      };

      try {
        const response = await fetch(`https://643918404660f26eb1aa3099.mockapi.io/data/${modalId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedProduct),
        });

        if (response.ok) {
          const updatedData = productData.map((product) =>
            product.id === modalId ? { ...product, ...updatedProduct } : product
          );
          setProductData(updatedData);
        } else {
          console.log("Error updating product:", response.status);
        }
      } catch (error) {
        console.log("Error updating product:", error);
      }
    }

    setShowModal(false);
  };

  return (
    <Container>
      <h1>Quản lý sản phẩm</h1>
      <Button variant="primary" onClick={handleAddProduct}>
        Thêm sản phẩm
      </Button>
      <Table striped bordered>
        <thead>
          <tr>
            <th>ID</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {productData.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                <img
                  src={product.img}
                  alt={product.title}
                  style={{ width: "100px" }}
                />
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>
                <Button
                  variant="info"
                  onClick={() => handleEditProduct(product.id)}
                >
                  Chỉnh sửa
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteProduct(product.id)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                type="text"
                defaultValue={modalTitle === "Thêm sản phẩm" ? "" : modalTitle}
                required
              />
            </Form.Group>
            <Form.Group controlId="img">
              <Form.Label>URL ảnh</Form.Label>
              <Form.Control
                type="text"
                defaultValue={modalImg}
                onChange={(e) => setModalImg(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="price">
              <Form.Label>Giá</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                defaultValue={modalPrice}
                onChange={(e) => setModalPrice(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {modalTitle === "Thêm sản phẩm" ? "Thêm" : "Lưu"}
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default AdminPage;

import React, { useRef } from "react";
import Form from "react-bootstrap/Form";
import "../../../css/AdminPage.css";
import axios from "axios";
import {toast, ToastContainer} from 'react-toastify'
import BASE_URL from '../../../constants/BASE_URL'

const AdminCard = () => {
  const nameReference = useRef();
  const priceReference = useRef();
  const imagesReference = useRef();
  const descReference = useRef();
  const stockReference = useRef();
  const sizeReference = useRef();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = nameReference.current.value;
    const price = priceReference.current.value;
    const images = imagesReference.current.value.split("\n");
    const desc = descReference.current.value;
    const stock = stockReference.current.value;
    const size = sizeReference.current.value.split("\n");
    const product = {
      name: name,
      price: price,
      image_url: images,
      description: desc,
      stock: stock,
      sizes: size,
    };
    console.log(product)
    try {
      const response = await axios.post(
        BASE_URL+"/product/list",
        product
      );
      // console.log(response);
      if(response.status===200){
        toast.success(name+" Registered Successfully");
      }else{
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong")
    }
  };
  return (
    <div className="shop__category__container">
      <div className="shop__category__header">
        <div className="shop__category__header__big">
          <div className="shop__category__head">
            <h2>Register a Product</h2>
          </div>
          <div className="shop__category__header__line"></div>
        </div>
      </div>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />

      <div className="shop__category__card__container">
        <div className="shop__category__product__card">
          {/* create a form with fields to get name, description, price, stocks available and image url */}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Name of your product"
                ref={nameReference}
                //value="Black t-shirt"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="Description about your product"
                ref={descReference}
                //value="its just a black tshirt not rocker science"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Product Price</Form.Label>
              <Form.Control
                type="text"
                placeholder="Price of your product"
                ref={priceReference}
                //value="100"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Stocks Available</Form.Label>
              <Form.Control
                type="text"
                placeholder="Count"
                ref={stockReference}
                //value="100"
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Image Url's</Form.Label>
              <Form.Control
                as="textarea"
                
                placeholder="Type url one by one"
                ref={imagesReference}
                //value="https://images.unsplash.com/photo-1616161610000-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80\nhttps://images.unsplash.com/photo-1616161610000-1b1b1b1b1b1b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80 "
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Sizes</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter size one by one"
                ref={sizeReference}
                //value="S\nM\nL\nXL"
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Control wrap="false" type="submit" value="Register" />
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default AdminCard;

import React,{useRef} from 'react'
import Form from "react-bootstrap/Form";
import "../../../css/AdminPage.css";
import axios from 'axios';



const AdminCard = () => {
    const nameReducer       = useRef();
    const priceReducer       = useRef();
    const imagesReducer       = useRef();
    const descReducer       = useRef();
    const stockReducer       = useRef();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const name = nameReducer.current.value;
        const price = priceReducer.current.value;
        const images = imagesReducer.current.value;
        const desc = descReducer.current.value;
        const stock = stockReducer.current.value;
        const product = {
            name,
            price,
            images,
            desc,
            stock
        }
        //console.log(product);
        //fetch to post the product
        try {
          const response    = await axios.post("http://localhost:8003/product/list",product);
          //console.log(response);
        } catch (error) {
          
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
    <div className="shop__category__card__container">
      <div className="shop__category__product__card">
        {/* create a form with fields to get name, description, price, stocks available and image url */}
        <Form onSubmit={handleSubmit}> 
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            >
            <Form.Label>Product Name</Form.Label>
            <Form.Control type="text" placeholder="Name of your product"ref={nameReducer} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            >
            <Form.Label>Product Description</Form.Label>
            <Form.Control type="text" placeholder="Name of your product"ref={descReducer} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            >
            <Form.Label>Product Price</Form.Label>
            <Form.Control type="text" placeholder="Name of your product"ref={priceReducer} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlInput1"
            >
            <Form.Label>Stocks Available</Form.Label>
            <Form.Control type="text" placeholder="Count"ref={stockReducer} />
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Label>Image Url's</Form.Label>
            <Form.Control as="textarea" rows={2} wrap="false" placeholder='type url one by one' ref={imagesReducer}/>
          </Form.Group>
          <Form.Group
            className="mb-3"
            controlId="exampleForm.ControlTextarea1"
          >
            <Form.Control wrap="false"type='submit'value="Register" />
          </Form.Group>
        </Form>
      </div>
    </div>
  </div>
  )
}

export default AdminCard

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from "../slices/productsApiSlice";
import { addToCart } from '../slices/cartSlice';

export default function ProductScreen() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productQty, setProductQty] = useState(1);
  const [showGoToCartButton, setShowGoToCartButton] = useState(false)

  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId);

  const addToCartHandler = () => { 
    dispatch(addToCart({ ...product, productQty }));
    // navigate('/cart');
    setShowGoToCartButton(true);
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> 
          { error?.data?.message || error.error } 
        </Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: ${product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description: {product.description}
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? "In stock" : "Out of stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Quantity:</Col>
                      <Col>
                        <Form.Control 
                          as='select'
                          value={productQty}
                          onChange={(e) => 
                            setProductQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((xItem) =>
                            <option key={xItem + 1} value={xItem + 1}>
                              {xItem + 1}
                            </option>)}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item className="d-flex gap-2">
                  <Button
                    className="flex-fill"
                    type="button"
                    disabled={product.countInStock === 0}
                    style={
                      product.countInStock === 0
                        ? { cursor: "not-allowed", pointerEvents: "auto" } // override Bootstrap from disabling cursor
                        : {}
                    }
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                  {showGoToCartButton && (
                    <Button 
                      className="flex-fill"
                      variant="secondary"
                      onClick={() => navigate('/cart')}
                    >
                      Go to Cart
                    </Button>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
}


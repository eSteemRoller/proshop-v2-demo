
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Form, Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useReadProductQuery, useCreateProductReviewMutation } from "../slices/productsApiSlice";
import { addToCart } from '../slices/cartApiSlice';
import { toast } from 'react-toastify';


export default function ProductScreen() {
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productQty, setProductQty] = useState(1);
  const { cartItems } = useSelector((state) => state.cart);
  const [showGoToCartButton, setShowGoToCartButton] = useState(false)
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useReadProductQuery(productId);

  const [createProductReview, { isLoading: isLoadingProductReview }] = 
    useCreateProductReviewMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const missingProfileName = userInfo && (!userInfo.firstName || !userInfo.lastName);

  const addToCartHandler = () => { 
    dispatch(addToCart({ ...product, productQty }));
    // navigate('/cart');
    setShowGoToCartButton(true);
    // if (productQty > 0) { 
    //   res.status(304).json({ message: "Error: Item quantity can be adjusted in your cart"});
    // }
  }

  const submitReviewHandler = async (e) => { 
    e.preventDefault();
    try {
      await createProductReview({ 
        productId,
        rating,
        comment
      }).unwrap();
      refetch();

      toast.success("Success: Review submitted");
      setRating(0);
      setComment('');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Return to Latest Products
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'> 
          { error?.data?.message || error.error } 
        </Message>
      ) : ( 
        <>
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
                      disabled={product.countInStock === 0 } // To Do: Disable cursor if item already in cart
                      style={
                        product.countInStock === 0
                          ? { cursor: "not-allowed", pointerEvents: "auto" } // overrides Bootstrap from disabling cursor
                          : {}
                        ||
                        cartItems.productQty > 0
                          ? { cursor: "not-allowed", pointerEvents: "auto" } // overrides Bootstrap from disabling cursor
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
          <Row className='review'>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No reviews found</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map(review => ( 
                  <ListGroup.Item key={review._id}>
                    <strong>{review.firstName} {review.lastName}</strong>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <Rating value={review.rating} />
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Review:</h2>
                  {isLoadingProductReview && <Loader />}
                  {userInfo ? (
                    missingProfileName ? (
                      <Message>
                        Please complete your profile (first and last name) before submitting a review.{' '}
                        <Link to='/my_profile'>Update profile</Link>
                      </Message>
                    ) : (
                    <Form onSubmit={submitReviewHandler}>
                      <Form.Group controlId='rating' className='my-2'>
                        <Form.Label>
                          Rating
                        </Form.Label>
                        <Form.Control 
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(Number(e.target.value))}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Satisfactory</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment' className='my-2'>
                        <Form.Label>
                          Comment
                        </Form.Label>
                        <Form.Control 
                          as='textarea'
                          row='4'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <div className='d-flex justify-content-between'>
                        <Button 
                          disabled={isLoadingProductReview}
                          type='button'
                          className='btn btn-light my-2 text-decoration-none' 
                          onClick={() => { setRating(0); setComment(''); }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          disabled={isLoadingProductReview}
                          type='submit'
                          variant='primary'
                        >
                          Submit
                        </Button>
                      </div>
                    </Form>
                    )
                  ) : ( 
                    <Message>
                      To write a review, please, <Link to='/sign_in'>sign in</Link>.
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
}


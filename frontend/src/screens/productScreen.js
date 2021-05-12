import { Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Button, Card,Form } from 'react-bootstrap'
import Rating from '../component/Rating'

import { propTypes } from 'react-bootstrap/esm/Image'
import {useEffect,useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {listProductDetails} from '../actions/productActions'
const ProductScreen = ({ match , history}) => {
    const [qty,setqty] = useState(1)

   const dispatch = useDispatch()
    const productDetails = useSelector(state=>state.productDetails)
    const {loading,error,product} = productDetails
    useEffect(()=>{
      dispatch(listProductDetails(match.params.id))
       
    },[])

   const addToCartHandler = ()=>{
       history.push(`/cart/${match.params.id}?qty=${qty}`)
   }
    // console.log(product,'product')
    return (<div>
        <Link to='/' className="btn btn-light my-3">
            Go Back
        </Link>
        <Row>
            <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
            </Col>
            <Col md={3}>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h3>
                            {product.name}
                        </h3>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <Rating value={product.rating} text={`${product.numReviews} reviews `} color={'#f8e825'} />
                    </ListGroup.Item>

                    <ListGroup.Item>
                        Price : ${product.price}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        description : ${product.description}
                    </ListGroup.Item>
                </ListGroup>
            </Col>
            <Col md={3}>
                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>
                                        Price :
                               </strong>
                                </Col>
                                <Col>
                                    ${product.price}
                                </Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>
                                    <strong>
                                        Status :
                              </strong>
                                </Col>
                                <Col>
                                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                                </Col>
                            </Row>
                        </ListGroup.Item>
                            {
                                product.countInStock>0 && (
                                   <ListGroup.Item>
                                       <Row>
                                           <Col className="my-1">
                                           Qty
                                           </Col>
                                           <Col xs='auto' className="my-1">
                                           <Form.Control
                                           as="select"
                                            value = {qty}
                                            onChange={(e)=>setqty(e.target.value)}
                                           >
                                            {[...Array(product.countInStock).keys()].map(x=>{
                                                return (
                                                    <option value={x+1} key={x+1} >
                                                        {x+1}
                                                    </option>
                                                )
                                            })}
                                           </Form.Control>
                                           </Col>
                                       </Row>
                                   </ListGroup.Item>
                                )
                            }
                           
                        <ListGroup.Item>
                            <Button onClick={addToCartHandler}
                            className="btn btn-block" disabled={product.countInStock == 0} type="button">
                                Add To Cart
                            </Button>
                        </ListGroup.Item>
                    </ListGroup>
                </Card>

            </Col>
        </Row>
    </div>
    );
}

export default ProductScreen;
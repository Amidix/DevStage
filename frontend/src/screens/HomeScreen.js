import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Product from '../components/Product.js'
import Message from '../components/Message.js'
import Loader from '../components/Loader.js'
import { Row, Col } from 'react-bootstrap'
import { listProducts } from '../actions/productActions'

const HomeScreen = ({ match }) => {
  const keyword = match.params.keyword

  const dispatch = useDispatch()
  const productList = useSelector((state) => state.productList)
  const { loading, error, products } = productList

  useEffect(() => {
    dispatch(listProducts(keyword))
  }, [dispatch, keyword])

  return (
    <>
    <head>
    <meta charset="utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <title>Food and Restorent One page Template</title>
        <meta name="description" content=""/>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="apple-touch-icon" href="apple-touch-icon.png"/>

        <link rel="stylesheet" href="../../assets/css/bootstrap.min.css"/>
        <link href='https://fonts.googleapis.com/css?family=Pacifico' rel='stylesheet' type='text/css'/>
        <link rel="stylesheet" href="../../assets/css/font-awesome.min.css"/>
            <link rel="stylesheet" href="../../assets/css/bootstrap-theme.min.css"/>


       
        <link rel="stylesheet" href="../../assets/css/animate/animate.css" />
        <link rel="stylesheet" href="../../assets/css/plugins.css" />

    
        <link rel="stylesheet" href="../../assets/css/style.css"/>

        <link rel="stylesheet" href="../../assets/css/responsive.css" />

        <script src="../../assets/js/vendor/modernizr-2.8.3-respond-1.4.2.min.js"></script>
   </head>
    <section id="slider" class="slider">
            <div class="slider_overlay">
                <div class="container">
                    <div class="row">
                        <div class="main_slider text-center">
                            <div class="col-md-12">
                                <div class="main_slider_content wow zoomIn" data-wow-duration="1s">
                                    <h1>Foody Love</h1>
                                    <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi. </p>
                                    <button href="" class="btn-lg">Click here</button>
                                </div>
                            </div>	
                        </div>

                    </div>
                </div>
            </div>
        </section>

        <section id="abouts" class="abouts">
            <div class="container">
                <div class="row">
                    <div class="abouts_content">
                        <div class="col-md-6">
                            <div class="single_abouts_text text-center wow slideInLeft" data-wow-duration="1s">
                                <img src="assets/images/ab.png" alt="" />
                            </div>
                        </div>

                        <div class="col-md-6">
                            <div class="single_abouts_text wow slideInRight" data-wow-duration="1s">
                                <h4>About us</h4>
                                <h3>WE ARE TASTY</h3>
                                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stan</p>

                                <p>dard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettingdard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>

                                <a href="" class="btn btn-primary">click here</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="features" class="features">
            <div class="slider_overlay">
                <div class="container">
                    <div class="row">
                        <div class="main_features_content_area  wow fadeIn" data-wow-duration="3s">
                            <div class="col-md-12">
                                <div class="main_features_content text-left">
                                    <div class="col-md-6">
                                        <div class="single_features_text">
                                            <h4>Special Recipes</h4>
                                            <h3>Taste of Precious</h3>
                                            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's stan</p>
                                            <p>dard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesettingdard dummy text ever since the 1500s,when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting</p>

                                            <a href="" class="btn btn-primary">click here</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="portfolio" class="portfolio">
            <div class="container">
                <div class="row">
                    <div class="portfolio_content text-center  wow fadeIn" data-wow-duration="5s">
                        <div class="col-md-12">
                            <div class="head_title text-center">
                                <h4>Delightful</h4>
                                <h3>Experience</h3>
                            </div>

                            <div class="main_portfolio_content">
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p1.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p2.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p3.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p4.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p5.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p6.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p7.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                                <div class="col-md-3 col-sm-4 col-xs-6 single_portfolio_text">
                                    <img src="assets/images/p8.png" alt="" />
                                    <div class="portfolio_images_overlay text-center">
                                        <h6>Italian Source Mushroom</h6>
                                        <p class="product_price">$12</p>
                                        <a href="" class="btn btn-primary">Click here</a>
                                    </div>								
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="ourPakeg" class="ourPakeg">
            <div class="container">
                <div class="main_pakeg_content">
                    <div class="row">
                        <div class="head_title text-center">
                            <h4>Amazing</h4>
                            <h3>Delicious</h3>
                        </div>

                        <div class="single_pakeg_one text-right wow rotateInDownRight">
                            <div class="col-md-6 col-md-offset-6 col-sm-8 col-sm-offset-4">
                                <div class="single_pakeg_text">
                                    <div class="pakeg_title">
                                        <h4>Drinks</h4>
                                    </div>

                                    <ul>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="single_pakeg_two text-left wow rotateInDownLeft">
                            <div class="col-md-6 col-sm-8">
                                <div class="single_pakeg_text">
                                    <div class="pakeg_title">
                                        <h4>Main course </h4>
                                    </div>

                                    <ul>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div class="single_pakeg_three text-left wow rotateInDownRight">
                            <div class="col-md-6 col-md-offset-6 col-sm-8 col-sm-offset-4">
                                <div class="single_pakeg_text">
                                    <div class="pakeg_title">
                                        <h4>Desserts</h4>
                                    </div>

                                    <ul>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                        <li> Tuna Roast Source........................................................$24.5 </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section id="mobaileapps" class="mobailapps">
            <div class="slider_overlay">
                <div class="container">
                    <div class="row">
                        <div class="main_mobail_apps_content wow zoomIn">
                            <div class="col-md-5 col-sm-12 text-center">
                                <img src="assets/images/iphone.png" alt="" />
                            </div>
                            <div class="col-md-7 col-sm-12">
                                <div class="single_monail_apps_text">
                                    <h4> Happy to Announce </h4>
                                    <h1>Mobile App <span>is Available in every OS platform.</span></h1>

                                    <a href=""><img src="assets/images/google.png" alt="" /></a>
                                    <a href=""><img src="assets/images/apps.png" alt="" /></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

       

    </>
  )
}

export default HomeScreen
/*
 <h1>Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
*/
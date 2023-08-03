import React, { useEffect, useState } from 'react';
import '../CSS/ProductMain.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function ProductMain() {

    useEffect(() => {
        fetchProductsData();
    }, []);

    const [productData, setProductData] = useState([])
    const fetchProductsData = () => {
        axios.get('http://localhost:1005/product/1/1')
            .then((response) => {
                setProductData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Product data in Brand.js:', error);
            });
    }

    //PASS PRODUCT ID FOR IEW PRODUCT
    const navigate = useNavigate();
    const handleWatchProduct = (prodId) => {
        navigate('/products/about-product', {
            state: { id: prodId }
        })
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // POPULER PRODUCT GET DATA

    return (
        <>
            <div className="container-fluid prod-bg1 img-fluid shadow">
                <div className="row">
                    <div className="col-lg-6"></div>
                    <div className="col-lg-6 welcome-main">
                        <p className='prod-welcome-text'>Welcome to our</p>
                        <p className='prod-welcome-head'><span className='prod-head-brd'>FO</span>ROLLY</p>
                        <p className='prod-welcome-para'>Chocolate and love go hand in hand – if you want to get
                            on your loved one’s good side, feed them a steady supply of confectionery! In fact, a
                            study by the Journal of Social and Personal Relationships found that eating sweet treats
                            can lead to heightened romantic interest.
                        </p>
                    </div>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row text-center">
                    <p className='prod-about-text'>Our</p>
                    <p className='prod-about-head'>PRODUCTS</p>
                    <p className="prod-about-para">
                        Your content goes here. Edit or remove this text inline or in the module Content settings.
                        You can also style every aspect of this content in the module Design settings and even
                        apply custom CSS to this text in the module Advanced settings
                    </p>
                </div>
            </div>

            <div className="container mt-5">
                <div className="row mb-md-5 mb-0">
                    {productData.map((product) => (
                        <div className="demo col-lg-3 col-md-6" key={product.prod_id}>
                            <div className="product-all text-center">
                                <div className='prod-main' onClick={() => { handleWatchProduct(product.prod_id) }}>
                                    {product.image && (
                                        <img className='prod-img' src={require(`../Assets/upload/${product.image}`)} alt="" width="100px" loading='lazy' />
                                    )}
                                </div>
                                <p className='prod-img-title'>{product.title}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}  

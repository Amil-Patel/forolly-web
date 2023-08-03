import React, { useState, useEffect } from 'react';
import '../../CSS/admin/AddProd.css';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CKEditor from 'react-ckeditor-component';

export default function AddProd() {

    //GET BRAND DATA
    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        fetchBrandData();
    }, []);
    const fetchBrandData = () => {
        axios.get('http://localhost:1005/brand')
            .then((response) => {
                setBrandData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    };

    //GET CATEGORY DATA
    const [cateData, setCateData] = useState([]);
    useEffect(() => {
        fetchCateData();
    }, []);
    const fetchCateData = () => {
        axios
            .get('http://localhost:1005/category')
            .then((response) => {
                setCateData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    };

    //SAVE PRODUCT DATA
    const navigate = useNavigate();
    const [saveProd, setSaveProd] = useState({
        brand_id: "",
        cate_id: "",
        title: "",
        short_desc: "",
        long_desc: "",
        image: null,
        previewImage: null
    });
    const handleBrandSelect = (event) => {
        setSaveProd((prevEdit) => ({
            ...prevEdit,
            brand_id: event.target.value
        }));
    };
    const handleCateSelect = (event) => {
        setSaveProd((prevEdit) => ({
            ...prevEdit,
            cate_id: event.target.value
        }));
    };
    const handleTitleChange = (event) => {
        const { name, value } = event.target;
        setSaveProd((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    };
    const handleShortChange = (content) => {
        setSaveProd((prevData) => ({
            ...prevData,
            short_desc: content
        }));
    }
    const handleLongChange = (content) => {
        setSaveProd((prevData) => ({
            ...prevData,
            long_desc: content
        }));
    }
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSaveProd((prevProdData) => ({
                ...prevProdData,
                image: file,
                previewImage: reader.result
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const saveProdData = (e) => {
        e.preventDefault();
        const { brand_id, cate_id, title, short_desc, long_desc, image } = saveProd;
        const formData = new FormData();
        formData.append('brand_id', brand_id);
        formData.append('cate_id', cate_id);
        formData.append('title', title);
        formData.append('short_desc', short_desc);
        formData.append('long_desc', long_desc);
        formData.append('image', image);
        axios.post('http://localhost:1005/product', formData)
            .then(() => {
                setLoading(true);
                setTimeout(() => {
                    navigate("/product");
                }, 1000);
            })
            .catch((error) => {
                alert("Error adding product data");
                console.log('Error adding product data in Product.js:', error);
            });
    };


    return (
        <>
            <div className="add-form-main">
                <form method='post' onSubmit={saveProdData}>
                    <div className='addMain p-4'>
                        <h1 className="text-center">ADD PRODUCT</h1>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Brand Name:</label>
                            <select className="form-select" name="brand" aria-label="Default select example" onChange={handleBrandSelect}>
                                <option value="">Select Brand</option>
                                {
                                    brandData.map((option) => (
                                        <option key={option.brand_id} value={option.brand_id}>
                                            {option.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Category Name:</label>
                            <select className="form-select" name="brand" aria-label="Default select example" onChange={handleCateSelect}  >
                                <option value="">Select Category</option>
                                {
                                    cateData.map((option) => (
                                        <option key={option.cate_id} value={option.cate_id}>
                                            {option.name}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Title:</label>
                            <input type="text" className="form-control" name="title" placeholder='Enter Product Title' onChange={handleTitleChange} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="userName" className="form-label">Product Short Description:</label>
                            <CKEditor name="short_desc" content={saveProd.short_desc}
                                events={{ change: (evt) => handleShortChange(evt.editor.getData()) }}
                                config={{ enterMode: 2, shiftEnterMode: 1 }} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="userName" className="form-label">Product Long Description:</label>
                            <CKEditor name="long_desc" content={saveProd.long_desc}
                                events={{ change: (evt) => handleLongChange(evt.editor.getData()) }}
                                config={{ enterMode: 2, shiftEnterMode: 1 }} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Product Image</label>
                            <input className="form-control" name='image' type="file" onChange={handleFileChange} />
                            {saveProd.previewImage && (
                                <img src={saveProd.previewImage} alt="Preview" style={{ width: '15%', marginTop: '10px' }} />
                            )}
                        </div>
                        <button type="submit" className="btn btn-success mt-3">SAVE</button>
                        <NavLink to="/product" className="btn btn-danger mt-3 ms-3">BACK</NavLink>
                        {loading && (
                            <div className="lds-roller prodAddLoader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                        )}
                    </div>
                </form>
            </div>
        </>
    )
}

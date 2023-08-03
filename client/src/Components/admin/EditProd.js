import React, { useState, useEffect } from 'react';
import { useLocation, NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import CKEditor from 'react-ckeditor-component';

export default function EditProd() {

    const [loading, setLoading] = useState(false);
    const location = useLocation();
    const editId = location.state.id;

    useEffect(() => {
        fetchBrandData();
        fetchCateData();
        fetchProdData(editId);
    }, []);

    //GET BRAND DATA
    const [brandData, setBrandData] = useState([]);
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
    const fetchCateData = () => {
        axios.get('http://localhost:1005/category')
            .then((response) => {
                setCateData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    };

    //GET PRODUCT DATA
    const [prodData, setProdData] = useState({
        brand_id: "",
        cate_id: "",
        title: "",
        short_desc: "",
        long_desc: "",
        image: null
    });
    const fetchProdData = (id) => {
        axios.get(`http://localhost:1005/product/${id}/10`)
            .then((response) => {
                setProdData(response.data[0]);
            })
            .catch((error) => {
                console.log('Error fetching Product data:', error);
            });
    };

    //EDIT PRODUCT DATA
    const handleEditBrandChange = (event) => {
        setProdData((prevEdit) => ({
            ...prevEdit,
            brand_id: event.target.value
        }));
    };
    const handleEditCateChange = (event) => {
        setProdData((prevEdit) => ({
            ...prevEdit,
            cate_id: event.target.value
        }));
    };
    const handleEditFileChange = (event) => {
        setProdData((prevData) => ({
            ...prevData,
            image: event.target.files[0]
        }));
    };
    const handleEditShortChange = (content) => {
        setProdData((prevData) => ({
            ...prevData,
            short_desc: content
        }));
    };
    const handleEditLongChange = (content) => {
        setProdData((prevData) => ({
            ...prevData,
            long_desc: content
        }));
    };
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setProdData((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    };
    const navigate = useNavigate();
    const saveProductData = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("brand_id", prodData.brand_id);
        formData.append("cate_id", prodData.cate_id);
        formData.append("title", prodData.title);
        formData.append("short_desc", prodData.short_desc);
        formData.append("long_desc", prodData.long_desc);
        formData.append("image", prodData.image);

        axios.put(`http://localhost:1005/product/${editId}/6`, formData)
            .then(() => {
                setLoading(true);
                setTimeout(() => {
                    navigate('/product');
                }, 1000);
            })
            .catch((error) => {
                console.log("Erro in updat product data " + error);
            })
    };


    return (
        <>
            <div className="add-form-main">
                <form method='post' onSubmit={saveProductData}>
                    <div className='addMain p-4'>
                        <h1 className="text-center">EDIT PRODUCT</h1>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Brand Name:</label>
                            <select className="form-select" name="brand_id" aria-label="Default select example" value={prodData.brand_id} onChange={handleEditBrandChange}>
                                <option value="">Select Brand</option>
                                {brandData.map((option) => (
                                    <option key={option.brand_id} value={option.brand_id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleFormControlInput1" className="form-label">Category Name:</label>
                            <select className="form-select" name="cate_id" aria-label="Default select example" value={prodData.cate_id} onChange={handleEditCateChange}>
                                <option value="">Select Category</option>
                                {cateData.map((option) => (
                                    <option key={option.cate_id} value={option.cate_id}>
                                        {option.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Title:</label>
                            <input type="text" className="form-control" name="title" placeholder="Enter Product Title" value={prodData.title} onChange={handleEditChange} />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="userName" className="form-label">Product Short Description:</label>
                            <CKEditor name="short_desc" content={prodData.short_desc}
                                events={{ change: (evt) => handleEditShortChange(evt.editor.getData()) }}
                                config={{ enterMode: 2, shiftEnterMode: 1 }}
                            />
                        </div>
                        <div className='mb-2'>
                            <label htmlFor="userName" className="form-label">Product Long Description:</label>
                            <CKEditor name="long_desc" content={prodData.long_desc}
                                events={{ change: (evt) => handleEditLongChange(evt.editor.getData()) }}
                                config={{ enterMode: 2, shiftEnterMode: 1 }}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="formFile" className="form-label">Product Image</label>
                            <input className="form-control mb-2" name="image" type="file" onChange={handleEditFileChange} />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">SAVE</button>
                        <NavLink to="/product" className="btn btn-danger mt-3 ms-3">BACK</NavLink>
                    </div>
                </form>
                {loading && (
                    <div className="lds-roller prodAddLoader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                )}
            </div>
        </>
    )
}

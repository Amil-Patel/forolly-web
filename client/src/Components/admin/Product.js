import React, { useState, useEffect } from 'react';
import '../../CSS/admin/Product.css';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Product() {

    //DIALOGUE BOX
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (brand) => {
        setOpen(true);
        setSelectedCategory(brand);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const [prodData, setProdData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [nuteration, setNuteration] = useState([]);

    const getNuteration = async () => {
        try {
            const response = await axios.get("http://localhost:1005/nutrition");
            setNuteration(response.data);
        } catch (error) {
            console.log("Error:", error);
        }
    };

    const hasNutrition = (prod_id) => {
        return nuteration.some((item) => item.prod_id === prod_id);
    };

    useEffect(() => {
        fetchProdData();
        getNuteration();
    }, []);

    const fetchProdData = () => {
        setLoading(true);
        axios.get('http://localhost:1005/product')
            .then((response) => {
                setProdData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching Product data in Brand.js:', error);
                setLoading(false);
            });
    };

    //DELETE PRODUCT DATA
    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:1005/product/${deleteId}`)
            .then(() => {
                fetchProdData();
                setOpen(false);
            })
            .catch((error) => {
                console.log(error + "in delete");
            });
    };

    //EDIT PRODUCT STATUS
    const handleProdStatus = (prodId, newStatus) => {
        setLoading(true)
        axios.put(`http://localhost:1005/product/${prodId}/0`, { status: newStatus })
            .then(() => {
                fetchProdData();
                setLoading(false);
            })
            .catch((error) => {
                console.log(error + "in update");
                setLoading(false);
            });
    };

    //EDIT PRODUCT SLIDER

    const handleProdSlider = (prodId, newSlider) => {
        setLoading(true)
        axios.put(`http://localhost:1005/product/${prodId}/1`, { slider: newSlider })
            .then(() => {
                fetchProdData();
                setLoading(false);
            })
            .catch((error) => {
                console.log(error + "in update");
                setLoading(false);
            });
    }

      //EDIT PRODUCT SLIDER

      const handleProdPopuler = (prodId, newPopuler) => {
        setLoading(true)
        axios.put(`http://localhost:1005/product/${prodId}/2`, { populer: newPopuler })
            .then(() => {
                fetchProdData();
                setLoading(false);
            })
            .catch((error) => {
                console.log(error + "in update");
                setLoading(false);
            });
    }

    //EDIT PRODUCT DATA
    const handleEditProd = (prodId) => {
        navigate("/edit-product", {
            state: { id: prodId }
        });
    }

    //VIEW PRODUCT DATA
    const navigate = useNavigate();
    const handleViewData = (viewId) => {
        navigate("/view-product", {
            state: { id: viewId }
        });
    }

    //NUTRITION ADD DATA
    const handleNutrition = (nutrId) => {
        navigate("/add-nutrition", {
            state: { id: nutrId }
        });
    }

    //VIEW NUTRITION DATA
    const handleViewNutrData = (viewNutIdd) => {
        navigate("/view-nutrition", {
            state: { id: viewNutIdd }
        });
    }


    return (
        <>
            <div className='cate-main'>
                <div className='cate-head-main'>
                    <h1 className='text-white'>PRODUCT</h1>
                </div>
                <div className="cate-btn-main">
                    <NavLink to="/add-product" className="btn mt-2 prod-add-btn">
                        <i className="fa-solid fa-circle-plus"></i> Add Data
                    </NavLink>
                </div>
            </div>
            {loading && (
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            )}

            <table className="table table-bordered brand-table">
                <thead>
                    <tr>
                        <th scope="col" width="16.6%">Product Id</th>
                        <th width="16.6%">Product Name</th>
                        <th width="16.6%">Image</th>
                        <th width="16.6%">Status</th>
                        <th width="16.6%">Slider</th>
                        <th width="16.6%">populer</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        prodData.map((product) => {
                            const isActive = product.status;
                            const isSlider = product.slider;
                            const isPopuler = product.populer;

                            return (
                                <tr key={product.prod_id} className='brand-row'>
                                    <th>
                                        {product.prod_id}
                                        <div className='d-flex'>
                                            <div>
                                                <Button className='delete-brand-btn' onClick={() => handleClickOpen(product)}>Delete</Button>
                                                <Dialog open={open}
                                                    onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Do You Want To Delete this data?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={() => { handleDelete(selectedCategory.prod_id) }} autoFocus>Delete</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            <button type="button" className='slash-btn p-0 pe-2'>/</button>
                                            <button type='button' className='delete-btn' onClick={() => { handleEditProd(product.prod_id) }}>Edit</button>
                                        </div>
                                        <div>
                                            {hasNutrition(product.prod_id) ? (
                                                <button type='button' className='delete-btn'
                                                    onClick={() => { handleViewNutrData(product.prod_id) }} >View Nutrition</button>
                                            ) : (
                                                <button type='button' className='delete-btn'
                                                    onClick={() => { handleNutrition(product.prod_id) }}>
                                                    Add Nutrition
                                                </button>
                                            )}
                                        </div>
                                    </th>
                                    <td onClick={() => { handleViewData(product.prod_id) }}>{product.title}</td>
                                    <td onClick={() => { handleViewData(product.prod_id) }}>
                                        {product.image && (
                                            <img src={require(`../../Assets/upload/${product.image}`)} alt="" width="100px" />
                                        )}
                                    </td>
                                    <td>
                                        {isActive === 1 ? (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="active" onChange={() => { handleProdStatus(product.prod_id, 0) }} checked={true} />
                                            </div>
                                        ) : (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="inactive" onChange={() => { handleProdStatus(product.prod_id, 1) }} checked={false} />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isSlider === 1 ? (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="active" onChange={() => { handleProdSlider(product.prod_id, 0) }} checked={true} />
                                            </div>
                                        ) : (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="inactive" onChange={() => { handleProdSlider(product.prod_id, 1) }} checked={false} />
                                            </div>
                                        )}
                                    </td>
                                    <td>
                                        {isPopuler === 1 ? (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="active" onChange={() => { handleProdPopuler(product.prod_id, 0) }} checked={true} />
                                            </div>
                                        ) : (
                                            <div className="form-check">
                                                <input className="form-check-input" type="checkbox" id="inactive" onChange={() => { handleProdPopuler(product.prod_id, 1) }} checked={false} />
                                            </div>
                                        )}
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

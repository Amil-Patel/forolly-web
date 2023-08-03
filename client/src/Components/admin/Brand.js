import React, { useState, useEffect } from 'react';
import '../../CSS/admin/Brand.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Brand() {

    const [brandData, setBrandData] = useState([]);
    const [loading, setLoading] = useState(false);

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

    useEffect(() => {
        fetchBrandData();
    }, []);
    const fetchBrandData = () => {
        setLoading(true);
        axios.get('http://localhost:1005/brand')
            .then((response) => {
                setBrandData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
                setLoading(false);
            });
    };

    //ADD BRAND DATA
    const [addBrand, setAddBrand] = useState({
        name: "",
        image: null,
        previewImage: null
    });
    const handleBrandChange = (event) => {
        const { name, value } = event.target;
        setAddBrand((prevProdData) => ({
            ...prevProdData,
            [name]: value
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAddBrand((prevProdData) => ({
                ...prevProdData,
                image: file,
                previewImage: reader.result
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const saveBrandData = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', addBrand.name);
        formData.append('image', addBrand.image);
        setLoading(true);

        axios.post('http://localhost:1005/brand', formData)
            .then(() => {
                setTimeout(() => {
                    fetchBrandData();
                }, 1000);
            })
            .catch((error) => {
                alert("Enter All Details");
                console.log('Error adding brand data in Product.js:', error);
                setLoading(false);
            });
    };

    //DELETE BRAND DATA
    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:1005/brand/${deleteId}`)
            .then(() => {
                fetchBrandData();
                setOpen(false);
            })
            .catch((error) => {
                console.log(error + "in delete");
            });
    };

    //EDIT BRAND DATA
    const [brandEdit, setBrandEdit] = useState({
        name: "",
        image: null
    });
    const handleBrandEdit = (editId) => {
        axios.get(`http://localhost:1005/brand/${editId}`)
            .then((response) => {
                setBrandEdit(response.data[0]);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    }
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setBrandEdit((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    }
    const handleEditImageChange = (event) => {
        setBrandEdit((prevData) => ({
            ...prevData,
            image: event.target.files[0]
        }));
    };
    const handleSaveEditData = (id) => {
        const formData = new FormData();
        formData.append('image', brandEdit.image);
        formData.append('name', brandEdit.name);
        setLoading(true);
        axios.put(`http://localhost:1005/brand/${id}`, formData)
            .then(() => {
                setTimeout(() => {
                    fetchBrandData();
                }, 1300);
            })
            .catch((error) => {
                console.log("Error updating product data in Product.js: ", error);
            });
    };


    return (
        <>
            {/* ADD DATA MODEL */}
            <div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form method="post" onSubmit={saveBrandData}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">ADD BRAND</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Brand name:</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Brand Name..." onChange={handleBrandChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Brand Logo:</label>
                                    <input type="file" className="form-control" name='image' onChange={handleFileChange} />
                                    {addBrand.previewImage && (
                                        <img src={addBrand.previewImage} alt="Preview" style={{ width: '15%', marginTop: '10px' }} />
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* EDIT DATA MODEL */}
            <div className="modal ade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form method="post">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">EDIT BRAND</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Brand name:</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Brand Name..." onChange={handleEditChange} value={brandEdit.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Brand Logo:</label>
                                    <input type="file" className="form-control" name='image' onChange={handleEditImageChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => { handleSaveEditData(brandEdit.brand_id) }} data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='cate-main'>
                <div className='cate-head-main'>
                    <h1 className='text-white'>BRAND</h1>
                </div>
                <div className="cate-btn-main">
                    <button type="button" className="btn mt-2" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <i className="fa-solid fa-circle-plus"></i> Add Data
                    </button>
                </div>
            </div>
            {loading && (
                <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            )}
            <table className="table brand-table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" width="33%">Brand Id</th>
                        <th width="33%">Brand Name</th>
                        <th width="33%">Brand Logo</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        brandData.map((brand) => {
                            return (
                                <tr key={brand.brand_id} className='brand-row'>
                                    <th>
                                        {brand.brand_id}
                                        <div className='d-flex'>
                                            <div>
                                                <Button className='delete-brand-btn' onClick={() => handleClickOpen(brand)}>Delete</Button>
                                                <Dialog open={open}
                                                    onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Do You Want To Delete this data?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={() => { handleDelete(selectedCategory.brand_id) }} autoFocus>Delete</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            <button type="button" className='slash-btn p-0 pe-2'>/</button>
                                            <button type='button' className='delete-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleBrandEdit(brand.brand_id) }}>Edit</button>
                                        </div>
                                    </th>
                                    <td>{brand.name}</td>
                                    <td>
                                        {brand.image && (
                                            <img src={require(`../../Assets/upload/${brand.image}`)} alt="" width="200px" />
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

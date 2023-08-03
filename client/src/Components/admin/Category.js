import React, { useState, useEffect } from 'react';
import '../../CSS/admin/Brand.css';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Category() {
    const [cateData, setCateData] = useState([]);
    const [loading, setLoading] = useState(false);


    //DIALOGUE BOX
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (category) => {
        setOpen(true);
        setSelectedCategory(category);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchCateData();
    }, []);
    const fetchCateData = () => {
        setLoading(true);
        axios
            .get('http://localhost:1005/category')
            .then((response) => {
                setCateData(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
                setLoading(false);
            });
    };

    //ADD CATEGORY DATA
    const [addcate, setAddCate] = useState({
        name: "",
        description: "",
        image: null,
        previewImage: null
    });
    const handleCateChange = (event) => {
        const { name, value } = event.target;
        setAddCate((prevProdData) => ({
            ...prevProdData,
            [name]: value
        }));
    };
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAddCate((prevProdData) => ({
                ...prevProdData,
                image: file,
                previewImage: reader.result
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const saveCategoryData = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', addcate.name);
        formData.append('description', addcate.description);
        formData.append('image', addcate.image);
        setLoading(true);
        axios.post('http://localhost:1005/category', formData)
            .then(() => {
                setTimeout(() => {
                    fetchCateData();
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
        console.log(deleteId);
        axios.delete(`http://localhost:1005/category/${deleteId}`)
            .then(() => {
                fetchCateData();
                setOpen(false);
            })
            .catch((error) => {
                console.log(error + "in delete");
            });
    };

    //EDIT CATEGORY DATA
    const [cateEdit, setCateEdit] = useState({
        name: "",
        description: "",
        image: null
    });
    const handleCateEdit = (editId) => {
        axios.get(`http://localhost:1005/category/${editId}`)
            .then((response) => {
                setCateEdit(response.data[0]);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    }
    const handleEditChange = (event) => {
        const { name, value } = event.target;
        setCateEdit((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    }
    const handleEditImageChange = (event) => {
        setCateEdit((prevData) => ({
            ...prevData,
            image: event.target.files[0]
        }));
    };
    const handleSaveEditData = (id) => {
        const formData = new FormData();
        formData.append('description', cateEdit.description);
        formData.append('name', cateEdit.name);
        formData.append('image', cateEdit.image);
        setLoading(true);
        axios.put(`http://localhost:1005/category/${id}`, formData)
            .then(() => {
                setTimeout(() => {
                    fetchCateData();
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
                        <form method="post" onSubmit={saveCategoryData}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">ADD CATEGORY</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Name:</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Category Name..." onChange={handleCateChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Description:</label>
                                    <input type="text" className="form-control" name="description" placeholder="Enter Category Description..." onChange={handleCateChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Image:</label>
                                    <input type="file" className="form-control" name='image' onChange={handleFileChange} />
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
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">EDIT CATEGORY</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Name:</label>
                                    <input type="text" className="form-control" name="name" placeholder="Enter Category Name..." value={cateEdit.name} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Description:</label>
                                    <input type="text" className="form-control" name="description" placeholder="Enter Category Description..." value={cateEdit.description} onChange={handleEditChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Category Image:</label>
                                    <input type="file" className="form-control" name='image' onChange={handleEditImageChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => { handleSaveEditData(cateEdit.cate_id) }} data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='cate-main'>
                <div className='cate-head-main'>
                    <h1 className='text-white'>CATEGORY</h1>
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
                        <th scope="col" width="15%">Category Id</th>
                        <th width="25%">Category Name</th>
                        <th width="35%">Category Description</th>
                        <th width="25%">Category Image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cateData.map((category) => {
                            return (
                                <tr key={category.cate_id} className='brand-row'>
                                    <th>
                                        {category.cate_id}
                                        <div className='d-flex'>
                                            <div>
                                                <Button className='delete-brand-btn' onClick={() => handleClickOpen(category)}>Delete</Button>
                                                <Dialog open={open}
                                                    onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Do You Want To Delete this data?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cancel</Button>
                                                        <Button onClick={() => { handleDelete(selectedCategory.cate_id) }} autoFocus>Delete</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            <button type="button" className='slash-btn p-0 pe-2'>/</button>
                                            <button type='button' className='delete-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleCateEdit(category.cate_id) }}>Edit</button>
                                        </div>
                                    </th>
                                    <td>{category.name}</td>
                                    <td>{category.description}</td>
                                    <td>
                                        {category.image && (
                                            <img src={require(`../../Assets/upload/${category.image}`)} alt="" width="100px" />
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

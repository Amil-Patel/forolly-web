import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function BotSlider() {

    const [botSlid, setBotSlid] = useState([]);
    const [loading, setLoading] = useState(false);

    //DIALOGUE BOX
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (slider) => {
        setOpen(true);
        setSelectedCategory(slider);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        fetchBottomSlider();
    }, []);
    const fetchBottomSlider = () => {
        setLoading(true);
        axios
            .get('http://localhost:1005/bot-slider')
            .then((response) => {
                setBotSlid(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
                setLoading(false);
            });
    };

    //ADD BOTTOM SLIDER DATA
    const [addbotSlid, setAddBotSlid] = useState({
        image: null,
        previewImage: null
    });
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setAddBotSlid((prevProdData) => ({
                ...prevProdData,
                image: file,
                previewImage: reader.result
            }));
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };
    const saveSliderData = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('image', addbotSlid.image);
        setLoading(true);

        axios.post('http://localhost:1005/bot-slider', formData)
            .then(() => {
                setTimeout(() => {
                    fetchBottomSlider();
                }, 1000);
            })
            .catch((error) => {
                alert("Enter All Details");
                console.log('Error adding bottom slider data in topslider.js:', error);
                setLoading(false);
            });
    };

    //DELETE BOTTOM SLIDER DATA
    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:1005/bot-slider/${deleteId}`)
            .then(() => {
                fetchBottomSlider();
                setOpen(false);
            })
            .catch((error) => {
                console.log(error + "in delete");
            });
    };

    //EDIT BOTTOM SLIDER DATA
    const [botSlidEdit, setBotSlidEdit] = useState({
        image: null
    })
    const handleBotSliderEdit = (editId) => {
        axios.get(`http://localhost:1005/bot-slider/${editId}`)
            .then((response) => {
                setBotSlidEdit(response.data[0]);
            })
            .catch((error) => {
                console.log('Error fetching top-slider data in Brand.js:', error);
            });
    }
    const handleEditImageChange = (event) => {
        setBotSlidEdit((prevData) => ({
            ...prevData,
            image: event.target.files[0]
        }));
    };
    const handleSaveEditData = (id) => {
        const formData = new FormData();
        formData.append('image', botSlidEdit.image);
        setLoading(true);
        axios.put(`http://localhost:1005/bot-slider/${id}`, formData)
            .then(() => {
                setTimeout(() => {
                    fetchBottomSlider();
                }, 1300);
            })
            .catch((error) => {
                console.log("Error updating bottom slider data in botslider.js: ", error);
            });
    };

    return (
        <>
            {/* ADD DATA MODEL */}
            <div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form method="post" onSubmit={saveSliderData}>
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">ADD BOTTOM SLIDER</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Slider Image:</label>
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
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">EDIT BOTTOM SLIDER</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Slider Image:</label>
                                    <input type="file" className="form-control" name='image' onChange={handleEditImageChange} />
                                    {botSlidEdit.previewImage && (
                                        <img src={botSlidEdit.previewImage} alt="Preview" style={{ width: '15%', marginTop: '10px' }} />
                                    )}
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" onClick={() => { handleSaveEditData(botSlidEdit.id) }} data-bs-dismiss="modal">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='cate-main'>
                <div className='cate-head-main'>
                    <h1 className='text-white'>BOTTOM SLIDER</h1>
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
            <table className="table table-bordered brand-table">
                <thead>
                    <tr>
                        <th scope="col" width="40%">Slider Id</th>
                        <th width="60%">Slider image</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        botSlid.map((slider) => {
                            return (
                                <tr key={slider.id} className='brand-row'>
                                    <th>
                                        {slider.id}
                                        <div className='d-flex'>
                                            <div>
                                                <Button className='delete-brand-btn' onClick={() => handleClickOpen(slider)}>Delete</Button>
                                                <Dialog open={open}
                                                    onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                                    <DialogTitle id="alert-dialog-title">
                                                        {"Do You Want To Delete this data?"}
                                                    </DialogTitle>
                                                    <DialogActions>
                                                        <Button onClick={handleClose}>Cansel</Button>
                                                        <Button onClick={() => { handleDelete(selectedCategory.id) }} autoFocus>Delete</Button>
                                                    </DialogActions>
                                                </Dialog>
                                            </div>
                                            <button type="button" className='slash-btn p-0 pe-2'>/</button>
                                            <button type='button' className='delete-btn' data-bs-toggle="modal" data-bs-target="#exampleModal2" onClick={() => { handleBotSliderEdit(slider.id) }}>Edit</button>
                                        </div>
                                    </th>
                                    <td>
                                        {slider.image && (
                                            <img src={require(`../../Assets/upload/${slider.image}`)} alt="" width="100px" />
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

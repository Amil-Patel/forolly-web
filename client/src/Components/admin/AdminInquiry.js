import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function AdminInquiry() {
    const [addInquiry, setAddInquiry] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (inquiry) => {
        setOpen(true);
        setSelectedCategory(inquiry);
    };
    const handleClose = () => {
        setOpen(false);
    };

    useEffect(()=>{
        addInquiryData();
    },[])

    const addInquiryData = ()=>{
        axios.get('http://localhost:1005/inquiry')
        .then((response) => {
            setAddInquiry(response.data);
        })
        .catch((error) => {
            console.log('Error fetching Brand data in Brand.js:', error);
        });
    }

    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:1005/inquiry/${deleteId}`)
            .then(() => {
                addInquiryData();
                setOpen(false);
            })
            .catch((error) => {
                console.log(error + "in delete");
            });
    };
    return (
        <>
            <div className='cate-head-main'>
                <h1 className='text-white bg-black'>CONTACT DATA</h1>
            </div>
            <table className="table brand-table table-bordered">
                <thead>
                    <tr>
                        <th scope="col" width="10%"> Id</th>
                        <th width="10%">Name</th>
                        <th width="10%">Role</th>
                        <th width="10%">Compeny_name</th>
                        <th width="10%">Email</th>
                        <th width="10%">Mobile_no</th>
                        <th width="10%">Address</th>
                        <th width="10%">Country</th>
                        <th width="10%">State</th>
                        <th width="10%">City</th>
                        <th width="10%">Inquiry_type</th>
                        <th width="10%">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {addInquiry.map((inquiry) => (
                        <tr key={inquiry.id}>
                            <td>{inquiry.id}
                                <div>
                                    <Button className='delete-brand-btn' onClick={() => handleClickOpen(inquiry)}>Delete</Button>
                                    <Dialog open={open}
                                        onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                                        <DialogTitle id="alert-dialog-title">
                                            {"Do You Want To Delete this data?"}
                                        </DialogTitle>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={() => { handleDelete(selectedCategory.id) }} autoFocus>Delete</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            </td>
                            <td>{inquiry.name}</td>
                            <td>{inquiry.role}</td>
                            <td>{inquiry.compeny_name}</td>
                            <td>{inquiry.email}</td>
                            <td>{inquiry.mobile_no}</td>
                            <td>{inquiry.address}</td>
                            <td>{inquiry.country}</td>
                            <td>{inquiry.state}</td>
                            <td>{inquiry.city}</td>
                            <td>{inquiry.inquiry_type}</td>
                            <td>{inquiry.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

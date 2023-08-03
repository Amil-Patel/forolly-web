import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';


export default function AdminContact() {
    const [getContactData, setGetContactData] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = (contact) => {
        setOpen(true);
        setSelectedCategory(contact);
    };
    const handleClose = () => {
        setOpen(false);
    };
    useEffect(() => {
        getContData();
    }, [])
    const getContData = () => {
        axios.get('http://localhost:1005/contact')
            .then((response) => {
                setGetContactData(response.data);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    }


    //DELETE CONTACT DATA
    const handleDelete = (deleteId) => {
        axios.delete(`http://localhost:1005/contact/${deleteId}`)
            .then(() => {
                getContData();
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
                        <th width="15%">Name</th>
                        <th width="15%">Password</th>
                        <th width="20%">Email</th>
                        <th width="20%">Subject</th>
                        <th width="20%">Message</th>
                    </tr>
                </thead>
                <tbody>
                    {getContactData.map((contact) => (
                        <tr key={contact.id}>
                            <td>{contact.id}
                                <div>
                                    <Button className='delete-brand-btn' onClick={() => handleClickOpen(contact)}>Delete</Button>
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
                            <td>{contact.name}</td>
                            <td>{contact.password}</td>
                            <td>{contact.email}</td>
                            <td>{contact.subject}</td>
                            <td>{contact.message}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

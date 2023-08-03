import React, { useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../../CSS/admin/Dashboard.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function Dashboard() {

    const navigate = useNavigate();
    useEffect(() => {
        const getUname = localStorage.getItem("unameData");
        if (!getUname) {
            navigate('/admin');
        }
    }, [navigate])

    const handleLogout = () => {
        localStorage.removeItem("unameData");
        navigate('/admin');
    };

    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <div className="offcanvas offcanvas-start show bg-dark" data-bs-scroll="true" tabIndex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="offcanvasDarkLabel">DASHBOARD</h5>
                </div>
                <div className="offcanvas-body">
                    <NavLink to="/brand" className="nav-link dash-link mx-2 my-3">
                        <i className="fa-solid fa-layer-group"></i><span className='ms-3'>Brand</span>
                    </NavLink>
                    <NavLink to="/category" className="nav-link dash-link mx-2 my-3">
                        <i className="fa-solid fa-layer-group"></i><span className='ms-3'>Category</span>
                    </NavLink>
                    <NavLink to="/product" className="nav-link dash-link mx-2 my-3 prod-link">
                        <i className="fa-brands fa-product-hunt"></i><span className="ms-3">products</span>
                    </NavLink>
                    <NavLink to="/bottom-slider" className="nav-link dash-link mx-2 my-3">
                        <i className="fa-solid fa-sliders"></i><span className='ms-3'>Bot Slider</span>
                    </NavLink>
                    <NavLink to="/admin-contact" className="nav-link dash-link mx-2 my-3">
                        <i className="fa-solid fa-sliders"></i><span className='ms-3'>Contact</span>
                    </NavLink>
                    <NavLink to="/inquiry" className="nav-link dash-link mx-2 my-3">
                        <i className="fa-solid fa-sliders"></i><span className='ms-3'>Inquiry</span>
                    </NavLink>

                    <div className='log-btn'>
                        <Button variant="outlined" className='log-btn-main' onClick={handleClickOpen}>
                            <i className="fa-solid fa-right-from-bracket me-2"></i> Log Out
                        </Button>
                        <Dialog open={open}
                            onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description" >
                            <DialogTitle id="alert-dialog-title">
                                {"Do You Want To Log Out Admin?"}
                            </DialogTitle>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={handleLogout} autoFocus>Agree</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        </>
    )
}

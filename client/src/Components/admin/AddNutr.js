import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function AddNutr() {
    const navigate = useNavigate();
    const location = useLocation();
    const nutrId = location.state.id;

    const [nutrition, setNutrition] = useState({
        energy: "",
        total_fat: "",
        saturated_fat: "",
        trans_fat: "",
        cholesterol: "",
        sodium: "",
        total_carbohydrates: "",
        protien: ""
    })
    const handleNutrChange = (event) => {
        const { name, value } = event.target;
        setNutrition((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    }
    const saveNutrition = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:1005/nutrition/${nutrId}`, nutrition)
            .then(() => {
                navigate('/product', { replace: true })
            })
            .catch((error) => {
                console.log('adding error' + error);
            })
    }

    return (
        <>
            <div className="add-form-main">
                <form method='post' onSubmit={saveNutrition}>
                    <div className='addMain p-4'>
                        <h1 className="text-center">ADD NUTRITION</h1>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Energy:</label>
                            <input type="text" className="form-control" name="energy" placeholder='Enter Energy' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Total_fat:</label>
                            <input type="text" className="form-control" name="total_fat" placeholder='Enter Total_fat' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Saturated_fat:</label>
                            <input type="text" className="form-control" name="saturated_fat" placeholder='Enter Saturated_fat' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Trans_fat:</label>
                            <input type="text" className="form-control" name="trans_fat" placeholder='Enter Trans_fat' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Cholesterol:</label>
                            <input type="text" className="form-control" name="cholesterol" placeholder='Enter Cholesterol' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Sodium:</label>
                            <input type="text" className="form-control" name="sodium" placeholder='Enter Sodium' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Total_carbohydrates:</label>
                            <input type="text" className="form-control" name="total_carbohydrates" placeholder='Enter Total_carbohydrates' onChange={handleNutrChange} />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="userName" className="form-label">Protien:</label>
                            <input type="text" className="form-control" name="protien" placeholder='Enter Protien' onChange={handleNutrChange} />
                        </div>
                        <button type="submit" className="btn btn-success mt-3">SAVE</button>
                        <NavLink to="/product" className="btn btn-danger mt-3 ms-3">BACK</NavLink>
                    </div>
                </form>
            </div>
        </>
    )
}

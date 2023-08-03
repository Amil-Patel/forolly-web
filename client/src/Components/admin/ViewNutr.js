import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios';
import '../../CSS/admin/AddProd.css';

export default function ViewNutr() {
    const location = useLocation();
    const navigate = useNavigate();
    const getNutId = location.state.id;

    useEffect(() => {
        getNutritionData(getNutId);
    }, [getNutId])

    const [getNutrition, setGetNutrition] = useState([]);
    const getNutritionData = (id) => {
        axios.get(`http://localhost:1005/nutrition/${id}`)
            .then((response) => {
                setGetNutrition(response.data[0]);
            })
            .catch(() => {
                console.log("Error View Data in Nutrition page");
            })
    }

    //DELETE NUTRITION
    const handleNutrDelete = () => {
        let confirm = window.confirm("Do you want to delete this data?");
        if (confirm) {
            axios.delete(`http://localhost:1005/nutrition/${getNutId}`)
                .then(() => {
                    navigate('/product');
                })
                .catch((error) => {
                    console.log(error + "in delete");
                });
        }
    }

    //EDIT NUTRITION DATA
    const [editNutrition, setEditNutrition] = useState({
        energy: "",
        total_fat: "",
        saturated_fat: "",
        trans_fat: "",
        cholesterol: "",
        sodium: "",
        total_carbohydrates: "",
        protien: ""
    })
    const handleNutEdit = () => {
        axios.get(`http://localhost:1005/nutrition/${getNutId}`)
            .then((response) => {
                setEditNutrition(response.data[0]);
            })
            .catch((error) => {
                console.log('Error fetching Brand data in Brand.js:', error);
            });
    }
    const handleNutriChange = (event) => {
        const { name, value } = event.target;
        setEditNutrition((prevEdit) => ({
            ...prevEdit,
            [name]: value
        }));
    }
    const handleSaveNutrition = () => {
        axios.put(`http://localhost:1005/nutrition/${getNutId}`, editNutrition)
            .then((response) => {
                setEditNutrition(response.data);
                navigate("/product");
            })
            .catch((error) => {
                console.log("Errorn Updating nutrition data in nutrition.js " + error);
            })
    }

    return (
        <>

            {/* EDIT NUTRITION MODEL */}
            <div className="modal ade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form method="post">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-dark" id="exampleModalLabel">EDIT NUTRITION</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Energy:</label>
                                    <input type="text" className="form-control" name="energy" placeholder="Enter Energy..." value={editNutrition.energy} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Total_fat:</label>
                                    <input type="text" className="form-control" name="total_fat" placeholder="Enter Total_fat..." value={editNutrition.total_fat} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Saturated_fat:</label>
                                    <input type="text" className="form-control" name="saturated_fat" placeholder="Enter Saturated_fat..." value={editNutrition.saturated_fat} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Trans_fat:</label>
                                    <input type="text" className="form-control" name="trans_fat" placeholder="Enter Trans_fat..." value={editNutrition.trans_fat} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Cholesterol:</label>
                                    <input type="text" className="form-control" name="cholesterol" placeholder="Enter Cholesterol..." value={editNutrition.cholesterol} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Sodium:</label>
                                    <input type="text" className="form-control" name="sodium" placeholder="Enter Sodium..." value={editNutrition.sodium} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Total_carbohydrates:</label>
                                    <input type="text" className="form-control" name="total_carbohydrates" placeholder="Enter Total_carbohydrates..." value={editNutrition.total_carbohydrates} onChange={handleNutriChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlInput1" className="form-label">Protien:</label>
                                    <input type="text" className="form-control" name="protien" placeholder="Enter Protien..." value={editNutrition.protien} onChange={handleNutriChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleSaveNutrition}>Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <div className='cate-main'>
                <div className='cate-head-main'>
                    <h1 className='text-white'>NUTRITION</h1>
                </div>
                <div className='mt-2'>
                    <button className='btn btn-nutr' onClick={handleNutrDelete}>
                        <i className="fa-solid fa-trash"></i>
                    </button>
                    <button className='btn btn-nutr-edit ms-3' data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={handleNutEdit}>
                        <i className="fa-solid fa-pen"></i>
                    </button>
                </div>
            </div>

            <table align='center' className='table-bordered'>
                <tbody>
                    <tr>
                        <th className='view-prod-table'>Energy</th>
                        <td className='view-prod-td'>{getNutrition.energy}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Total_fat</th>
                        <td className='view-prod-td'>{getNutrition.total_fat}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Saturated_fat</th>
                        <td className='view-prod-td'>{getNutrition.saturated_fat}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Trans_fat</th>
                        <td className='view-prod-td'>{getNutrition.trans_fat}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Cholesterol</th>
                        <td className='view-prod-td'>{getNutrition.cholesterol}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Sodium</th>
                        <td className='view-prod-td'>{getNutrition.sodium}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Total_carbohydrates</th>
                        <td className='view-prod-td'>{getNutrition.total_carbohydrates}</td>
                    </tr>
                    <tr>
                        <th className='view-prod-table'>Protien</th>
                        <td className='view-prod-td'>{getNutrition.protien}</td>
                    </tr>
                </tbody>
            </table>
        </>
    )
}

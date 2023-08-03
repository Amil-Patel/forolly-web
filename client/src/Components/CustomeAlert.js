import React, { useState } from 'react';
import '../CSS/App.css';

export default function CustomeAlert(props) {
    const [isAlertVisible, setIsAlertVisible] = useState(false);

    const handleButtonClick = () => {
        setIsAlertVisible(true);
    };
    const handleDisAgree = () => {
        setIsAlertVisible(false);
    }
    const handleAgree = () => {
        setIsAlertVisible(true);
    }

    return (
        <>
            {/* <CustomeAlert /> */}
            <div className="alert-main" style={{ display: isAlertVisible ? 'block' : 'none' }}>
                <div>{props.title}</div>
                <div className='mt-3'>
                    <button className='me-3 btn btn-secondary' onClick={props.onClick}>Disagree</button>
                    <button className='btn btn-secondary' onClick={() => { handleAgree() }}>Agree</button>
                </div>
            </div>
            <button className="btn btn-alert" type="button" onClick={handleButtonClick}>
                {props.name}
            </button>
        </>
    )
}

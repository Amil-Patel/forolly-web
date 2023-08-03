import React from 'react';
import '../CSS/ShimarUi.css';


export default function ShimarUi(props) {
    return (
        <>
            <div className='main-himarui' style={{
                width: props.width,
                height: props.height,
                transformOrigin: '0px 55%',
                transform: 'scale(1, 0.6)',
                backgroundColor: 'rgba(0, 0, 0, 0.11)',
                animation: 'animation-c7515d 1.5s ease-in-out 0.5s infinite',
                borderRadius: '5%',
            }}>
            </div>
        </>
    )
}


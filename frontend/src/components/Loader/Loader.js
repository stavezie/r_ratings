import React from 'react';
import './Loader.css'

const Loader = () => {
    return (
        <div className="container align-items-center h-100">
            <div className="lds-spinner">
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    );
};

export default Loader;
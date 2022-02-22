import React from "react";
import cl from './Alerts.module.css'

export const DangerAlert = ({text}) => {
    return (
        <div className="alert alert-danger" role="alert">
            <p style={{margin: 0}}>{text}</p>
            <a href='#' className={cl.linkText} onClick={() => window.location.reload()}>Попробовать снова</a>
        </div>
    );
};
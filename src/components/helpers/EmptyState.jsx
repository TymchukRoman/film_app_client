import React from "react";
import { Link } from "react-router-dom";

const EmptyState = ({ message, link }) => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
        <p style={{ color: "#828282", fontSize: "30px" }}>
            {message} {link && <Link to={link.href}> {link.text} </Link>}
        </p>
    </div >
}

export default EmptyState;
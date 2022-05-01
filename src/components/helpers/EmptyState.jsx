import React from "react";

const EmptyState = ({ message }) => {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }} >
        <p style={{ color: "#828282", fontSize: "30px" }}>
            {message}
        </p>
    </div >
}

export default EmptyState;
import "./App.css";
import React from 'react';


function Button(id) {

    // deleter function for onClick Delete button
    const deleter = async () => {
        fetch('http://localhost:4000/delete/' + id.id);
        window.location.reload();
    }

    return (
            <button onClick={deleter}> Delete </button>
    )
}

export default Button;
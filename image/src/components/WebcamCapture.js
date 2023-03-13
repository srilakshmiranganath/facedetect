import React, { useState, useRef } from 'react';
import axios from 'axios';

function WebcamCapture (){
    const [imageSrc, setImageSrc] = useState('');

    const captureImage = () => {
        axios.get('http://localhost:3000/image', {responseType: 'blob'})
            .then(response => {
                const reader = new FileReader();
                reader.readAsDataURL(response.data);
                reader.onload = () => setImageSrc(reader.result);
            })
            .catch(error => console.error(error));
        };

        return(
            <div>
                <button onClick={captureImage}>Get Image</button>
                {imageSrc && <img src={imageSrc} alt="example" />}
            </div>
        );
}

export default WebcamCapture;
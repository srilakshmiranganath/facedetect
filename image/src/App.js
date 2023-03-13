import React, { useState, useRef } from 'react';
import Webcam from 'react-webcam';
import axios from 'axios';

function App() {
    const webcamRef = useRef(null);
    const [imageSrc, setImageSrc] = useState('');

    const capture = () => {
        const imageSrc = webcamRef.current.getScreenshot();
        const base64Img = imageSrc.split(',')[1];
        const data = {
            image: base64Img
        };
        console.log(imageSrc);
        axios.post('http://localhost:3000/facedetect', data)
            .then(response => {
                setImageSrc(response.data);
                console.log(imageSrc);
             })
            .catch(error => {
                console.error(error);
            });
    };

    return(
        <div>
            <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" />
            <button onClick={capture}>CAPTURE</button>
            {imageSrc && <img src={imageSrc} alt="Captured Image" />}
        </div>
    );
}

export default App;

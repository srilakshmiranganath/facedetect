import React, { useState } from 'react';

function WebcamComponent() {
  const [imageUrl, setImageUrl] = useState('');

  const handleCapture = () => {
    fetch('/image')
      .then(response => response.blob())
      .then(blob => URL.createObjectURL(blob))
      .then(url => setImageUrl(url))
      .catch(error => console.error(error));
  };

  return (
    <div>
      <button onClick={handleCapture}>Capture Image</button>
      {imageUrl && <img src={imageUrl} alt="Captured Image"/>}
    </div>
  );
}

export default WebcamComponent;

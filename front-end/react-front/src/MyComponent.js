import React from 'react';

function MyComponent() {
  const handleClick = () => {
    fetch('http://172.29.0.2:8000')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
  };

  return (
    <div>
      <button onClick={handleClick}>Send Request</button>
    </div>
  );
}

export default MyComponent;
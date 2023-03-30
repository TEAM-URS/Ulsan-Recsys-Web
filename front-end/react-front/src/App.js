import React, { useEffect, useState } from 'react';

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('http://localhost/api', {
  method: 'GET',
  mode: 'cors',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json'
  }
})
.then((response) => response.json())
.then((data) => setMessage(data.message))
.catch((error) => console.log(error));
 // 백엔드 API URL을 입력하세요.
  }, []);

  return (
    <div>
      <h1>{message}</h1>
    </div>
  );
}

export default App;
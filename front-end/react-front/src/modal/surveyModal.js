import React from 'react';
import CheckboxGroup from '../check_box/checkBoxGroup';

const Modal = (props) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#fff',
        zIndex: 101,
        padding: '20px',
      }}
    >
      <CheckboxGroup />
      <button onClick={props.onClose}>Close</button>
    </div>
  );
};

export default Modal;
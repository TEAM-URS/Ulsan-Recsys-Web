import React from 'react';
import './LoadingDialog.css';

export default function LoadingDialog({ open }) {
    return (
        <div>
            <div style={{ display: open ? 'flex' : 'none' }} className='modal'>
                <div className='modal-content'>
                    <div className='loader'></div>
                    <div className='modal-text'>Loading...</div>
                </div>
            </div>
        </div>
    );
}
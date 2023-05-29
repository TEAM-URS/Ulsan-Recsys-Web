import React, {useState} from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
} from '@mui/material';
import axios from 'axios';
import { initMarker, saveCoordinatesToAddress } from '../kakao_api/KakaoMap';
import LoadingDialog from '../loading_dialog/LoadingDialog';

let addresses = [];

export default function RecStartDailog({ open, onClose, type }) {
    const [isLoading, setIsLoading] = useState(false);

    const onConfirm = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const username = urlParams.get('username');
        setIsLoading(true);

        axios.get('http://127.0.0.1:8000/recsys' + `?username=${username}` + `&kind=${type}`)
            .then(response => {
                const promises = response.data.map((item) => {
                    return new Promise((resolve) => {
                        addresses.push(item.address);
                        resolve();
                    });
                  });
        
                  Promise.all(promises).then(() => {
                    // 카카오맵 마커 생성 메서드 호출
                    saveCoordinatesToAddress(addresses).then(() => {
                        setTimeout(() => {
                          initMarker(response.data);
                          setIsLoading(false);
                        }, 200);
                    });
    
                    onClose();
                  });
            });

        onClose();
    };

    return (
        <div>
            <LoadingDialog open={isLoading} />
            <Dialog 
                open={open} 
                disableEscapeKeyDown
            >
            <DialogContent>
                <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    onClick={onConfirm}
                    style={{ minWidth: '200px', marginTop: '10px' }}
                    >
                    추천 시작
                </Button>
            </DialogContent>
            <DialogActions>
            </DialogActions>
            </Dialog>
        </div>
    );
}
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import './ChoiceDialog.css'
import axios from 'axios';
import PreSurveyDialog from '../presurvey_dialog/PresurveyDialog';
import RecStartDailog from '../rec_start_dialog/RecStartDailog';

let presurveyObjects = [];

export default function ChoiceDialog({ choiceOpen, onClose }) {
  const [isRecStart, setIsRecStart] = useState(false);
  const [isPreSurveyStart, setIsPreSurveyStart] = useState(false);
  const [type, setType] = useState('');

  const handleClose = (url) => {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');

    axios.get(url + `?username=${username}`)
      .then(response => {
        // 기존 유저는 추천 시작 다이얼로그 생성
        if (response.status === 200) {
          setIsRecStart(true);
          // 신규 유저는 사전 설문 다이얼로그 생성
        } else if (response.status === 201) {
          // Array에 json 오브젝트 데이터를 모두 저장 후 콘솔로 출력하는 동기화 작업 코드
          const promises = response.data.map((item) => {
            return new Promise((resolve) => {
              presurveyObjects.push(item);
              resolve();
            });
          });

          Promise.all(promises).then(() => {
            setIsPreSurveyStart(true);
          });
        }
      })
      .catch(error => {
        console.error('에러:', error);
      });

    onClose();
  };
  
  const temp = () => { 
    setIsRecStart(false);
    setIsPreSurveyStart(false);
  }

  const restClickHandler = () => {
    const url = `http://127.0.0.1:8000/recsys_r2`;
    setType('rest');
    handleClose(url);
  };

  const attrClickHandler = () => {
    const url = `http://127.0.0.1:8000/recsys_a2`;
    setType('attr');
    handleClose(url);
  };

  return (
    <div>
      <Dialog 
          open={choiceOpen} 
          disableEscapeKeyDown
      >
        <DialogTitle>카테고리 선택</DialogTitle>
        <DialogContent>
          <div style={{ display: 'flex'}}>
              <a href="#" className="button" onClick={restClickHandler}>
                  <img src="img/restaurant.png"/>
              </a>

              <a href="#" className="button" onClick={attrClickHandler}>
                  <img src="img/attraction.png"/>            
              </a>
          </div>
        </DialogContent>
      </Dialog>
      <RecStartDailog
        open={isRecStart}
        onClose={temp}
        type={type}
      />
      <PreSurveyDialog
        open={isPreSurveyStart}
        onClose={temp}
        objects={presurveyObjects}
        type={type}
      />
    </div>
  );
}
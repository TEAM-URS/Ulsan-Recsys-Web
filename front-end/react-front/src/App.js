import React, { useRef, useState } from 'react';
import ShowMap, { initMarker, saveCoordinatesToAddress } from './kakao_api/KakaoMap';
import Modal from './modal/surveyModal';
import Backdrop from './background/backDrop';
import Sidebar from './sidebar/Sidebar';
import DropdownLogin from './login_button/Loginbutton';
import ExitButton from './exit_button/ExitButton';
import RatingDialog from './rating_dialog/RatingDialog';

let addresses = ['울산 중구 태화동 107', '울산 동구 일산동 905', '울산 울주군 서생면 진하리 307-2', '울산 동구 일산동 905-7',
                 '울산 울주군 상북면 이천리 829', '울산 울주군 삼남읍 방기리 산 52', '울산 울주군 언양읍 동부리 291', '울산 남구 대학로 164 웰츠타워 상가2층 214호',                  '울산 울주군 청량읍 율리 산 339', '울산 북구 산하동 952-1 일원', '울산 중구 태화동 667 2층', '울산 남구 삼산동 1527-1', '울산 울주군 서생면 서생리 711',
                 '울산 동구 쇠평길 33-1', '울산 북구 박상진5로 10', '울산 중구 명륜로 117', '울산 울주군 범서읍 두동로 704',
                 '울산 동구 등대로 100', '울산 울주군 상북면 알프스온천3길 16', '울산 남구 장생포고래로 246', '울산 울주군 범서읍 점촌6길 21'];

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);
  const [showRatingModal, setShowRatingModal] = useState(false);

  const parentRef = useRef(null);

  const closeModalHandler = () => {
    saveCoordinatesToAddress(addresses).then(() => {
      setTimeout(() => {
        initMarker(parentRef);
      }, 200);
    });

    setShowBackdrop(false);
    setShowModal(false);
  };

  const openRatingModalHandler = () => {
    setShowRatingModal(true);
  };

  return (
    <div>
      <div>
        {showBackdrop && <Backdrop />}
        {showModal && <Modal onClose={closeModalHandler}/>}
        <RatingDialog open={showRatingModal} onClose={() => setShowRatingModal(false)}/>
        <Sidebar ref={parentRef} />
        <ShowMap />
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
          <DropdownLogin/>
        </div>
        <div style={{ position: 'absolute', bottom: 10, right: 10, zIndex: 1 }}>
          <ExitButton variant='contained' color='error' onClick={openRatingModalHandler}>종료</ExitButton>
        </div>
      </div>
    </div>
  );
};

export default App;
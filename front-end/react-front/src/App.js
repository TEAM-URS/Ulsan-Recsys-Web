import React, { useState } from 'react';
import ShowMap, { cordinatesToMarker, saveCoordinatesToAddress } from './kakao_api/KakaoMap';
import Modal from './modal/surveyModal';
import Backdrop from './background/backDrop';

let addresses = ['울산 중구 태화동 107', '울산 동구 일산동 905', '울산 울주군 서생면 진하리 307-2', '울산 동구 일산동 905-7']

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);

  const closeModalHandler = () => {

    saveCoordinatesToAddress(addresses).then(() => {
      cordinatesToMarker();
    });

    setShowBackdrop(false);
    setShowModal(false);
  };

  return (
    <div>
        {showBackdrop && <Backdrop />}
        <ShowMap></ShowMap>
        {showModal && <Modal onClose={closeModalHandler} />}
    </div>
  );
};

export default App;
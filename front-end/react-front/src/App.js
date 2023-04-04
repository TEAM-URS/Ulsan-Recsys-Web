import React, { useState } from 'react';
import ShowMap from './kakao_api/ShowKakaoMap';
import Modal from './modal/surveyModal';
import Backdrop from './background/backDrop';

const App = () => {
  const [showModal, setShowModal] = useState(true);
  const [showBackdrop, setShowBackdrop] = useState(true);

  const closeModalHandler = () => {
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
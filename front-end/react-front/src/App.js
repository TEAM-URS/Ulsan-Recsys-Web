import React, { useState } from 'react';
import ShowMap from './kakao_api/KakaoMap';
import DropdownLogin from './login_button/Loginbutton';
import ChoiceDialog from './choice_dialog/ChoiceDialog';

const App = () => {
  const [showChoiceDialog, setShowChoiceDialog] = useState(true);

  const dialogCloseHandler = () => {
    setShowChoiceDialog(false);
  };

  return (
    <div>
      <div>
        <ChoiceDialog 
          choiceOpen={showChoiceDialog} 
          onClose={dialogCloseHandler} 
        />
        <ShowMap />
        <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 1 }}>
          <DropdownLogin />
        </div>
      </div>
    </div>
  );
};

export default App;
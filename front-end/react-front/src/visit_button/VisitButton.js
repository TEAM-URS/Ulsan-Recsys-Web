import React, { useState, forwardRef, useImperativeHandle } from 'react';
import styled from '@emotion/styled';
import Button from '@mui/material/Button';
import RatingDialog from '../rating_dialog/RatingDialog';

const StyledButton = styled(Button)``;

const VisitButton = forwardRef((props, ref) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isRatingDialogOpen, setIsRatingDialogOpen] = useState(false);

  const handleClick = () => {
    setIsRatingDialogOpen(true); // RatingDialog를 open 상태로 변경
  };

  const setButtonPressedState = (prop) => {
    setIsButtonPressed(prop);
    setIsButtonDisabled(prop);
  };

  useImperativeHandle(ref, () => ({
    setButtonPressedState: setButtonPressedState,
  }));

  const handleRatingDialogClose = () => {
    setIsRatingDialogOpen(false);
  };

  const handleConfirmRating = () => {
    setButtonPressedState(true);
  };

  return (
    <div>
      <StyledButton
        variant="contained"
        isButtonPressed={isButtonPressed}
        onClick={handleClick}
        color={isButtonPressed ? 'success' : 'primary'}
        disabled={isButtonDisabled}
      >
        {isButtonPressed ? '방문완료' : '방문했나요?'}
      </StyledButton>
      <RatingDialog
        open={isRatingDialogOpen}
        onClose={handleRatingDialogClose}
        onConfirm={handleConfirmRating} // Pass the callback function
      />
    </div>
  );
});

export default VisitButton;

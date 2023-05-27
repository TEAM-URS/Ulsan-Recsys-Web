import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import Rating from '@mui/material/Rating';

export default function RatingDialog({ open, onClose, onConfirm }) {
  const [value, setValue] = React.useState(0);
  const [reviewContent, setReviewContent] = React.useState('');

  const handleClose = (_, reason) => {
    setValue(0);
    setReviewContent('');
    onClose();
  };

  const handleConfirm = () => {
    setValue(0);
    setReviewContent('');
    if (value === 0) {
      alert('Please select a rating!');
      return;
    }
    alert('Confirmed!');
    onConfirm(value, reviewContent); // Pass the value and reviewContent to the callback function
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} disableEscapeKeyDown>
      <DialogTitle>만족도 조사</DialogTitle>
      <DialogContent>
        <Rating
          name="half-rating"
          defaultValue={0}
          precision={0.5}
          size="large"
          value={value}
          onChange={(_, newValue) => {
            setValue(newValue);
          }}
        />
        <TextField
          label="리뷰 내용"
          multiline
          rows={4}
          value={reviewContent}
          onChange={(event) => setReviewContent(event.target.value)}
          fullWidth
          margin="normal"
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleConfirm}>Confirm</Button>
      </DialogActions>
    </Dialog>
  );
}

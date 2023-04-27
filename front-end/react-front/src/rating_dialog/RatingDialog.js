import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Rating from '@mui/material/Rating';

let rating = 0;

export default function RatingDialog({ open, onClose }) {
    const [value, setValue] = React.useState(0);

    const handleClose = (_, reason) => {
        if (reason && reason === 'backdropClick') {
          return;
        }
        onClose();
      };

    const handleConfirm = () => {
        alert("Confirmed!");
        console.log(rating);
        window.location.reload();
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
            onChange={(event, newValue) => {
                setValue(newValue);
                rating = newValue;
            }}
            />
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
        </Dialog>
    );
}

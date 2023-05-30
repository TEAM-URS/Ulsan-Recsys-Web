import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import axios from "axios";

export default function RatingDialog({ open, onClose, onConfirm, title }) {
  const [value, setValue] = React.useState(0);
  const [reviewContent, setReviewContent] = React.useState("");

  const handleClose = (_, reason) => {
    setValue(0);
    setReviewContent("");
    onClose();
  };

  const handleConfirm = () => {
    setValue(0);
    setReviewContent("");
    if (value === 0) {
      alert("Please select a rating!");
      return;
    }
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get("username");
    axios
      .post("http://localhost:8000/review/", {
        username: username,
        title: title, // Pass the title value
        rating: value,
        review: reviewContent,
      })
      .then((response) => {
        alert("리뷰 등록 성공!");
        onConfirm(value, reviewContent); // Pass the value and reviewContent to the callback function
        onClose();
      })
      .catch((error) => {
        console.error("Error submitting review:", error);
      });
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

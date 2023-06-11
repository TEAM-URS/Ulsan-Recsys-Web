import React from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, DialogContentText } from "@mui/material";
import axios from "axios";
import { initMarker, saveCoordinatesToAddress } from "../kakao_api/KakaoMap";
import LoadingDialog from "../loading_dialog/LoadingDialog";
import "./PresurveyDialog.css";

let addresses = [];

export default function PreSurveyDialog({ open, onClose, objects, type }) {
  const [isLoading, setIsLoading] = React.useState(false);

  let testArray = [];

  const handleConfirm = () => {
    setIsLoading(true);
    const testArrayJSON = JSON.stringify({ type, data: testArray });
    axios
      .post("http://localhost:8000/cbf2/", testArrayJSON, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
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
      })
      .catch((error) => {
        console.error("에러:", error);
      });
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      testArray.push(value);
    } else {
      testArray.pop(value);
    }

    console.log(testArray);
  };

  return (
    <div>
      <LoadingDialog open={isLoading} />
      <Dialog open={open} scroll="paper" disableEscapeKeyDown aria-labelledby="scroll-dialog-title" aria-describedby="scroll-dialog-description">
        <DialogTitle id="scroll-dialog-title">사전 설문조사</DialogTitle>
        <DialogContent>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
            {objects.map((item) => (
              <div key={item.p_id} className="box">
                <h4>
                  <label>
                    <input type="checkbox" name="item" value={item.p_name} className="item-checkbox" onChange={handleCheckboxChange} />
                    <span style={{ marginRight: "1rem", marginLeft: "1rem" }}>{item.p_name}</span>
                    <span style={{ marginRight: "1rem" }}>| 태그: {item.tags}</span>
                    <span style={{ marginRight: "1rem" }}>
                      |{" "}
                      <a href={item.url} target="_blank" rel="noopener noreferrer">
                        상세정보
                      </a>
                    </span>
                    <input type="text" value="attr" name="type" style={{ display: "none" }} />
                  </label>
                </h4>
              </div>
            ))}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

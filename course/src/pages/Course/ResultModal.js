import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import moment from "moment";
const ResultModal = ({ registerResult, onClose, courseDetail }) => {
  let history = useHistory();

  const [show, setShow] = useState(false);
  const handleClose = () => {
    setShow(false);

    history.push(`/course`);
  };

  useEffect(() => {
    if (registerResult?._id) {
      setShow(true);
    }
    return () => {
      setShow(false);
      onClose();
    };
  }, [registerResult, onClose]);

  if (!registerResult?.checkId) {
    return <div>Oh hi there</div>;
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>感謝您的預約!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          預約代號 {registerResult.checkId}
          <span>(請務必記得喔!)</span>
          <br />
          預約成功信件已經同時寄送至您所填寫的MAIL({registerResult.email})信箱。
          <hr />
          <p>
            您預約的課程明細如下
            <br />
            {moment(registerResult.registerDate)
              .format("YYYY年MM月DD日")
              .toString()}{" "}
            {registerResult.timeSlot} <br />
            課程{registerResult.courseId}-{courseDetail}
            <br />
            費用合計$500元
          </p>
          <hr />
          <p className="amount">
            已為您保留預約資格，請於3天內匯款費用至
            <br />
            戶名：高誌陽
            <br />
            銀行：中國信託銀行 0288 中港分行
            <br />
            帳號：(822)288-54038397-3
          </p>
          <div style={{ lineHeight: "20px" }}>
            <span style={{ color: "red", fontWeight: "700" }}>
              提醒：匯款成功後，請務必回到本頁面，點選【匯款成功回報】，核對匯款。若無在3天內匯款，預約資格將取消，還請見諒。
            </span>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            回首頁
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ResultModal;

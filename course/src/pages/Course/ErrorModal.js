import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
const ErrorModal = ({ error }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  useEffect(() => {
    if (error?.msg) {
      setShow(true);
    }
    return () => {
      setShow(false);
    };
  }, [error]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>預約未成功</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error.msg}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            關閉
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default ErrorModal;

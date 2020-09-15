import React, { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

export const StyledOverlay = styled.div`
  position: fixed;
  top: 0px;
  left: 0px;
  height: 100vh;
  width: 100%;
  background: -webkit-linear-gradient(
    top,
    rgba(200, 200, 200, 0.7),
    rgba(0, 0, 0, 0.9)
  );
  transition: opacity 0.5s;
  z-index: 999999;
`;

const StyledModal = styled.div`
  color: #222;
  border-radius: 10px;
  min-width: 100px;
  width: 100%;
  max-width: 90%;
  background: #fff;
  position: ${(props) => (props.inViewMode ? " " : " fixed")};
  top: ${(props) => (props.adjustHeight ? "2%" : "20%")};
  z-index: 9999999;
  overflow: hidden;
  transition: 0.4s;
  animation: appear 0.3s ease-out;
  @keyframes appear {
    from {
      opacity: 0;
      top: 30%;
    }
    to {
      opacity: 1;
      top: ${(props) => (!props.adjustHeight ? "20%" : "")};
    }
  }
  & > * {
    padding: ${(props) => (props.minimize ? "8px 20px" : "20px")};
    font-size: ${(props) => (props.minimize ? "14px" : "")};
  }
  & .modal-head {
    border-bottom: 1px solid #eee;
    display: flex;
    justify-content: center;
    padding: 0px;
  }
  & .modal-foot {
    border-top: 1px solid #eee;
    padding-top: 10px;
    text-align: center;
    cursor: pointer;
  }
  & .modal-foot:hover {
    background: #f2f2f2;
  }
  & .modal-foot:hover span {
    color: #000;
  }

  @media screen and (min-width: 768px) {
    max-width: 50%;
  }
`;

const FullScreenModal = styled.div`
  position: fixed;
  top: 0%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999999;
  height: 100vh;
  width: 100%;
  animation: show 0.3s ease-out;
  & > *:not(span) {
    overflow-y: auto;
    width: 95%;
    height: 100%;
  }
  & .close {
    position: fixed;
    top: -5px;
    right: 0px;
    font-size: 40px;
    color: #000;
    cursor: pointer;
    height: 40px;
    width: 40px;
    background: white;
    text-align: center;
    z-index: 99;
  }

  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @media (max-width: 768px) {
    & > *:not(span) {
      overflow-y: auto;
      width: 100%;
      height: 100%;
    }
    & > span {
      border-left: 1px solid #000;
      border-bottom: 1px solid #000;
    }
  }
`;

const modalRoot = document.getElementById("modals");

const Modal = (props) => {
  const {
    isOpen,
    fullScreen,
    children,
    title,
    resetModalState,
    inViewMode
  } = props;

  // Close modal with overlay and button
  const [regularModal, setRegularModal] = useState(false);

  // Open modal by props
  useEffect(() => {
    setRegularModal(true);
  }, [isOpen]);

  // Update modal position in view mode because of unexpected displacement
  // Todo
  const modalRef = useRef(null);
  useEffect(() => {
    if (modalRef.current && inViewMode) {
      modalRef.current.style.position = "fixed";
    }
  }, [regularModal, inViewMode]);

  const handleModalEvent = () => {
    setRegularModal(false);
    // Reset the caller component's state for toggling modal (if any)
    resetModalState && resetModalState();
  };

  return createPortal(
    <>
      {regularModal && !fullScreen ? (
        <>
          <StyledOverlay data-modal="close" onClick={handleModalEvent} />
          <StyledModal ref={modalRef} {...props}>
            <div className="relative grid apart modal-head">
              <h3>{title}</h3>
            </div>
            <div className="modal-body">{children}</div>
            <div
              data-modal="close"
              onClick={handleModalEvent}
              className="modal-foot"
            >
              <span className="link close">Close</span>
            </div>
          </StyledModal>
        </>
      ) : null}

      {/* Plain modal component */}
      {regularModal && fullScreen && (
        <>
          <StyledOverlay data-modal="close" onClick={handleModalEvent} />
          <FullScreenModal>
            <span
              title="close"
              data-modal="close"
              onClick={handleModalEvent}
              className="close"
            >
              &times;
            </span>
            {children}
          </FullScreenModal>
        </>
      )}
    </>,
    modalRoot
  );
};

export default Modal;

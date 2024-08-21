
import './modalStyle.css';
import React from 'react';
import { useEffect, useRef} from 'react';
import {createPortal} from 'react-dom';

function PortalImpl({
  onClose,
  children,
  title,
  closeOnClickOutside,
}) {
  const modalRef = useRef(null);

  useEffect(() => {
    if (modalRef.current !== null) {
      modalRef.current.focus();
    }
  }, []);

  useEffect(() => {
    let modalOverlayElement = null;
    const handler = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    const clickOutsideHandler = (event) => {
      const target = event.target;
      if (
        modalRef.current !== null &&
        !modalRef.current.contains(target) &&
        closeOnClickOutside
      ) {
        onClose();
      }
    };
    const modelElement = modalRef.current;
    if (modelElement !== null) {
      modalOverlayElement = modelElement.parentElement;
      if (modalOverlayElement !== null) {
        modalOverlayElement.addEventListener('click', clickOutsideHandler);
      }
    }

    window.addEventListener('keydown', handler);

    return () => {
      window.removeEventListener('keydown', handler);
      if (modalOverlayElement !== null) {
        modalOverlayElement?.removeEventListener('click', clickOutsideHandler);
      }
    };
  }, [closeOnClickOutside, onClose]);
  
  return (
    <div className="LexicalModal__overlay" role="dialog">
      <div className="LexicalModal__modal" tabIndex={-1} ref={modalRef}>
        <h2 className="LexicalModal__title">{title}</h2>
        <button
          className="LexicalModal__closeButton"
          aria-label="Close modal"
          type="button"
          onClick={(event) => {
            event.stopPropagation();  
            onClose()
          }}>
          X
        </button>
        <div className="LexicalModal__content">{children}</div>
      </div>
    </div>
  );
}

export default function Modal({
  onClose,
  children,
  title,
  closeOnClickOutside = false,
}) {
  return createPortal(
    <PortalImpl
      onClose={onClose}
      title={title}
      closeOnClickOutside={closeOnClickOutside}>
      {children}
    </PortalImpl>,
    document.body,
  );
}

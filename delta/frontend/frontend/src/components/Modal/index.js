import React, { useState } from "react";
import {
  Notify,
  StyledButton,
  StyledInput,
  StyledInputGroup,
  StyledLabel,
} from "../StyledInput";
import { StyledModal } from "./styled";

const Modal = (props) => {
  if (!props.open) {
    return <></>;
  }
  return (
    <StyledModal>
      <div className="Model">
        <div className="header">{props.header}</div>
        <div className="body">{props.children}</div>
      </div>
    </StyledModal>
  );
};

export default Modal;

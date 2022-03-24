import styled from "styled-components";
export const StyledInput = styled.input`
  border: 2px solid #cecece;
  /* background: #fafafa; */
  font-size: 16px;
  border-radius: 6px;
  font-weight: 400;
  padding: 10px;
  margin-top: 5px;
  &:focus {
    outline: none;
    border-color: black;
    /* border: 0px; */
  }
`;

export const StyledLabel = styled.label`
  font-size: 16px;
  color: #958e8e;
`;

export const StyledButton = styled.button`
  ${(props) =>
    props.primary && "background:#42C2FF;color:white;border-radius:50px;"}
  padding: 12px 10px;
  width: 100%;
  border: 0px;
  border-radius: 5px;
  font-size: 16;
  letter-spacing: 1;
`;

export const StyledInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 20;
`;

export const Notify = styled.div`
  line-height: 10px;
  padding: 10px;
  color: white;
  font-weight: 400;
  margin-top: 5px;
  ${(props) => props.error && " background:red"};
  border-radius: 5px;
`;

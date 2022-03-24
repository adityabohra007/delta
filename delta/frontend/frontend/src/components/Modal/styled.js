import styled from "styled-components";

export const StyledModal = styled.div`
  position: absolute;
  /*background-color: white;
  border-radius: 10px;
  width: 70%;
  min-height: 120px;
  width: 70%;
  min-height: 400;
  z-index: 100;
  box-shadow: 1px 1px 1px 1px gray; */
  overflow: hidden;

  width: 100%;
  background-color: #060000d4;
  z-index: 100;
  height: 100%;
  /* width: 100em;
  z-index: 100;

  height: 80vh;
  position: absolute;
  background-color: aliceblue; */
  display: flex;

  justify-content: center;
  justify-content: center;
  align-items: center;
  .Model {
    width: 70%;
    height: auto;
    background-color: white;
    border-radius: 10px;
    .header {
      padding: 20px;
      font-size: 22px;
      font-weight: 400;
      border-bottom: 1px solid #e1dbdb;
    }
    .body {
      padding-left: 30px;
      padding-right: 30px;
    }
  }
`;

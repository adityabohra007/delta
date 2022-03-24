import styled from "styled-components";

export const StyledLoginWrapper = styled.div`
  display: flex;
  min-height: 700;
  width: 1200;
  margin: auto;
  background: white;
  margin-top: 50;
  .LeftSectionWrapper {
    padding: 20;
    flex-basis: 50%;
    background: #42c2ff;
    .heading {
      margin-top: 40px;
      font-size: 26px;
      color: white;
      font-weight: 600;
    }
  }
  .RightSectionWrapper {
    flex-basis: 50%;
    flex-grow: 0;
    flex-shrink: 0;
    .heading {
      font-size: 28px;
      font-weight: 600;
    }
  }
`;

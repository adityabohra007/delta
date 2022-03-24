import styled from "styled-components";

export const HomePage = styled.div`
  padding-top: 30px;

  height: 100%;
  .HomePageContainer {
    background-color: white;
    position: relative;
    width: 80%;
    margin: auto;
    table {
      width: 100%;
      th {
        font-weight: 400;
        text-align: left;
      }
      td {
        text-align: left;
        padding: 5px;
      }
      tbody tr {
        &:nth-child(even) {
          background-color: #f2f2f2;
        }
        &:hover {
          background-color: #dcf1f9;
        }
      }
    }
  }
`;

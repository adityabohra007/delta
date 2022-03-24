import React, { useState } from "react";
import styled from "styled-components";
import { StyledLabel } from "./StyledInput";
export const StyledMultipleSelection = styled.div`
  width: 300px;
  background-color: white;

  .selectBox {
    position: relative;
  }

  .selectBox select {
    width: 100%;
    font-weight: bold;
    background-color: white;
    border: 1px solid #8c8989;
    padding: 7px;
  }

  .overSelect {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }

  #checkBoxes {
    display: none;
    border: 1px silver solid;
    width: 300px;
    background: white;
    z-index: 2;
    position: absolute;
  }

  #checkBoxes label {
    display: block;
  }

  #checkBoxes label:hover {
    background-color: white;
  }
`;

export const MultipleSelection = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <StyledMultipleSelection>
      <div className="selectBox" onClick={() => setIsOpen(!isOpen)}>
        <select>
          {props.selected.length > 0 ? (
            <option>Company ({props.selected.length})</option>
          ) : (
            <option>Select Option</option>
          )}
        </select>
        <div className="overSelect"></div>
      </div>

      <div id="checkBoxes" style={isOpen ? { display: "block" } : {}}>
        <div>
          <StyledLabel
            key={"select_all"}
            style={{
              padding: "5px 10px",
              borderBottom: "1px solid gray",
              color: "black",
            }}
          >
            {props.options.length == props.selected.length ? (
              <input
                type={"checkbox"}
                checked
                onChange={props.handleSelectAll}
              ></input>
            ) : (
              <input type={"checkbox"} onChange={props.handleSelectAll}></input>
            )}
            Select All
          </StyledLabel>

          {/* Company */}
          {props.options.length ? (
            props.options.map((item) => (
              <StyledLabel
                key={item.id}
                style={{
                  padding: "5px 10px",
                  borderBottom: "1px solid gray",
                  color: "black",
                }}
              >
                {props.selected.find(
                  (element) => element.value == item.value
                ) ? (
                  <input
                    type={"checkbox"}
                    checked
                    onChange={() => props.handleClick(item)}
                  ></input>
                ) : (
                  <input
                    type={"checkbox"}
                    onChange={() => props.handleClick(item)}
                  ></input>
                )}
                {item.name}
              </StyledLabel>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </StyledMultipleSelection>
  );
};

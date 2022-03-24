import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Notify,
  StyledButton,
  StyledInput,
  StyledInputGroup,
  StyledLabel,
} from "../../components/StyledInput";
import { addMemberAsync, reset } from "./teamSlice";
import { useNavigate } from "react-router-dom";

const CreateTeam = (props) => {
  const {
    member_add_submitted,
    member_add_loading,
    member_add_failure,
    member_add_success,
    member_add_error,
  } = useSelector((state) => state.team);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [member, setMember] = useState({
    name: "",
    company: "",
    status: "",
    notes: "",
    submitted: false,
  });
  if (member_add_success) {
    props.closeModal();
  }
  const handleChange = (event) => {
    const { value, name } = event.target;
    setMember({ ...member, [name]: value });
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setMember({ ...member, submitted: true });
    const { name, company, status, notes } = member;
    if (name && company && status && notes) {
      dispatch(addMemberAsync({ name, company, status, notes }));
    }
  };
  if (member_add_submitted && member_add_loading) {
    return <div>loading</div>;
  }

  const error_string = JSON.stringify(member_add_error);
  return (
    <form>
      {member_add_failure && member_add_error && (
        <Notify error>{error_string}</Notify>
      )}
      {member.submitted && !member.name && (
        <Notify style={{ marginTop: 10 }} error>
          Name fields are required
        </Notify>
      )}
      {member.submitted && !member.company && (
        <Notify style={{ marginTop: 10 }} error>
          Company fields are required
        </Notify>
      )}
      {member.submitted && !member.notes && (
        <Notify style={{ marginTop: 10 }} error>
          Notes fields are required
        </Notify>
      )}
      {member.submitted && !member.status && (
        <Notify style={{ marginTop: 10 }} error>
          Status fields are required
        </Notify>
      )}
      <StyledInputGroup>
        <StyledLabel>Name</StyledLabel>
        <StyledInput
          name={"name"}
          onChange={handleChange}
          value={member.name}
          type={"text"}
        ></StyledInput>
      </StyledInputGroup>
      <StyledInputGroup>
        <StyledLabel>Company</StyledLabel>
        <StyledInput
          name={"company"}
          onChange={handleChange}
          value={member.company}
          type={"text"}
        ></StyledInput>
      </StyledInputGroup>
      <StyledInputGroup>
        <StyledLabel>Status</StyledLabel>
        <StyledInput
          onChange={handleChange}
          value={member.status}
          type={"text"}
          name={"status"}
        ></StyledInput>
      </StyledInputGroup>
      <StyledInputGroup>
        <StyledLabel>Notes</StyledLabel>
        <StyledInput
          onChange={handleChange}
          value={member.notes}
          type={"text"}
          name={"notes"}
        ></StyledInput>
      </StyledInputGroup>
      <StyledInputGroup style={{ textAlign: "right" }}>
        <div style={{ display: "flex", width: 200, marginLeft: "auto" }}>
          <StyledButton primary onClick={handleSubmit}>
            Save
          </StyledButton>

          <StyledButton
            style={{ marginLeft: 10 }}
            onClick={(event) => {
              event.preventDefault();
              props.closeModal();
            }}
          >
            Cancel
          </StyledButton>
        </div>
      </StyledInputGroup>
    </form>
  );
};

export default CreateTeam;

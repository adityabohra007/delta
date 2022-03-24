import React, { useEffect, useState } from "react";
import { StyledButton } from "../../components/StyledInput";
import { MultipleSelection } from "../../components/StyledMultipleSelection";
import { StyledSelect } from "../../components/StyledSelect";
import { HomePage } from "./Styled";
import { useDispatch, useSelector } from "react-redux";
import {
  add_company_filter,
  change_status_filter,
  deleteMemberAsync,
  de_select_all,
  reset,
  select_all,
  teamAsync,
} from "../../features/teams/teamSlice";
import { MdDelete } from "react-icons/md";
import Modal from "../../components/Modal";
import CreateTeam from "../../features/teams/createTeam";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const team = useSelector((state) => state.team);
  const [modalOpen, setModalOpen] = useState(false);
  const {
    member_add_success,
    member_delete_success,
    member_delete_failure,
    member_delete_error,
    member_delete_loading,
  } = useSelector((state) => state.team);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(teamAsync());
  }, []);

  useEffect(() => {
    if (member_add_success) {
      dispatch(reset());
      dispatch(teamAsync());
    }
    if (member_delete_success) {
      console.log("deleted_refresging");
      dispatch(reset());
      dispatch(teamAsync());
    }
  }, [member_add_success, member_delete_success]);

  console.log(
    member_delete_success,
    member_delete_loading,
    member_delete_error,
    member_delete_failure
  );
  const handleSelectAll = (event) => {
    if (event.target.checked) dispatch(select_all());
    else dispatch(de_select_all());
  };
  const handleClick = (item) => {
    dispatch(add_company_filter(item));
  };
  if (team.loading == "loading") {
    return <div>Loading</div>;
  }

  const list_of_company = team.company_filter.map((element) => element.value);
  const filtered_member =
    team.company_filter.length > 0
      ? team.members.filter((item) =>
          list_of_company.find((element) => item.company == element)
        )
      : team.members;

  const status_filter =
    team.status_filter != "--"
      ? filtered_member.filter((item) => item.status == team.status_filter)
      : filtered_member;

  return (
    <>
      <Modal
        header={"Create New Member"}
        closeModal={() => setModalOpen(false)}
        open={modalOpen}
      >
        <CreateTeam closeModal={() => setModalOpen(false)} />
      </Modal>

      <HomePage>
        <div className="HomePageContainer">
          <div style={{ display: "flex", alignItems: "center", padding: 20 }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>Team members</div>
            <div style={{ marginLeft: 20 }}>
              <StyledButton primary onClick={() => setModalOpen(true)}>
                Add Member
              </StyledButton>
            </div>
          </div>
          <div style={{ padding: 20, display: "flex" }}>
            <MultipleSelection
              handleSelectAll={handleSelectAll}
              handleClick={handleClick}
              options={team.company}
              selected={team.company_filter}
            ></MultipleSelection>

            <StyledSelect
              value={team.status_filter}
              onChange={(event) => {
                dispatch(change_status_filter(event.target.value));
              }}
            >
              <option>--</option>
              <option>Active</option>
              <option>Closed</option>
            </StyledSelect>
          </div>

          <hr></hr>
          <div>
            <table>
              <thead>
                <tr>
                  <th className="checkbox">
                    <input type={"checkbox"}></input>
                  </th>
                  <th className="name">Name</th>
                  <th className="company">Company</th>
                  <th className="status">Status</th>
                  <th className="last_updated">Last Updated</th>
                  <th className="notes">Notes</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {status_filter.length ? (
                  status_filter.map(
                    ({ id, name, company, notes, last_updated, status }) => (
                      <tr key={id}>
                        <td>
                          <input type={"checkbox"} />
                        </td>
                        <td>{name}</td>
                        <td>{company}</td>
                        <td>{status}</td>
                        <td>{new Date(last_updated).toDateString()}</td>
                        <td>{notes}</td>
                        <td>
                          <div>
                            <MdDelete
                              onClick={() => {
                                dispatch(deleteMemberAsync(id));
                              }}
                              size={"20"}
                              color={"gray"}
                              style={{
                                padding: 10,
                                background: "#dbdbdb78",
                                borderRadius: 20,
                              }}
                            ></MdDelete>
                          </div>
                        </td>
                      </tr>
                    )
                  )
                ) : (
                  <div style={{ textAlign: "center", width: "100%" }}>
                    No Member
                  </div>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </HomePage>
    </>
  );
};
export default Home;

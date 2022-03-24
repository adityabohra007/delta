import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { API_ROOT } from "../../constants/env";
import { authHeader } from "../helpers/auth-headers";

export const teamAsync = createAsyncThunk("team/fetchTeams", async (data) => {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };
  const response = await fetch(API_ROOT + "team", requestOptions).then((res) =>
    res.json()
  );
  return response;
});

export const addMemberAsync = createAsyncThunk(
  "team/addMember",
  async (data) => {
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    const response = await fetch(API_ROOT + "team/create", requestOptions).then(
      (resp) =>
        resp.json().then((data) => ({ status: resp.status, body: data }))
    );
    return response;
  }
);
export const deleteMemberAsync = createAsyncThunk(
  "team/deleteMember",
  async (data) => {
    const requestOptions = {
      method: "DELETE",
      headers: { ...authHeader(), "Content-Type": "application/json" },
    };
    const response = await fetch(
      API_ROOT + "team/" + data + "/delete",
      requestOptions
    ).then((resp) => {
      console.log(resp.status);
      if (resp.status == 204) {
        return { status: resp.status };
      }
      return resp.json().then((data) => {
        console.log(data);
        return { status: resp.status, body: { ...data } };
      });
    });
    return response;
  }
);
const initialState = {
  members: [],
  company: [],
  loading: "idle",
  company_filter: [],
  status_filter: "--",
};
const teamSlice = createSlice({
  name: "team",
  initialState,
  reducers: {
    reset: () => initialState,
    add_member: (state, action) => {},

    add_company_filter: (state, action) => {
      const item = action.payload;
      console.log("in action ", item);
      if (state.company_filter.find((element) => element.value == item.value)) {
        // If already in company_filter remove.
        console.log("inside");
        const updated = [
          ...state.company_filter.filter(
            (element) => element.value != item.value
          ),
        ];
        state.company_filter = updated;
      } else {
        // otherwise add it in
        if (state.company.find((element) => element.value == item.value)) {
          console.log("add it in ", item, [...state.company_filter, item]);
          state.company_filter = [...state.company_filter, item];
        }
      }
    },
    change_status_filter: (state, { payload }) => {
      state.status_filter = payload;
    },
    select_all: (state) => {
      state.company_filter = state.company;
    },
    de_select_all: (state) => {
      state.company_filter = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(teamAsync.pending, (state) => {
      state.loading = "loading";
    });
    builder.addCase(teamAsync.fulfilled, (state, action) => {
      state.loading = "idle";
      state.members = action.payload;
      let temp = [];
      for (var i = 0; i < action.payload.length; i++) {
        if (temp.find((item) => item.value == action.payload[i].company)) {
        } else {
          temp.push({
            name: action.payload[i].company,
            value: action.payload[i].company,
          });
        }
      }
      state.company = temp;
    });
    builder.addCase(deleteMemberAsync.pending, (state, action) => {
      state.member_delete_loading = "idle";
      console.log("laaaaa");
    });
    builder.addCase(deleteMemberAsync.fulfilled, (state, action) => {
      // state.member_delete_loading = "idle";
      console.log("ddddddddd");

      if (action.payload.status === 204) {
        state.member_delete_success = true;
      }
      if (action.payload.status == 404) {
        state.member_delete_failure = true;
        state.member_delete_error = "Not Found";
      } else {
        state.member_delete_failure = true;
        state.member_delete_error = "Unable to delete ";
      }
    });
    builder.addCase(addMemberAsync.pending, (state, action) => {
      state.member_add_submitted = true;
      state.member_add_loading = true;
    });
    builder.addCase(addMemberAsync.fulfilled, (state, action) => {
      console.log(action);
      state.member_add_loading = false;
      if (action.payload.status == 201) {
        state.member_add_success = true;
      }
      if (action.payload.status == 400) {
        state.member_add_failure = true;
        state.member_add_error = action.payload.body;
      } else {
        state.member_add_failure = true;
      }
    });
  },
});

export default teamSlice.reducer;

export const {
  add_company_filter,
  select_all,
  de_select_all,
  change_status_filter,
  reset,
} = teamSlice.actions;

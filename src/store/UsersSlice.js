import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: JSON.parse(localStorage.getItem("user2")) || null
}
export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    startLogin: (state, action) => {
      state.users = null
      state.isFetching = true
      state.erorr = false
    },
    loginSuccess: (state, action) => {
      state.users = action.payload
      state.isFetching = false
      state.erorr = false
      window.localStorage.setItem("user2", JSON.stringify(state.users))
    },
    loginFailure: (state, action) => {
      state.users = null
      state.isFetching = false
      state.erorr = true
    },
    logout: (state, action) => {
      state.users = null
      state.isFetching = false
      state.erorr = true
      window.localStorage.removeItem("user2")
    },
    updateUser: (state, action) => {
      state.users = action.payload
      state.isFetching = false
      state.erorr = false
      window.localStorage.setItem("user2", JSON.stringify(state.users))
    },

  }
})

export const { startLogin, loginSuccess, loginFailure, logout, updateUser } = usersSlice.actions
export default usersSlice.reducer



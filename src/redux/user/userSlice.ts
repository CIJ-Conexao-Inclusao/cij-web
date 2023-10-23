import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

import { TUser } from "../../types";

type TUserState = {
  user?: Omit<TUser, "password">;
};

const initialState: TUserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    defineUser: (state, action: PayloadAction<TUserState>) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      Cookies.remove("token");
      Cookies.remove("user");
      state.user = undefined;
    },
  },
});

// para usar informações derivadas do estado, crie um arquivo [slice].selector.ts na pasta do slice, e faça a lógica la
// export const selectUser = (state: RootState) => state.userReducer.user por exemplo;

export const { defineUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

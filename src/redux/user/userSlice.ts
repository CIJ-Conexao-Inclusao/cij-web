import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import { TUser } from "../../types";

type TUserState = {
  user?: TUser;
};

const initialState: TUserState = {
  user: undefined,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUserState>) => {
      state.user = action.payload.user;
    },
    removeUser: (state) => {
      state.user = undefined;
    },
  },
});

// para usar informações derivadas do estado, crie um arquivo [slice].selector.ts na pasta do slice, e faça a lógica la
// export const selectUser = (state: RootState) => state.userReducer.user por exemplo;

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface UserDataType {
  id: string;
  name: string;
  email: string;
}

interface MenuItem {
  menuId:string;
  label: string;
  children?: MenuItem[];
}

export interface SupportState {
  userData: UserDataType | null;
  selectedMenu: MenuItem | null;
  sidebarChildMenu: MenuItem[];
}

// Initial state
const initialState: SupportState = {
  userData: {
    id: "",
    name: "",
    email: ""
  },
  selectedMenu: null,
  sidebarChildMenu: [],
};

const fieldsSlice = createSlice({
  name: "support",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserDataType | null>) => {
      state.userData = action.payload;
    },
    setSelectedMenu: (state, action: PayloadAction<MenuItem | null>) => {
      state.selectedMenu = action.payload;
    },
    setSidebarChildMenu: (state, action: PayloadAction<MenuItem[]>) => {
      state.sidebarChildMenu = action.payload;
    },
  },
});

export const {
  setUserData,
  setSelectedMenu,
  setSidebarChildMenu,
} = fieldsSlice.actions;

export default fieldsSlice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define types
interface UserDataType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  emailVerified: boolean;
  phoneNumber: string;
  phoneVerified: boolean;
  countryCode: string;
  isActive: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  roleId: string;
  permission: string[];
  access_token: string;
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
  userData: null,
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
     clearAllState: (state) => {
      state.userData = null;
      state.selectedMenu = null;
      state.sidebarChildMenu = [];
    },
  },
});

export const {
  setUserData,
  setSelectedMenu,
  setSidebarChildMenu,
  clearAllState
} = fieldsSlice.actions;

export default fieldsSlice.reducer;
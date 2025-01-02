import * as actionTypes from '../actions';
export const initialState = {
  userLoginData: {},
  token: '',
  isLogin: false,
  snackbar: {
    title: '',
    message: '',
    status: '',
    isOpen: false
  },
  sidebarOpen:false,
  profileId:"",
  isFormOpen: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LOGIN_DATA:
      localStorage.setItem('authorization', action.payload);
      localStorage.setItem('isLogin', 'true');
      return {
        ...state,
        token: action.payload,
        isLogin: true
      };
    case actionTypes.SET_USER_LOGIN_DATA:
      return {
        ...state,
        userLoginData: action.payload
      };
    case actionTypes.SET_SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: action.payload
      };
      case actionTypes.SET_SHOW_SIDEBAR:
      return {
        ...state,
        sidebarOpen: action.payload
      };
      case actionTypes.SET_PROFILE_ID:
        return {
          ...state,
          profileId: action.payload
        };
        case actionTypes.SET_FORM_OPEN:
          return {
            ...state,
            isFormOpen: action.payload
          };
    default:
      return state;
  }
};

export default userReducer;

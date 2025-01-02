

import { useDispatch } from 'react-redux';
import * as actionTypes from '../actions';

export const useUserDispatch = () => {
    const dispatch = useDispatch();

    const setLoginData = (payload) => {
        dispatch({ type: actionTypes.SET_LOGIN_DATA, payload });
    };

    const setUserLoginData = (payload) => {
        dispatch({ type: actionTypes.SET_USER_LOGIN_DATA, payload });
    };

    const showNotification = async (payload) => {
        dispatch({ type: actionTypes.SET_SHOW_SNACKBAR, payload });
    };

    const showSidebar = async (payload) => {
        dispatch({ type: actionTypes.SET_SHOW_SIDEBAR, payload });

    }
    const setProfileId=async(payload)=>{
        dispatch({ type: actionTypes.SET_PROFILE_ID, payload });

    }

    const setIsFormOpen = (payload) => {
        dispatch({ type: actionTypes.SET_FORM_OPEN, payload });
    };
    return { setLoginData, setUserLoginData, showNotification, showSidebar ,setProfileId,setIsFormOpen};
};


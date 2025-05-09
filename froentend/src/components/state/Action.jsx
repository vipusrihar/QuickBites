import axios from 'axios';
import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILURE,
  ADD_TO_FAVOURITE_REQUEST,
  ADD_TO_FAVOURITE_SUCCESS,
  ADD_TO_FAVOURITE_FAILURE,
  LOGOUT,
} from './ActionTypes';
import { API_URL } from '../config/APi';

export const registerUser = ({ userData, navigate }) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, userData);

    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.jwt,
    });

    if (data.role === "ROLE_RESTAURANT") {
      navigate("/admin/restaurant");
    } else {
      navigate("/");
    }

  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: error.response?.data || error.message,
    });

    console.error('Registration error:', error.response || error.message);
  }
};

export const loginUser = (reqData) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signin`, reqData.userData);

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

    if (data.role === "ROLE_RESTAURANT_OWNER") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }

  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE, // You might want to define LOGIN_FAILURE separately
      payload: error.response?.data || error.message,
    });

    console.error('Login error:', error.response || error.message);
  }
};

export const getUser = (jwt) => async (dispatch) => {
  dispatch({ type: GET_USER_REQUEST });

  try {
    const { data } = await axios.get(`${API_URL}/api/user/profile`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });

    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("User fetched successfully:", data);

  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data || error.message,
    });

    console.error('Get user error:', error.response || error.message);
  }
};

export const addToFavourite = (jwt, restaurantId) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVOURITE_REQUEST });

  try {
    const { data } = await axios.put(
      `${API_URL}/api/restaurants/${restaurantId}/addFavourites`,
      {},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: ADD_TO_FAVOURITE_SUCCESS, payload: data });
    console.log("Added to favourites:", data);

  } catch (error) {
    dispatch({
      type: ADD_TO_FAVOURITE_FAILURE,
      payload: error.response?.data || error.message,
    });

    console.error('Add to favourite error:', error.response || error.message);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.clear();
    dispatch({ type: LOGOUT });
    console.log("Logout successful");
  } catch (error) {
    console.error('Logout error:', error.message);
  }
};

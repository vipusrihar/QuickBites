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
  ADD_TO_FAVORITE_REQUEST,
  ADD_TO_FAVORITE_SUCCESS,
  ADD_TO_FAVORITE_FAILURE,
  LOGOUT,
} from './ActionTypes';
import { API_URL } from '../../components/config/APi';

export const registerUser = ({ userData, navigate }) => async (dispatch) => {
  dispatch({ type: REGISTER_REQUEST });

  try {
    const { data } = await axios.post(`${API_URL}/auth/signup`, userData);

    console.log(data)

    if (data.jwt) {
      localStorage.setItem('jwt', data.jwt);
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.jwt,
    });

    if (data.role === "RESTAURANT") {
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

    console.log(data)

    if (data.jwt) {
      localStorage.setItem("jwt", data.jwt);
    }

    dispatch({ type: LOGIN_SUCCESS, payload: data.jwt });

    if (data.role === "RESTAURANT") {
      reqData.navigate("/admin/restaurant");
    } else {
      reqData.navigate("/");
    }

  } catch (error) {
    dispatch({
      type: REGISTER_FAILURE, 
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

    console.log(data);

    dispatch({ type: GET_USER_SUCCESS, payload: data });
    console.log("User fetched successfully:", data);
    console.log(data.id);
    localStorage.setItem("userId",data.id)

  } catch (error) {
    dispatch({
      type: GET_USER_FAILURE,
      payload: error.response?.data || error.message,
    });

    console.error('Get user error:', error.response || error.message);
  }
};

export const addToFavorite = (jwt, restaurantId, userId) => async (dispatch) => {
  dispatch({ type: ADD_TO_FAVORITE_REQUEST });

  try {
    const { data } = await axios.put(
      `${API_URL}/api/user/${userId}/favorites/add/${restaurantId}`,{},
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );

    dispatch({ type: ADD_TO_FAVORITE_SUCCESS, payload: data }); // assume backend returns updated list or restaurant
    console.log("Added to favorites:", data);

  } catch (error) {
    dispatch({
      type: ADD_TO_FAVORITE_FAILURE,
      payload: error.response?.data || error.message,
    });

    console.error('Add to favorite error:', error.response || error.message);
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

import axios from "axios";
import {
  GET_FOOD_TYPE_REQUEST,
  GET_FOOD_TYPE_SUCCESS,
  GET_FOOD_TYPE_FAILURE,
  GET_FOOD_CATEGORY_REQUEST,
  GET_FOOD_CATEGORY_SUCCESS,
  GET_FOOD_CATEGORY_FAILURE,
} from "./ActionTypes"

export const fetchFoodTypes = () => async (dispatch) => {
  try {
    dispatch({ type: GET_FOOD_TYPE_REQUEST });

    const { data } = await axios.get("/api/enums/food-types");
    dispatch({ type: GET_FOOD_TYPE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOOD_TYPE_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

export const fetchFoodCategories = (resId) => async (dispatch) => {
  try {
    dispatch({ type: GET_FOOD_CATEGORY_REQUEST });

    const { data } = await axios.get(`/api/restaurant/categories/${resId}`);
    dispatch({ type: GET_FOOD_CATEGORY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: GET_FOOD_CATEGORY_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};

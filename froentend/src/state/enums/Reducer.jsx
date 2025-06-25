import {
  GET_FOOD_TYPE_REQUEST,
  GET_FOOD_TYPE_SUCCESS,
  GET_FOOD_TYPE_FAILURE,
  GET_FOOD_CATEGORY_REQUEST,
  GET_FOOD_CATEGORY_SUCCESS,
  GET_FOOD_CATEGORY_FAILURE,
} from "./ActionTypes";

const initialState = {
  foodTypes: [],
  foodCategories: [],
  loading: false,
  error: null,
};

export const enumReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FOOD_TYPE_REQUEST:
    case GET_FOOD_CATEGORY_REQUEST:
      return { ...state, loading: true };

    case GET_FOOD_TYPE_SUCCESS:
      return { ...state, loading: false, foodTypes: action.payload };

    case GET_FOOD_CATEGORY_SUCCESS:
      return { ...state, loading: false, foodCategories: action.payload };

    case GET_FOOD_TYPE_FAILURE:
    case GET_FOOD_CATEGORY_FAILURE:
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

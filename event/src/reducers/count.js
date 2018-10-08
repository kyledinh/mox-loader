import {Type} from '../../../system';

const initialState = 0;

export default (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_COUNT:
      return state + (action.payload || 1);
    case Type.RESET_COUNT:
      return initialState;
    default:
      return state;
  }
};

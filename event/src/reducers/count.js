import {Type} from '../../../system';

const initialState = {
  clicks: 0,
  links: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Type.ADD_COUNT:
      return {
        links: state.links,
        clicks: state.clicks + (action.clicks || 1)
      }
    case Type.ADD_LINKS:
      return {
        clicks: state.clicks,
        links: action.links
      }
    case Type.RESET_COUNT:
      return initialState;

    default:
      return state;
  }
};

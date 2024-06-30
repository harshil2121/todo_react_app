import navigationAction from "./actions";

const initState = {
  show: false,
  message: "",
  type: "",
  isFetching: false,
  notificationData: [],
};

export default function rootReducer(state = initState, action) {
  switch (action.type) {
    case navigationAction.SUCCESS:
      return {
        ...state,
        show: action.show,
        message: action.message,
        resType: action.resType,
        isFetching: action.isFetching,
      };

    case navigationAction.ERROR:
      return {
        ...state,
        show: action.show,
        message: action.message,
        resType: action.resType,
        isFetching: action.isFetching,
      };

    case navigationAction.CLOSE:
      return {
        ...state,
        show: action.show,
        isFetching: action.isFetching,
      };

    case navigationAction.FETCHING:
      return {
        ...state,
        isFetching: action.isFetching,
      };

    case navigationAction.NOTIFICATIONDATA:
      return {
        ...state,
        notificationData: action.notificationData,
      };

    default:
      return state;
  }
}

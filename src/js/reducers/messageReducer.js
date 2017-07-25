const initialState = {
  status: null,
  message: null
}

export default function messageReducer(state = initialState, action){
  switch(action.type){
    case "STATUS_MESSAGE":{
      return {...state, status: action.payload.status, message: action.payload.message}
    }
    default:
      return state;
  }
}
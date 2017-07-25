const initialState = {
  agencies:[{
    _id: null,
    name: "Choose an agency..."
  }]
};
/*
* Modifies the agency state based on the action sent to this reducer
*/
export default function agenciesReducer(state = initialState, action){
  switch(action.type){
    //Add agencies to the state with data from the API
    case "RECEIVE_AGENCIES":{
      return Object.assign({},state,{
        agencies: [
          ...state.agencies,
          ...action.payload           //Object spread operator thanks to babel plugin
        ]
      })
    }
    default:
      return state;
  }
}
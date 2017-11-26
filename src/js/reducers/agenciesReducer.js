const initialState = {
  agencies:[{
    _id: 0,
    name: "Loading..."
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
    case "CHANGE_AGENCY_MESSAGE":{
      return Object.assign({},state,{
        agencies: state.agencies.map((agency) => {
          if(agency._id === 0){
            //Returning an agency object with the updated name
            return Object.assign({}, agency, {
              name: action.payload
            })
          }
          return agency //Return for map
        })
      })
    }
    default:
      return state;
  }
}
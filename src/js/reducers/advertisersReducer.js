const initialState = {
  currentAgency: null,
  advertiserSelected: null,
  advertisers: [{
    _id: 0,
    agency_id: 0,
    name: "Choose an agency first"
  }]
}
/*
* Modifies the advertiser state based on the action sent to this reducer
*/
export default function advertisersReducer(state = initialState, action){
  switch(action.type){
    //Add to the state advertisers state with data from the API
    case "RECIEVE_ADVERTISERS":{
      //Get the ids already in the state
      const ids = state.advertisers.map((item,i) =>{
        return item._id
      })
      //Filter the ids already in the state out of the payload
      const obj = action.payload.filter((item) => {
        return !ids.includes(item._id) 
      })
      //Update the state
      return Object.assign({},state,{
        advertisers:[
          ...state.advertisers,
          ...obj
        ]
      })
    }
    case "CHANGE_ADVERTISERS_MESSAGE":{
      return Object.assign({},state,{
        advertisers: state.advertisers.map((advertisers) => {
          if(advertisers._id === 0){
            //Returning an advertisers object with the updated name
            return Object.assign({}, advertisers, {
              name: action.payload
            })
          }
          return advertisers //Return for map
        })
      })
    }
    //Sets the currentAgency
    case "CURRENT_AGENCY":{
      return {...state, currentAgency: action.payload}
    }
    //Sets the advertiser selected
    case "ADVERTISER_SELECTED":{
      return {...state, advertiserSelected: action.payload}
    }
    default:
      return state;
  }
}
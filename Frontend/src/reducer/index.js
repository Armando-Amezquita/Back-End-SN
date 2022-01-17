const initialState ={

    post: [],

}

export function rootReducer(state = initialState, action){
    
    switch (action.type) {
         
        case "get": 
            return {
                ...state,
                post: action.payload,            
            }


         default: return state  
        }
    }        
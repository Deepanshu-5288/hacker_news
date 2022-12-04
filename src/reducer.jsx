import { HANDLE_PAGE, HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES } from "./actions";

const reducer = (state, action) => {
    switch (action.type){
        case SET_LOADING: 
        return {...state, loading: true};

        case SET_STORIES:
            return {...state, hits:action.payload.hits, nbPages: action.payload.nbPages};

        case HANDLE_SEARCH:
            return {...state, query:action.payload};
        case REMOVE_STORY:
            return {...state, hits: state.hits.filter((hit) => hit.objectID !== action.payload)};
        case HANDLE_PAGE:
            if(action.payload === "inc"){
                let nextPage = state.page + 1;
                if(nextPage > state.nbPages -1){
                    nextPage = 0;
                }
                return {...state, page:nextPage}
            }    
            if(action.payload === "dec"){
                let prevPage = state.page - 1;
                if(prevPage < 0){
                    prevPage = state.nbPages -1;
                }
                return {...state, page:prevPage};
                
            }         
        default:
        throw new Error("no matching action type")
    }
    
}

export default reducer;
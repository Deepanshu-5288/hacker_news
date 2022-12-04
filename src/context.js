import {useContext, createContext, useReducer, useEffect} from "react";
import { HANDLE_PAGE, HANDLE_SEARCH, REMOVE_STORY, SET_LOADING, SET_STORIES } from "./actions";
import reducer from "./reducer";

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?';
const initialState = {
    loading:false,
    query:'react',
    hits:[],
    page:0,
    nbPages:0
};

const AppContext = createContext();

const AppProvider = ({children}) =>{
    const [state, dispatch] = useReducer(reducer, initialState);

    const removeStory = (id) =>{
        dispatch({type:REMOVE_STORY, payload:id})
    }
    const handleSearch = (query) =>{
        dispatch({type:HANDLE_SEARCH, payload:query})
    }
    const handlePage = (value) =>{
        dispatch({type:HANDLE_PAGE, payload:value})
    }
    
    const fetchData = async (url) =>{
        dispatch({type: SET_LOADING})
        try {
            const response = await fetch(url);
            const data = await response.json();
            dispatch({type: SET_STORIES, payload:{hits:data.hits, nbPages: data.nbPages}})
        } catch (error) {
            dispatch({type: SET_LOADING});
            console.log(error);
        }
    }
    useEffect(() =>{
        fetchData(`${API_ENDPOINT}query=${state.query}&page=${state.page}`);
    }, [state.query, state.page])

    return <AppContext.Provider value={{...state, removeStory, handlePage, handleSearch}}>
        {children}
    </AppContext.Provider>
}

export const useGlobalContext = () =>{
    return useContext(AppContext);
}

export {AppContext, AppProvider};
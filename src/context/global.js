import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'

const GlobalContext = createContext();

const baseUrl = "https://api.jikan.moe/v4";

// actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const SET_SEARCH_STATUS = "SET_SEARCH_STATUS";

// reducer
const reducer = (state, action) => {
    switch(action.type) {
        case LOADING:
            return { ...state, loading: true };
        case GET_POPULAR_ANIME:
            return { ...state,  popularAnime: action.payload, loading: false };
        case SEARCH:
            return { ...state, searchResults: action.payload, loading: false };
        case GET_UPCOMING_ANIME:
            return { ...state, upcomingAnime: action.payload, loading: false };
        case GET_AIRING_ANIME:
            return { ...state, airingAnime: action.payload, loading: false };
        case SET_SEARCH_STATUS:
            return { ...state, isSearch: action.payload };
        default:
            return state;
    }
};

export const GlobalContextProvider = ({ children }) => {

    // initial state
    const initialState = {
        popularAnime: [],
        upcomingAnime: [],  // Changed to lowercase
        airingAnime: [],
        pictures: [],
        isSearch: false,
        searchResults: [],
        loading: false
    }

    const [ state, dispatch ] = useReducer(reducer, initialState);
    const [ search, setSearch ] = useState('');

    // handle Change
    const handleChange = (e) => {
        setSearch(e.target.value);
        if(e.target.value === '') {
            dispatch({ type: SET_SEARCH_STATUS, payload: false });
        }
    }

    // handle submit
    const handleSubmit = (e) => { 
        e.preventDefault();
        if(search) {
            searchAnime(search);
            dispatch({ type: SET_SEARCH_STATUS, payload: true });
        } else {
            dispatch({ type: SET_SEARCH_STATUS, payload: false });
            alert('Please enter a search term');
        }
    }

    // fetch popular anime
    const getPopularAnime = async() => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=bypopularity`);
        const data = await response.json();
        console.log(data.data);
        dispatch({ type: GET_POPULAR_ANIME, payload: data.data });
    }

    // fetch upcoming anime
    const getUpcomingAnime = async() => {
        dispatch({ type: LOADING });
        const response = await fetch(`${baseUrl}/top/anime?filter=upcoming`);
        const data = await response.json();
        dispatch({ type: GET_UPCOMING_ANIME, payload: data.data });
    }

    // fetch airing anime
    const getAiringAnime = async() => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/top/anime?filter=airing`);
        const data = await response.json();
        dispatch({type: GET_AIRING_ANIME, payload: data.data});
    }

    // search anime
    const searchAnime = async(anime) => {
        dispatch({type: LOADING});
        const response = await fetch(`${baseUrl}/anime?q=${anime}&order_by=popularity&sort=asc&sfw`);
        const data = await response.json();
        dispatch({type: SEARCH, payload: data.data});
    }

    useEffect(() => {
        getPopularAnime();
    }, [])

    return (
        <GlobalContext.Provider value={{
            ...state,
            handleChange,
            handleSubmit,
            searchAnime,
            search,
            getPopularAnime,
            getAiringAnime,
            getUpcomingAnime  // Included in the value object
        }}>
            {children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
};
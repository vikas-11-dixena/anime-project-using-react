import React, { Children, createContext, useContext } from 'react'

const GlobalContext = createContext();

export const GlobalContextProvider = ({ Children }) => {
    return (
        <GlobalContext.Provider value={'hello'}>
            {Children}
        </GlobalContext.Provider>
    )
};

export const useGlobalContext = () => {
    return useContext(GlobalContext);
}

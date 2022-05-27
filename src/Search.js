import { createContext, useState } from "react";

export const SearchContext=createContext();

export function Search({children,initialsearch}){
    const[search,setSearch]=useState(initialsearch);
    return(
        <SearchContext.Provider value={{search,setSearch}}>
{children}
        </SearchContext.Provider>
    )
}


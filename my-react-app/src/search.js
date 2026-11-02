import React, { useState, useCallback } from 'react';



function Search({onSearch}){

    const[searchQuery,setSearchQuery] = useState("");
    const handleQueryChange =useCallback((event)=>{
       setSearchQuery(event.target.value);
       onSearch(event.target.value);

    },[onSearch]);

    return(
        <div>
            <input type="text" placeholder="search..." onChange={(e) => handleQueryChange(e.target.value)}/>
        </div>
    )

}
export default Search;
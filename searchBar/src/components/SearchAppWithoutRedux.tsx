import React, { useEffect, useState } from 'react';
import "./styles.css";
// import {debounce} from "lodash";
import debounce from "./Debounce";
import throttle from "./Throttle";
// import throttle from "lodash/throttle"

const SearchAppWithoutRedux = () => {
    const [searchText, setSearchText] = useState<string>("");
    const [searchList, setSearchList] = useState<[]>([]);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    const query = async (searchTerm: String) => {
        if (searchTerm === "")
            return
        let url = `https://www.googleapis.com/books/v1/volumes?q=${searchTerm}&startIndex=0&maxResults=20`;
        const res = await fetch(url);
        return res.json()
    };

    const handleSearchDebounce = React.useRef(throttle(async (value) => {
        getSearchList(value)
    }, 300)).current;

    let getSearchList = async (searchText: String) => {
        setSearchList([]);

        if (searchText === "")
            return;
        let results = await query(searchText);
        
        let newDropdown = results?.items?.map((item: any) => {
            return {
                value: item.id,
                label: item.volumeInfo.title,
                key: item.id
            };
        });
        setToggleDropdown(true);
        setSearchList(newDropdown === undefined ? [] : newDropdown);
    }

    const handleChange = async (event: any) => {
        setSearchText(event.target.value);    
        handleSearchDebounce(event.target.value);
    }

    const selectOption = (event, value) => {
        console.log(event);
        setSearchText(value);
        setToggleDropdown(false);
    }

    const closeDropdown = (event: any) => {
        // console.log(event);
    }

    return (
    <div className="dropdown">
        <div className="control">
            <div className="selected-value" onBlur={closeDropdown}>
                <div>
                    <input
                        type="text"
                        value={searchText}
                        onChange={handleChange}
                        name="searchTerm"
                    />
                    <div className={`arrow ${searchList.length > 0 && toggleDropdown ? "open" : ""}`}></div>
                </div>
                {searchList.length > 0 && toggleDropdown ?
                    <div className={`options open`} >
                        {searchList?.map( (searchVal : any) => {
                        return (
                            <div className="dropdown-option" 
                                id={searchVal?.value} 
                                onClick={(event) => {selectOption(event, searchVal?.label)}}>
                                {searchVal.label}       
                            </div>
                        )})}
                    </div>: <></>  
                }
            </div>
        </div>
    </div>
    )
}

export default SearchAppWithoutRedux;
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AsyncSelect from "react-select/async"
import { query, searchWord } from '../slices/searchSlice';
// import { fetchSearchTerm } from '../slices/searchSlice';
import { test } from '@jest/globals';

const SearchApp = () => {
    const dispatch = useDispatch();
    const {searchTerm, resultList, status} = useSelector((state: any) => state.search);

    const fetchList = async (term: any) => {
        dispatch(searchWord({term : term}));
		await dispatch(query({searchTerm: searchTerm}));
        return resultList;
	}

    const handleSearch = (option: any) => {
        dispatch(searchWord({term : option.label}));
    }

    return (
        <div title='search-box'>
            <AsyncSelect
                id='async-select'
                onChange={handleSearch}
                // defaultOptions
                onInputChange={(value, action) => {
                    if (action.action === "input-change") 
                        fetchList(value)
                    }
                }
                // options={resultList}
                loadOptions={fetchList}
                defaultInputValue={searchTerm}
            />
        </div>
    )
}

export default SearchApp;
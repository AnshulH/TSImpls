import { render, screen, fireEvent, waitFor, cleanup} from "@testing-library/react";
import SearchApp from "./SearchApp";
import AsyncSelect from "react-select/async"
import { query, searchWord } from '../slices/searchSlice';
import { describe, test, expect, beforeEach, it, afterAll, jest } from '@jest/globals';
import React, { act } from "react";
import store from "../store/store"
import { Provider } from "react-redux";

const mockBooks: any = {
    items: [
      { id: 1, volumeInfo: { title: "One" } },
      { id: 2, volumeInfo: { title: "Two" } },
      { id: 3, volumeInfo: { title: "Three" } },
    ],
};

describe('searchBar test', () => {
  let fetchMock: any = undefined;
  beforeEach(() => {
    fetchMock = jest.spyOn(global, "fetch")
    .mockImplementation(() => Promise.resolve({
      ok: true,
      status: 200,
      json: () => mockBooks } as Response));
  })

  afterAll(() => {
    cleanup();
  });

  it('render search', () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
    const searchBar = screen.getByTitle('search-box');
    expect(searchBar).toBeCalled;
  })

  it('store actions on search', async () => {
    render(
      <Provider store={store}>
        <SearchApp />
      </Provider>
    );
    // expect(store.getState()).toEqual("");
    // const searchBar = screen.getByTitle('search-box');
    act(() => {
      store.dispatch(searchWord({term : "test"}));
      store.dispatch(query({term : "test"}));
    })
    
    expect(store.getState()['search']['searchTerm']).toEqual("test");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    // console.log(store.getState());
    // expect(searchBar).toBeCalled;
  })
});
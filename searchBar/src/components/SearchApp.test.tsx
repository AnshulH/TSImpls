import { render, screen, fireEvent, waitFor} from "@testing-library/react";
import SearchApp from "./SearchApp";
import AsyncSelect from "react-select/async"
import { query, searchWord } from '../slices/searchSlice';
import { describe, test, expect, beforeEach, it } from '@jest/globals';
import React from "react";
import store from "../store/store"
import { Provider } from "react-redux";

const mockBooks: any = {
    items: [
      { volumeInfo: { title: "One" } },
      { volumeInfo: { title: "Two" } },
      { volumeInfo: { title: "Three" } },
    ],
};

describe('searchBar test', () => {
    beforeEach(() => {})

    it('render search', () => {
      render(
        <Provider store={store}>
          <SearchApp />
        </Provider>
      );
      const searchBar = screen.getByTitle('search-box');
      expect(searchBar).toBeCalled;
    })
});
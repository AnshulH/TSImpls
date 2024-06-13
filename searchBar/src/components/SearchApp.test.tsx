import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import SearchApp from './SearchApp';
import { searchWord, query } from '../slices/searchSlice';

// Create a mock store
const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('SearchApp Component', () => {
    let store;

    beforeEach(() => {
        store = mockStore({
            search: {
                searchTerm: '',
                resultList: [],
                status: 'idle',
            },
        });
    });

    it('renders AsyncSelect component', () => {
        render(
            <Provider store={store}>
                <SearchApp />
            </Provider>
        );
        expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    it('dispatches searchWord on input change', async () => {
        render(
            <Provider store={store}>
                <SearchApp />
            </Provider>
        );

        const asyncSelectInput = screen.getByRole('combobox');
        fireEvent.change(asyncSelectInput, { target: { value: 'test' } });

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual(searchWord({ term: 'test' }));
        });
    });

    it('calls fetchList and dispatches query on input change', async () => {
        render(
            <Provider store={store}>
                <SearchApp />
            </Provider>
        );

        const asyncSelectInput = screen.getByRole('combobox');
        fireEvent.change(asyncSelectInput, { target: { value: 'test' } });

        await waitFor(() => {
            const actions = store.getActions();
            expect(actions).toContainEqual(searchWord({ term: 'test' }));
            expect(actions).toContainEqual(query({ searchTerm: '' }));
        });
    });

    it('updates defaultInputValue to searchTerm', () => {
        store = mockStore({
            search: {
                searchTerm: 'initial term',
                resultList: [],
                status: 'idle',
            },
        });

        render(
            <Provider store={store}>
                <SearchApp />
            </Provider>
        );

        const asyncSelectInput = screen.getByDisplayValue('initial term');
        expect(asyncSelectInput).toBeInTheDocument();
    });
});
import React from 'react';
import ReactDOM from 'react-dom';
// import 'src/assets/scss/index.scss';
// import 'antd/dist/antd.css';
import { Provider } from 'react-redux';
import store from './store/store';
import SearchApp from './components/SearchApp';

ReactDOM.render(
  <div>
    <Provider store={store}>
      <SearchApp />
    </Provider>
  </div>,
  document.getElementById('root'),
);

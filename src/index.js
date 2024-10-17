import React from 'react';
import ReactDOM from "react-dom/client";
import './index.css';
import reportWebVitals from './reportWebVitals';
import store from './store';
import App from './components/App';
import { Provider } from 'react-redux';
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';

<script src="https://unpkg.com/react-router-dom/umd/react-router-dom.min.js"></script>

/* provider makes it possible for the store to be available to nested components */
// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <App />
//     </Provider>
//   </React.StrictMode>
// );

function render(){
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
}

store.subscribe(render);
render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

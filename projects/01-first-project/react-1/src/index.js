import state from './redux/state';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { addPost, updateNewPostText } from './redux/state';
import { subscribe } from './redux/state';

const root = ReactDOM.createRoot(document.getElementById('root'));
let renderEntireTree = (state) => {
    root.render(
      <React.StrictMode>
        <App state={state} addPost={addPost} updateNewPostText={updateNewPostText} />
      </React.StrictMode>
    );
}


renderEntireTree(state)

subscribe(renderEntireTree)

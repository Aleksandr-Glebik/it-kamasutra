import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

let postsData = [
  {id: 1, message: 'Hi, how are you?', countLike: '20'},
  {id: 2, message: 'Fine, and You?', countLike: '15'},
  {id: 3, message: 'Me too', countLike: ''},
]

let dialogsData = [
  {id: 1, name: 'Sasha'},
  {id: 2, name: 'Pasha'},
  {id: 3, name: 'Masha'},
  {id: 4, name: 'Natasha'},
  {id: 5, name: 'Dasha'}
]

let messagesData = [
  {id: 1, message: 'Hi!'},
  {id: 2, message: 'Hello, my friend'},
  {id: 3, message: 'I am not your friend'},
  {id: 4, message: 'Why?'},
  {id: 5, message: 'Because you do not know how to react'},
  {id: 6, message: 'BUT I AM LEARNING'},
  {id: 7, message: 'Good, now you are my friend!!!'},
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App postsData={postsData} dialogsData={dialogsData} messagesData={messagesData}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


// REACT 파일구조
// src
// _actions, _reducer : Redux를 위한 폴더들
// components/views : 이 안에 페이지
// components/views/Sections : 해당페이지와 관련된 css 혹은 component를 추가
// App.js : Rounting 관련 일 처리
// Config.js : 환경 변수 저장
// hoc : Higher Order Component , 인증과 같은 처리
// utils : 여러 군데 사용가능한 것을 여기에 넣어서 어디서든 사용 가능

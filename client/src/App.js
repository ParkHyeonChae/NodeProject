import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import LandingPage from './components/views/LandingPage/LandingPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import RegisterPage from './components/views/RegisterPage/RegisterPage';

function App() {
  return (
    <Router>
      <div>
        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
        </Switch>
      </div>
    </Router>
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

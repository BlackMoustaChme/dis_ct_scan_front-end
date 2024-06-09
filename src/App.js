import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {buildProvider} from './vm/redux/api.js';
import MainPage from "./gui/page/main/main.js";
import ViewingPage from './gui/page/viewing-page/viewing-page.js';
import HistoryPage from './gui/page/history-page/history-page.js';
import LoginPage from './gui/page/login-page/login-page.js';

const Provider = buildProvider();
// const mainPage = (<Provider><MainPage /></Provider>)

function App() {
  const router = (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />}/>
          <Route path='/authorization' element={<LoginPage />}/>
          <Route path="/main" element={<MainPage />}/>
          <Route path="/view" element={<ViewingPage />}/>
          <Route path='/history' element={<HistoryPage/>}/>
        </Routes>
      </BrowserRouter>
    </Provider>
);
return router;
}

export default App;

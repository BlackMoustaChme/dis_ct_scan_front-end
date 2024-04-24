import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {buildProvider} from './vm/redux/api.js';
import MainPage from "./gui/page/main/main.js";

const Provider = buildProvider();
// const mainPage = (<Provider><MainPage /></Provider>)

function App() {
  const router = (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
);
return router;
}

export default App;

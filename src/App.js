import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {buildProvider} from './vm/redux/api.js';
import MainPage from "./gui/page/main/main.js";
import ViewingPage from './gui/page/main/viewing-page.js';

const Provider = buildProvider();
// const mainPage = (<Provider><MainPage /></Provider>)

function App() {
  const router = (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/view" element={<ViewingPage />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
);
return router;
}

export default App;

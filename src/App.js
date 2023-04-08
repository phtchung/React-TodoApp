import { ChakraProvider } from '@chakra-ui/react'
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Search from "./pages/Search"
import Home from "./pages/Home"
import Detail from "./pages/Detail"
function App() {
  return (

    <div className="App">

    <Router>
      <Routes>
          <Route path="/search" element={<Search/>}/>
          <Route path="/" element={<Home/>}/>
          <Route path="/detail/:todoId" element={<Detail/>}/>
      </Routes>
    </Router>
    </div>

  );
}

export default App;

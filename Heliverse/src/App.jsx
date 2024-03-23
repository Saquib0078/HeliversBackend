import "./App.css";
import Homepage from "./components/homepage/Homepage";
import { Route, Routes, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

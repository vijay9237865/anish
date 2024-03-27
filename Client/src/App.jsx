import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Query from "./pages/query/Query";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Query />} />
      </Routes>
    </Router>
  );
}

export default App;

import { Header, Sidebar } from "./components";
import { Home, Doctor, Patient } from "./pages";
import { constants } from "./constants";
import { Routes, Route, useLocation } from "react-router-dom";

function App() {
  return (
    <div className="flex flex-col overflow-hidden">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/patient" element={<Patient />} />
      </Routes>
    </div>
  );
}

export default App;

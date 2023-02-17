import { Header,Sidebar } from "./components";
import { Home, Doctor, Patient } from "./pages";
import { constants } from "./constants";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <div>
        <Sidebar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/doctor" element={<Doctor />} />
          <Route path="/patient" element={<Patient />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;

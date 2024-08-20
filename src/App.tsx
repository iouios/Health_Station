import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Health_Station/Login";
import Health_Station from "./Health_Station/Health_Station";
import PersonalRecordData from "./Health_Station/PersonalRecordData";
import HeaithRecordFrom from "./Health_Station/HeaithRecordFrom";
import Test from "./Health_Station/Test";

const App: React.FC = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Health_Station" element={<Health_Station />} />
          <Route path="/PersonalRecordData" element={<PersonalRecordData />} />
          <Route path="/HeaithRecordFrom" element={<HeaithRecordFrom />} />
          <Route path="/Test" element={<Test />} />
          {/* เพิ่มเส้นทางอื่นๆที่นี่ */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;

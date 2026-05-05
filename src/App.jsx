import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import EventAnalysis from "./pages/EventAnalysis";
import Correlation from "./pages/Correlation";
import PowerBI from "./pages/PowerBI";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="events" element={<EventAnalysis />} />
          <Route path="correlation" element={<Correlation />} />
          <Route path="powerbi" element={<PowerBI />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
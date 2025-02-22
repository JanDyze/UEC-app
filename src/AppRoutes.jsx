import { Routes, Route } from "react-router-dom";
import AttendanceSheet from "@/pages/AttendanceSheet";
import PersonsList from "@/pages/PersonsList";
import NewPerson from "@/pages/NewPerson";
import EditPerson from "@/pages/EditPerson";
import ServicesList from "@/pages/ServicesList";
import ProfilePage from "@/pages/ProfilePage";
import AttendanceForm from "@/pages/AttendanceForm"; // Added AttendanceForm
import Attendance from "@/pages/Attendance"; // Added AttendanceForm
import LayoutPage from "@/pages/LayoutPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LayoutPage />}>
        <Route path="/" element={<AttendanceSheet />} />
        <Route path="/persons" element={<PersonsList />} />
        <Route path="/new-person" element={<NewPerson />} />
        <Route path="/profile/:id" element={<ProfilePage />} />
        <Route path="/edit-person/:id" element={<EditPerson />} />
        <Route path="/services" element={<ServicesList />} />
        <Route path="/attendance-form" element={<AttendanceForm />} /> {/* Added route */}
        <Route path="/attendance/:serviceId" element={<Attendance />} /> {/* Added route */}
      </Route>
    </Routes>
  );
};

export default AppRoutes;

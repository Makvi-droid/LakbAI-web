import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import AdminLayout from "./components/layout/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import Employees from "./pages/admin/Employees";
import Analytics from "./pages/admin/Analytics";
import Content from "./pages/admin/Content";
import Reports from "./pages/admin/Reports";
import Settings from "./pages/admin/Settings";
import TourGuide from "./pages/admin/TourGuide";
import Sentiment from "./pages/admin/Sentiment";
import CrowdDensity from "./pages/admin/CrowdDensity";
import ChatPage from "./pages/ChatPage";
import StaffLayout from "./components/layout/StaffLayout";
import StaffDashboard from "./pages/staff/StaffDashboard";
import Tasks from "./pages/staff/Tasks";
import Schedule from "./pages/staff/Schedule";
import StaffReports from "./pages/staff/Reports";
import Messages from "./pages/staff/Messages";
import Profile from "./pages/staff/Profile";
import Unauthorized from "./pages/Unauthorized";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRedirect from "./routes/RoleRedirect";
import { ToastProvider } from "./context/ToastProvider";

export default function App() {
  return (
    <ToastProvider>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="employees" element={<Employees />} />
          <Route path="content" element={<Content />} />
          <Route path="settings" element={<Settings />} />
          <Route path="tour-guide" element={<TourGuide />} />
          <Route path="sentiment" element={<Sentiment />} />
          <Route path="crowd-density" element={<CrowdDensity />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="reports" element={<Reports />} />
          <Route path="chat" element={<ChatPage role="admin" />} />
        </Route>

        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRoles={["staff"]}>
              <StaffLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<StaffDashboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="reports" element={<StaffReports />} />
          <Route path="messages" element={<Messages />} />
          <Route path="chat" element={<ChatPage role="staff" />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <RoleRedirect />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ToastProvider>
  );
}

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LandingGov from './pages/LandingGov';
import LoginPage from './pages/LoginPage';
import StudentDashboard from './pages/StudentDashboard';
import ParentDashboard from './pages/ParentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import AdminDashboard from './pages/AdminDashboard';

// Student pages
import TodayLearning from './pages/student/TodayLearning';
import ProblemSolving from './pages/student/ProblemSolving';
import OnlineLibrary from './pages/student/OnlineLibrary';
import QuestionRoom from './pages/student/QuestionRoom';
import Mentoring from './pages/student/Mentoring';
import LearningNotes from './pages/student/LearningNotes';
import PointShop from './pages/student/PointShop';
import TestVideoCall from './pages/student/TestVideoCall';

// Parent pages
import LearningProgress from './pages/parent/LearningProgress';
import MonthlyReport from './pages/parent/MonthlyReport';
import MentoringLog from './pages/parent/MentoringLog';
import LearningSchedule from './pages/parent/LearningSchedule';
import ConsultationRequest from './pages/parent/ConsultationRequest';

// Teacher pages
import StudentManagement from './pages/teacher/StudentManagement';
import LearningReports from './pages/teacher/LearningReports';
import MentoringManagement from './pages/teacher/MentoringManagement';
import ClassSchedule from './pages/teacher/ClassSchedule';
import Notices from './pages/teacher/Notices';

// Admin pages
import CenterStatus from './pages/admin/CenterStatus';
import UserManagement from './pages/admin/UserManagement';
import Analytics from './pages/admin/Analytics';
import AIDiagnosisManagement from './pages/admin/AIDiagnosisManagement';
import SystemSettings from './pages/admin/SystemSettings';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={!isAuthenticated ? <LandingGov /> : 
          user?.role === 'student' ? <Navigate to="/student" /> :
          user?.role === 'parent' ? <Navigate to="/parent" /> :
          user?.role === 'teacher' ? <Navigate to="/teacher" /> :
          user?.role === 'admin' ? <Navigate to="/admin" /> :
          <Navigate to="/login" />
        } />
        <Route path="/login" element={!isAuthenticated ? <LoginPage /> : <Navigate to="/" />} />
        
        {/* Protected Routes */}
        <Route path="/student" element={
          user?.role === 'student' ? <StudentDashboard /> : <Navigate to="/" />
        } />
        <Route path="/student/today" element={
          user?.role === 'student' ? <TodayLearning /> : <Navigate to="/" />
        } />
        <Route path="/student/problems" element={
          user?.role === 'student' ? <ProblemSolving /> : <Navigate to="/" />
        } />
        <Route path="/student/library" element={
          user?.role === 'student' ? <OnlineLibrary /> : <Navigate to="/" />
        } />
        <Route path="/student/questions" element={
          user?.role === 'student' ? <QuestionRoom /> : <Navigate to="/" />
        } />
        <Route path="/student/mentoring" element={
          user?.role === 'student' ? <Mentoring /> : <Navigate to="/" />
        } />
        <Route path="/student/notes" element={
          user?.role === 'student' ? <LearningNotes /> : <Navigate to="/" />
        } />
        <Route path="/student/points" element={
          user?.role === 'student' ? <PointShop /> : <Navigate to="/" />
        } />
        <Route path="/student/test" element={
          user?.role === 'student' ? <TestVideoCall /> : <Navigate to="/" />
        } />
        <Route path="/parent" element={
          user?.role === 'parent' ? <ParentDashboard /> : <Navigate to="/" />
        } />
        <Route path="/parent/progress" element={
          user?.role === 'parent' ? <LearningProgress /> : <Navigate to="/" />
        } />
        <Route path="/parent/reports" element={
          user?.role === 'parent' ? <MonthlyReport /> : <Navigate to="/" />
        } />
        <Route path="/parent/mentoring" element={
          user?.role === 'parent' ? <MentoringLog /> : <Navigate to="/" />
        } />
        <Route path="/parent/schedule" element={
          user?.role === 'parent' ? <LearningSchedule /> : <Navigate to="/" />
        } />
        <Route path="/parent/consultation" element={
          user?.role === 'parent' ? <ConsultationRequest /> : <Navigate to="/" />
        } />
        <Route path="/teacher" element={
          user?.role === 'teacher' ? <TeacherDashboard /> : <Navigate to="/" />
        } />
        <Route path="/teacher/students" element={
          user?.role === 'teacher' ? <StudentManagement /> : <Navigate to="/" />
        } />
        <Route path="/teacher/reports" element={
          user?.role === 'teacher' ? <LearningReports /> : <Navigate to="/" />
        } />
        <Route path="/teacher/mentoring" element={
          user?.role === 'teacher' ? <MentoringManagement /> : <Navigate to="/" />
        } />
        <Route path="/teacher/schedule" element={
          user?.role === 'teacher' ? <ClassSchedule /> : <Navigate to="/" />
        } />
        <Route path="/teacher/notices" element={
          user?.role === 'teacher' ? <Notices /> : <Navigate to="/" />
        } />
        <Route path="/admin" element={
          user?.role === 'admin' ? <AdminDashboard /> : <Navigate to="/" />
        } />
        <Route path="/admin/centers" element={
          user?.role === 'admin' ? <CenterStatus /> : <Navigate to="/" />
        } />
        <Route path="/admin/users" element={
          user?.role === 'admin' ? <UserManagement /> : <Navigate to="/" />
        } />
        <Route path="/admin/analytics" element={
          user?.role === 'admin' ? <Analytics /> : <Navigate to="/" />
        } />
        <Route path="/admin/ai" element={
          user?.role === 'admin' ? <AIDiagnosisManagement /> : <Navigate to="/" />
        } />
        <Route path="/admin/settings" element={
          user?.role === 'admin' ? <SystemSettings /> : <Navigate to="/" />
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App

import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Home from './components/Home/Home';
import Header from '../src/components/Layout/Header/Header'
import Courses from './components/Courses/Courses';
import Footer from './components/Layout/Footer/Footer';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import ForgotPassword from './components/Auth/ForgotPassword';
import ResetPassword from './components/Auth/ResetPassword';
import Contact from './components/Contact/Contact';
import Request from './components/Request/Request';
import About from './components/About/About';
import Subscribe from './components/Payments/Subscribe';
import CoursePage from './components/CoursePage/CoursePage';
import Profile from './components/Profile/Profile';
import ChangePassword from './components/Profile/ChangePassword';
import UpdateProfile from './components/Profile/UpdateProfile';
import Dashboard from './components/Admin/Dashboard/Dashboard';
import CreateCourses from './components/Admin/CreateCourse/CreateCourses';
import AdminCourses from './components/Admin/AdminCourses/AdminCourses';
import Users from './components/Admin/Users/Users';
import EnrollmentForm from './components/Auth/EnrollmentForm';
import InstructorProfiles from './components/Instructor/Instructor';
import InstructorProfile from './components/Instructor/InstructorProfile';
import LearningDashboard from './components/Courses/LearningDashboard';


function App() {

  return (

    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/course/:id' element={<CoursePage />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/request' element={<Request />} />
        <Route path='/about' element={<About />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/changepassword' element={<ChangePassword />} />
        <Route path='/updateprofile' element={<UpdateProfile />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Register />} />
        <Route path='/forgetpassword' element={<ForgotPassword />} />
        <Route path='/resetpassword/:token' element={<ResetPassword />} />
        <Route path='/subscribe' element={<Subscribe />} />
        <Route path='/admin/dashboard' element={<Dashboard />} />
        <Route path='/admin/createcourse' element={<CreateCourses />} />
        <Route path='/admin/courses' element={<AdminCourses />} />
        <Route path='/admin/users' element={<Users />} />
        <Route path='/enroll' element={<EnrollmentForm />} />
        <Route path='/inst' element={<InstructorProfiles />} />
        <Route path='/instructor/:id' element={<InstructorProfile />} />
        <Route path='/learningdash' element={<LearningDashboard />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

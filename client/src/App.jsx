import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Layout from './pages/Layout';
import Preview from './pages/Preview';
import ResumeBuilder from './pages/ResumeBuilder';
import Login from './pages/Login';
import api from './api/axios';
import { login, setLoading } from './app/features/slice';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';


const App = () => {
  const dispatch = useDispatch();

  const getUserData = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      dispatch(setLoading(false));
      return;
    }

    try {
      const response = await api.get('/api/users/data', { headers: { Authorization: token } });
      if (response?.data?.user) {
        dispatch(login({ user: response.data.user, token }));
      }
    } catch (error) {
      console.log(error);
      localStorage.removeItem('token');
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <>
    <Toaster/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
      </Route>
      <Route path="view/:resumeId" element={<Preview />} />
    </Routes>
    </>
  );
};

export default App;

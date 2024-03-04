import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './global.css';
import { Toaster } from 'react-hot-toast';
import { Navbar, Spinner } from './components/ui';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import LoginForm from './components/Session/LoginForm';
import RegisterForm from './components/Session/RegisterForm';
import ProtectedRoute from './components/Session/ProtectedRoute';

 const router = createBrowserRouter([
	{
		path: "loginform",
		element: <LoginForm />,
	},
  {
		path: "register",
		element: <RegisterForm />,
	},

  
	{
		//element: <ProtectedRoute />,
		//children: [
			//{
        path: "/",
        element: <App />,
	    //},
		//],
	}, 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  
  <React.StrictMode>
    
    <Toaster />
    <Spinner size={40} />
    <Navbar />
    <main
      style={{ height: 'calc(100vh - 5rem)' }}
      className="h-screen w-screen"
    >
      <RouterProvider router={router} />
    </main>
  </React.StrictMode>
);

import { Navigate } from "react-router-dom";
import { useState, SyntheticEvent } from "react";

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [navigate, setNavigate] = useState(false);

    //Dette er for når back-end er på plass. 
    const handleSubmit = async (e: SyntheticEvent) => {
        e.preventDefault();
        
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include',
            body: JSON.stringify({
                username,
                password
            })
        }); 

        setNavigate(true);
    };

    if (navigate) {
        return <Navigate to="/"/>;
    } 

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <form onSubmit={handleSubmit}>
                <h1 className='text-3xl block text-center text-black font-bold'><i className='fa-solid fa-user'></i>Login</h1>
                <div className='mt-3'>
                    <input type='text' id='username' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Username' required
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className='mt-3'>
                    <input type='password' id='password' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Password' required
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>


                <div className='mt-5'>
                    <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"><i class="fa-solid fa-right-to-bracket'>Login</button>
                </div>


                <div className="mt-3 flex justify-between items-center">
                    <div>
                        <input type="checkbox" />
                        <label className="text-black"> Remember me</label>
                    </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div>
                        <a href='#' className='text-indigo-800 font-semibold'>Forgot password?</a>
                    </div>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div>
                        <p className="text-black">Dont't have an account? <a href='register' className='text-indigo-800 font-semibold'>Register</a></p>
                    </div> 
                </div>

            </form>
        </div>
    </div>
  );
};

export default LoginForm;
import { useState, SyntheticEvent } from "react";
import { Navigate, Link } from 'react-router-dom';

const RegisterForm = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();

        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name,
                username,
                password
            })
        });

        setRedirect(true);
    }

    if (redirect) {
        return <Navigate to="/loginform"/>;
    }

  return (
    <div className="flex justify-center items-center h-screen bg-indigo-600">
        <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
            <form onSubmit={submit}>
                <h1 className='text-3xl block text-center text-black font-bold'><i className='fa-solid fa-user'></i>Register</h1>
                <div className="mt-3">
                    <input type='text' id='name' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Name' required
                        onChange={e => setName(e.target.value)} />
                </div>
                <div className='mt-3'>
                    <input type='text' id='username' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Username' required
                        onChange={e => setUsername(e.target.value)} />
                </div>
                <div>
                    <input type='password' id='password' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600 text-black' placeholder='Password' required
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <div className='mt-5'>
                    <button type='submit' className='border-2 border-indigo-700 bg-indigo-700 text-white py-1 w-full rounded-md hover:bg-transparent hover:text-indigo-700 font-semibold"><i class="fa-solid fa-right-to-bracket'>Submit</button>
                </div>

                <div className="mt-3 flex justify-between items-center">
                    <div><Link to="register" className='text-indigo-800 font-semibold'>
                        Dont't have an account? Register
                        </Link>
                    </div> 
                </div>
            </form>
        </div>
    </div>
  );
};

export default RegisterForm;
import React, { useState } from 'react'
import { registerUser } from "../../utilis/handleapi";

const Register = () => {
  
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [profile, setProfile] = useState('');


  const handleSubmit = async() => {
    const body = new FormData();
    body.append('userName', name)
    body.append('password', password)
    const file = document.getElementById('registerImg').files[0]
    body.append('picture', file)
    for (var data of body) {
      console.log(data);
    }
    const response = await fetch('http://localhost:5000/auth/register', {
      method: 'post',
      body
    })
    const res = await response
    // console.log(re)
  }

  return (
    <div>
      <div className="flex flex-col items-center min-h-screen pt-6 sm:justify-center sm:pt-0 ">
        <div>
          <a href="/">
            <h3 className="text-4xl font-bold ">
                Welcome to TodoApp
            </h3>
          </a>
        </div>
        {/* <form action='http://localhost:5000/auth/register' method="POST" encType='multipart/form-data'  target="frameName"> */}
        
          <div className="w-full px-6 py-4 mt-6 overflow-hidden bg-white shadow-md sm:max-w-md sm:rounded-lg">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Username
              </label>
              <div className="flex flex-col items-start">
                <input
                  id='registerName'
                  type="text"
                  name="userName"
                  className="block w-full mt-1 text-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  onChange={(event)=>{setName(event.target.value);}}
                />
              </div>
            </div>

              <div className="mt-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    id='registerPassword'
                    type="password"
                    name="password"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                    onChange={(event)=>{setpassword(event.target.value);}}
                  />
                </div>
              </div>
              {/* <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    type="password"
                    name="password_confirmation"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                    onChange={(event)=>{setCpassword(event.target.value);}}
                  />
                </div>
              </div> */}
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Profile Image
                </label>
                <div className="flex flex-col items-start">
                  <input
                    id='registerImg'
                    type="file"
                    name="picture"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black"
                    onChange={(event)=>{setProfile(event.target.files);}}
                  />
                </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="/dashboard"
                >
                    Already registered?
                </a>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={handleSubmit}
                >
                  Register
                </button>
              </div>
          
      </div>
    {/* </form> */}
    <iframe src="" frameBorder="0" name="frameName" title='placeholder'></iframe>
    </div>
  </div>
  )
}

export default Register
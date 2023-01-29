import React, { useState} from 'react'
import { message } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from "react-router-dom";
import "./style.css"
import { useDispatch } from "react-redux";
import { setLogin } from "../../state/index";

const Login = () => {
  
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async() => {
    const Valid = checkValid();
    if (Valid === false){
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body:JSON.stringify({
            "userName": name,
            "password": password,
        }),
      })
      const resu = await response.json()
      
      console.log(resu.response)
      if (resu.response==='logged-in'){
        dispatch(
          setLogin({
            user: name,
            token: resu.token,
          })
        ); // upate the state;
        navigate('/dashboard')
        localStorage.setItem('token', resu.token)
      }else {
        message.error(resu)
      }
    }
  }

  const checkValid = () => {
    let bool = false;
    if (name.length < 2 || name.length > 30 || name.length===0 ){
      console.log('name problem')
      document.getElementById('nameValid').style.display = 'flex';
      document.getElementById('registerName').style.border = '2px solid red'
      bool = true;
    }else{
      document.getElementById('nameValid').style.display = 'none';
    }

    if(password.length <5){
      document.getElementById('passwordValid').style.display = 'flex';
      document.getElementById('registerPassword').style.border = '2px solid red'
      bool = true;
    }else{
      document.getElementById('passwordValid').style.display = 'none';
    }
    return bool;
  }
  const checkname = (name) => {
    if (name.length < 2 || name.length > 30 || name.length===0 ){
      document.getElementById('nameValid').style.display = 'flex';
    }else{
      document.getElementById('nameValid').style.display = 'none';
      document.getElementById('registerName').style.border = 'none'
    }
  }
  const checkPassword = (pass)=>{
    if(pass.length <5){
      document.getElementById('passwordValid').style.display = 'flex';
    }else{
      document.getElementById('passwordValid').style.display = 'none';
      document.getElementById('registerPassword').style.border = 'none'
    }
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
                  className="block w-full mt-1 text-black rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 register"
                  onChange={(event)=>{setName(event.target.value);checkname(event.target.value)}}
                />
              </div>  
              <div className='errorField' id='nameValid' style={{display:'none'}}>
                <span>Invalid Name, a username should be at least 2 letters and at most 30 letters.</span>
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
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black register"
                    onChange={(event)=>{setpassword(event.target.value);checkPassword(event.target.value)}}
                  />
                </div>
                <div className='errorField' id='passwordValid' style={{display:'none'}}>
                <span>Invalid Password, a password should be at least 5 letters.</span>
              </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="/">
                    Havn't registered?
                </a>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={()=>{handleSubmit();
                  }}
                >
                  Login
                </button>
              </div>
      </div>
    </div>
  </div>
  )
}

export default Login
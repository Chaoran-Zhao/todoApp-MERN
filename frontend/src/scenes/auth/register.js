import React, { useEffect, useState} from 'react'
import { message } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from "react-router-dom";
import "./style.css"
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state/index";

const Register = () => {
  
  const [name, setName] = useState('');
  const [password, setpassword] = useState('');
  const [Cpassword, setCpassword] = useState('');
  const [profile, setProfile] = useState('');

  const navigate = useNavigate();
    const dispatch = useDispatch();

  const handleSubmit = async() => {
    const body = new FormData();
    body.append('userName', name)
    body.append('password', password)
    const file = document.getElementById('registerImg').files[0]
    body.append('picture', file)
    for (var data of body) {
      console.log(data);
    }
    const Valid = checkValid();
    if (Valid === false){
      const response = await fetch('http://localhost:5000/auth/register', {
        method: 'post',
        body
      })
      const res = await response.text()
      console.log(res)
      if (res === 'image is saved'){
        navigate('/login')
      }else {
        message.error(res)
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
    if(Cpassword!==password || Cpassword.length===0){
      document.getElementById('CpasswordValid').style.display = 'flex';
      document.getElementById('confirmPassword').style.border = '2px solid red'
      bool = true;
    }else{
      document.getElementById('CpasswordValid').style.display = 'none';
    }
    if (document.getElementById('registerImg').files[0]===undefined){
      document.getElementById('imgValid').style.display = 'flex';
      document.getElementById('registerImg').style.border = '2px solid red'
      bool = true;
    }else{
      document.getElementById('imgValid').style.display = 'none';
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

  const checkCPassword = (pass)=>{
    if(pass!==password){
      document.getElementById('CpasswordValid').style.display = 'flex';
    }else{
      document.getElementById('CpasswordValid').style.display = 'none';
      document.getElementById('confirmPassword').style.border = 'none'
    }
  }
  const checkImg = ()=>{
    if (document.getElementById('registerImg').files[0]===undefined){
      document.getElementById('imgValid').style.display = 'flex';
    }else{
      document.getElementById('imgValid').style.display = 'none';
      document.getElementById('registerImg').style.border = 'none'
    }
  }

  useEffect(() => {
    localStorage.removeItem('token');
    dispatch(setLogout())
  },[]);

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
              <div className="mt-4">
                <label
                  htmlFor="password_confirmation"
                  className="block text-sm font-medium text-gray-700 undefined"
                >
                  Confirm Password
                </label>
                <div className="flex flex-col items-start">
                  <input
                    id='confirmPassword'
                    type="password"
                    name="password_confirmation"
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black register"
                    onChange={(event)=>{setCpassword(event.target.value);checkCPassword(event.target.value)}}
                  />
                </div>
                <div className='errorField' id='CpasswordValid' style={{display:'none'}}>
                <span>Incorrect Password, the password does not match.</span>
              </div>
              </div>
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
                    className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 text-black register"
                    onChange={(event)=>{setProfile(event.target.files);checkImg()}}
                  />
                </div>
                <div className='errorField' id='imgValid' style={{display:'none'}}>
                <span>Profile Image is required.</span>
              </div>
              </div>
              <div className="flex items-center justify-end mt-4">
                <a
                  className="text-sm text-gray-600 underline hover:text-gray-900"
                  href="/login"
                >
                    Already registered?
                </a>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 ml-4 text-xs font-semibold tracking-widest text-white uppercase transition duration-150 ease-in-out bg-gray-900 border border-transparent rounded-md active:bg-gray-900 false"
                  onClick={()=>{handleSubmit();
                  }}
                >
                  Register
                </button>
              </div>
      </div>
    </div>
  </div>
  )
}






export default Register
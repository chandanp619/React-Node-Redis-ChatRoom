import React, { useEffect,useState } from 'react'

export default function LoginComponent() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  useEffect(() => {
      let user = localStorage.getItem("user_token");
      if(user){
        window.location.href = "/";
      }  
  })

  const login = () => {
    localStorage.setItem("user_token", "123");
    localStorage.setItem("user_name", username);
    window.location.href = "/";
  }

  return (
    <div className='login container-fluid'>
      <div className='row'>
        <div className='col-4'></div>
        <div className='col-4 col-offset-4 text-center p-3 mt-5 border border-secondary rounded dropshadow-dark'>
          <h4>User Login</h4>
          <br/>
          <input type='text' placeholder='Username' className='form-control' onChange={(e) => setUsername(e.target.value)}/>
          <br/>
          <br/>
          <input type='password' placeholder='Password' className='form-control' onChange={(e) => setPassword(e.target.value)}/>
          <br/>
          <br/>
          <button className='btn btn-primary' onClick={login}>Login</button>
        </div>
        <div className='col-4'></div>
      </div>
        
    </div>
  )
}

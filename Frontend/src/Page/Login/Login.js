import Logo from '../../resource/images/LogoLogin.png';
import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login(){

    const [email, setEmailInput] = useState('');
    const [password, setPasswordInput] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
    
        // Simulate login validation
        if (email === "user@example.com" && password === "password") {
          // Navigate to the dashboard on successful login
          navigate("/GPS_Rover");
        } else {
          alert("Invalid email or password. Try again!");
        }
      };

    return (
        <div className="container" id="content01">
        <div className="img-slider">
            <h2>Team Fusion</h2>
            <p>Place where imagination turns into creation!</p>
                <img src={Logo} alt="img"/>
        </div>
        <div className="content">
            <h2>Login</h2>
            <form id="form" onSubmit={handleSubmit}>
                <label  id="elabel">Username</label> <br/>
                <input type="email" id="eemail" value={email} placeholder="Team Fusion"  onChange={(e) => setEmailInput(e.target.value)}/> <br/>
                <label id="plabel" >Password</label> <br/>
                <input type="password" name="password" id="lpassword" value={password} placeholder="**********"required onChange={(e) => setPasswordInput(e.target.value)}/> <br/>
                <button type="submit" id="btn">Sign In </button>
            </form> 
        </div>
    </div>
    );
}

export default Login;
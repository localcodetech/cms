
import { useEffect, useState } from 'react';
import styled from 'styled-components';

// import IncorrectPasswordCard from '../common/wrongpassword';
import useApi from '../../hooks/useAPI';
import { postRegisterData } from '../../api/authcontext';
import { useNavigate } from 'react-router-dom';
import Loader from '../common/loading';






const Register =  () => {




   let navigate = useNavigate();
const {execute, loading, error, data} = useApi(postRegisterData)




    const [detail, setDetail] = useState({
        firstname : "",
        lastname : "",
        username : "",
        email : "",
        password : "",
        confirmPassword: ""
    })



const formhandler = (e) =>{
    const {id, value} = e.target

    if (id === "firstname") setDetail((prev)=>({...prev, firstname: value}))
    
    else if (id === "lastname") setDetail((prev)=>({...prev, lastname: value}))
    else if (id === "username") setDetail(prev=>({...prev, username: value}))
    else if (id === "password") setDetail(prev=>({...prev, password: value}))
    else if (id === "confirmPassword")  setDetail(prev=>({...prev, confirmPassword: value}))
    else if (id === "email")setDetail(prev=>({...prev, email: value}))
        else return null
}  




const formDataObject = ()=>{
  if (detail.password === detail.confirmPassword){

     const sanitise = {
      firstname : detail.firstname,
      lastname: detail.lastname,
      username : detail.username,
      email: detail.email,
      password : detail.confirmPassword
    };
    return sanitise
  } 
};



const submitForm = (e)=>{
  e.preventDefault();

  const dataObject = formDataObject()
  if (!dataObject){
    return
  }
    execute(dataObject)

}

const userInfo = ()=>{

  if (error){
    return error
  } else if (data){
    return data.message
  }else 
    return "sign up now"

}


useEffect (()=>{
    if (data){
      navigate('/login')
    }
},[data, navigate])



  return (
    <StyledWrapper>
      <form className="form" onSubmit={submitForm}>
        <p className="title">Register</p>
        <p className="message">{userInfo()}</p>
        
        <div className="flex">


          <label>
            <input required placeholder="" type="text" className="input" id='firstname' value={detail.firstname} onChange={formhandler} />
            <span>Firstname</span>
          </label>

          <label>
            <input required placeholder="" type="text" className="input"  id='lastname' value={detail.lastname} onChange={formhandler}/>
            <span>Lastname</span>
          </label>

        </div>
        <label>
          <input required placeholder="" type="text" className="input"  id='username' value={detail.username} onChange={formhandler}/>
          <span>Username</span>
        </label>

        <label>
          <input required placeholder ="" type="email" className="input" id='email' value={detail.email} onChange={formhandler}/>
          <span>Email</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input"  id='password' value={detail.password} onChange={formhandler} />
          <span>Password</span>
        </label>

        <label>
          <input required placeholder="" type="password" className="input" id='confirmPassword' value={detail.confirmPassword} onChange={formhandler} />
          <span>Confirm password</span>

        </label>
        <button className="submit"  disabled={loading}>{loading ? <Loader />: "submit"}</button>
        <p className="signin">Already have an acount ? <a href="/login">Signin</a></p>
      </form>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 350px;
    padding: 20px;
    border-radius: 20px;
    position: relative;
    background-color: whitesmoke;
    color: #212121;
    border: 1px solid #333;
  }

  .title {
    font-size: 28px;
    font-weight: 600;
    letter-spacing: -1px;
    position: relative;
    display: flex;
    align-items: center;
    padding-left: 30px;
    color: #d30073;
  }

  .title::before {
    width: 18px;
    height: 18px;
  }

  .title::after {
    width: 18px;
    height: 18px;
    animation: pulse 1s linear infinite;
  }

  .title::before,
  .title::after {
    position: absolute;
    content: "";
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0px;
    background-color: #d30073;
  }

  .message,
  .signin {
    font-size: 14.5px;
    color: #333;
  }

  .signin {
    text-align: center;
  }

  .signin a:hover {
    text-decoration: underline green;
  }

  .signin a {
    color: #d30073;
  }

  .flex {
    display: flex;
    width: 100%;
    gap: 6px;
  }

  .form label {
    position: relative;
  }

  .form label .input {
    background-color: #333;
    color: #fff;
    width: 100%;
    padding: 20px 05px 05px 10px;
    outline: 0;
    border: 1px solid rgba(105, 105, 105, 0.397);
    border-radius: 10px;
  }

  .form label .input + span {
    color: rgba(255, 255, 255, 0.5);
    position: absolute;
    left: 10px;
    top: 0px;
    font-size: 0.9em;
    cursor: text;
    transition: 0.3s ease;
  }

  .form label .input:placeholder-shown + span {
    top: 12.5px;
    font-size: 0.9em;
  }

  .form label .input:focus + span,
  .form label .input:valid + span {
    color: #d30073;
    top: 0px;
    font-size: 0.7em;
    font-weight: 600;
  }

  .input {
    font-size: medium;
  }

  .submit {
    border: none;
    outline: none;
    padding: 10px;
    border-radius: 10px;
    color: #d30073;
    font-size: 16px;
    transform: 0.3s ease;
    background-color: whitesmoke;
    border: 1px solid #d30073;
  }

  .submit:hover {
    background-color: #d30073;
    color: whitesmoke;
  }

  @keyframes pulse {
    from {
      transform: scale(0.9);
      opacity: 1;
    }

    to {
      transform: scale(1.8);
      opacity: 0;
    }
  }`;

export default Register;

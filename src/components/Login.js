import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Login = (props) => {
    const [credentials, setcredentials] = useState({email:"",password:""})
    let history=useHistory()
    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
        }

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const response=await fetch("http://localhost:5000/api/auth/login", {
            method: "POST",
      
            headers: {
              "Content-Type": "application/json",
            },
      
            body: JSON.stringify({email:credentials.email ,password :credentials.password}),
          });
         const json= await response.json();
         console.log("json when login",json)

         if(json.success){
             //save the token 
             localStorage.setItem('token', json.authToken);
             console.log(localStorage.getItem('token'))
             console.log("zal save")
             history.push('/');
             props.showAlert("Logged in Successfully !","success");
             

         }
         else{
            props.showAlert("Invaid Credentials","error")
         }
        
         


    }
    return (
        <div className="container mt-5">
           <form onSubmit={handleSubmit}>
  <div className="form-group mb-3 ">
    <label htmlFor="email">Email address</label>
    <input type="email" id="email" name="email" className="form-control" onChange={onChange}  value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email"/>
   
  </div>
  <div className="form-group  mb-3 ">
    <label htmlFor="password">Password</label>
    <input type="password" id="password" name="password" className="form-control" onChange={onChange}  value={credentials.password} placeholder="Password"/>
  </div>
 
  <button type="submit"  className="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Login

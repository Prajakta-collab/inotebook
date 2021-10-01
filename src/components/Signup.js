import React ,{useState} from 'react'
import { useHistory } from 'react-router-dom'

const Signup = (props) => {
  const [credentials, setcredentials] = useState({name:"",email:"",password:""})
  let history=useHistory()

    const onChange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
        }
        const {name,email,password}=credentials;

        const handleSubmit=async(e)=>{
          e.preventDefault();
          const response=await fetch("http://localhost:5000/api/auth/createuser", {
              method: "POST",
        
              headers: {
                "Content-Type": "application/json",
              },
        
              body: JSON.stringify({name,email,password}),
            });
           const json= await response.json();
           console.log(json)
  
           if(json.success){
               //save the token 
               localStorage.setItem('token', json.authtoken);
               console.log("zal save")
               history.push('/');
               props.showAlert("Account created Successfully !","success");
               
               
  
           }
           else{
               props.showAlert("email must not be used before","error")
           }
          
           
  
  
          }

    return (
        <div className="container">
           <form onSubmit={handleSubmit}>
  <div class="form-group">
    <label for="exampleInputEmail1">Name</label>
    <input type="text" class="form-control" id="name" name="name"   onChange={onChange} placeholder="Enter name"/>
  </div>
  <div class="form-group">
    <label for="email">Email address</label>
    <input type="email" class="form-control" id="email" name="email"  onChange={onChange} aria-describedby="emailHelp" placeholder="Enter email"/>
  </div>

  <div class="form-group">
    <label for="cpassword">Password</label>
    <input type="password" class="form-control" id="password"  onChange={onChange} name="password" placeholder="Password"/>
  </div>
  <div class="form-group">
    <label for="cpassword">Confirm Password</label>
    <input type="password" class="form-control" id="cpassword" name="cpassword" placeholder="Password"/>
  </div>
  
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
        </div>
    )
}

export default Signup

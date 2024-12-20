import { message } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData,setFormData] = useState({username:"",email:"",password:""});
  const apiUri = import.meta.env.VITE_API_BASE_URI;
  const navigate = useNavigate();

  const handleInputChange=(e)=>{
    const {name,value} = e.target;
    
    setFormData({...formData,[name]:value});
  }

  const handleSubmit =async(e)=>{
    e.preventDefault();

    try {
      const response = await fetch(`${apiUri}/api/auth/register`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify(formData)
      })

      if(response.ok){
        const data = await response.json();
        localStorage.setItem("user",JSON.stringify(data));
        message.success("Kayıt başarılı");
        navigate("/");
      }else{
        message.error("Kayıt yaparken bir hata oluştu");
      }
    } catch (error) {
      console.log("Giriş hatası :",error);
    }
  }

  return (
    <div className="account-column">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <span>
              Username <span className="required">*</span>
            </span>
            <input type="text" name="username" onChange={handleInputChange}/>
          </label>
        </div>
        <div>
          <label>
            <span>
              Email address <span className="required">*</span>
            </span>
            <input type="email" name="email" onChange={handleInputChange}/>
          </label>
        </div>
        <div>
          <label>
            <span>
              Password <span className="required">*</span>
            </span>
            <input type="password" name="password" onChange={handleInputChange}/>
          </label>
        </div>
        <div className="privacy-policy-text remember">
          <p>
            Your personal data will be used to support your experience
            throughout this website, to manage access to your account, and for
            other purposes described in our <a href="#">privacy policy.</a>
          </p>
          <button className="btn btn-sm">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;

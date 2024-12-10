import { message } from "antd";
import { useState } from "react"
import { useNavigate } from "react-router";

const Login = () => {
    const [formData,setFormData] = useState({email:"",password:""});
    const navigate = useNavigate();
    const apiUri = import.meta.env.VITE_API_BASE_URI;

    const handleInputChange =(e)=>{
        const {name,value} = e.target;
        setFormData({...formData,[name]:value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await fetch(`${apiUri}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("user", JSON.stringify(data));
    
            // Check the role and navigate accordingly
            if (data.role === "admin") {
              message.success("Admin olarak giriş yapıldı");
                window.location.href ="/admin";
            } else {
              message.success("Giriş başarılı");
              navigate("/");  // Navigate to home if the user is not an admin
            }
          } else {
            message.error("Giriş yaparken bir hata oluştu");
          }
        } catch (error) {
          console.log("Giriş hatası:", error);
          message.error("Bir hata oluştu, lütfen tekrar deneyin.");
        }
      };

  return (
    <div className="account-column">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>
                            <span>Username or email address <span className="required">*</span></span>
                            <input type="text" name="email" onChange={handleInputChange}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            <span>Password <span className="required">*</span></span>
                            <input type="password" name="password" onChange={handleInputChange}/>
                        </label>
                    </div>
                    <p className="remember">
                        <label>
                            <input type="checkbox"/>
                            <span>Remember me</span>
                        </label>
                        <button className="btn btn-sm">Login</button>
                    </p>
                    <a href="#" className="form-link">Lost your password?</a>
                </form>
            </div>
  )
}

export default Login
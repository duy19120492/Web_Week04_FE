import React, {useState} from "react";

function Register() {
    const [user, setUser] = useState({
        Username: "",
        Password: "",
        Email: ""
    });

    function handleChange(event) {
        const { name, value } = event.target;
    
        setUser(prevUser => {
          return {
            ...prevUser,
            [name]: value
          };
        });
    };

    async function postData(url = '', data = {}) {
        const response = await fetch(url, {
          method: 'POST', 
          mode: 'cors', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
        return response.json();
    }
      
    function submitUser(event) {
        // goi api registration ben BE
        postData('https://week04-be.onrender.com/api/post', user)
        .then((data) => {
          try {
            window.alert(`Bạn đã đăng ký form ${data.Message}!`);
          } catch (error) {
            
          }
        });
        event.preventDefault();
    };

    function checkDisable() {
        if(user.Username.length === 0 || user.Password.length === 0 || user.Email.length === 0)
            return true;

        return "";
    }

    return (
        <form>
            <h3 className="heading">Đăng ký</h3>
            <div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-4 col-form-label">Họ và tên:</label>
                    <div className="col-sm-8">
                        <input type="text" name="Username" id="username" className="form-control" placeholder="user123" value={user.Username} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label">Mật khẩu:</label>
                    <div className="col-sm-8">
                        <input type="password" name="Password" id="password" className="form-control" placeholder="****" value={user.Password} onChange={handleChange}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="email" className="col-sm-4 col-form-label">Email:</label>
                    <div className="col-sm-8">
                        <input type="email" name="Email" id="email" className="form-control" placeholder="abc@gmail.com" value={user.Email} onChange={handleChange}/>
                    </div>
                </div>
            </div>
            <button type="submit" className="btn btn-outline-primary mb-2 mt-5" onClick={submitUser} disabled={checkDisable()}>Đăng ký</button>
        </form>
    );
}

export default Register;
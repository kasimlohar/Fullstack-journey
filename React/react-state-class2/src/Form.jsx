import { useState } from "react"

export default function Form() {
    let [formData, setFormData] = useState({
        fullName: "",
        userName: "",
        password: ""
    })


    let handleInputChange = (event) => {
        
        setFormData( (currData) => {
            return {...currData, 
                [event.target.name]: event.target.value};
        });
    }

    let handleSubmit = (event) => {
        event.preventDefault();
        console.log(formData);
        setFormData({
            fullName: "",
            userName: "",
            password: ""
        })
    }

    return (<form onSubmit={handleSubmit}>
        <label htmlFor="fullname">Full Name</label>
        <input 
        placeholder="enter your Fullname" 
        type="text" value={formData.fullName} 
        onChange={handleInputChange} 
        id="fullname"
        name="fullName" 
        />

        <br /><br />
        <label htmlFor="username">Username</label>
        <input 
        placeholder="enter your username" 
        type="text" 
        value={formData.userName} 
        onChange={handleInputChange} 
        id="username"
        name="userName" 
        />
        
        <br /><br />
        <label htmlFor="password">password</label>
        <input 
        placeholder="enter your password" 
        type="password" 
        value={formData.password} 
        onChange={handleInputChange} 
        id="password"
        name="password" 
        />

        <button>Submit</button>
    </form>)
}
import React from "react";
import { loginUser } from "../utils/user";

const LoginForm = () => {
    const[ userLoginData, setUserLoginData ] = useState({ email: '', password: ''});
    const [ validated ] = useState(false);
    const [ showAlert, setShowAlert ] = useState(false);

    const handleInput = (event) => {
        const { name, value } = event.target;
        setUserLoginData({ ...userLoginData, [name]: value });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const response = await loginUser(userFormData);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const { token, user } = await response.json();
      console.log(user);
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
    }
}
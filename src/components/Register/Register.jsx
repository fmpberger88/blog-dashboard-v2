import {useState} from "react";
import {useMutation} from "@tanstack/react-query";
import { register } from "../../api.jsx";
import { Link, useNavigate } from "react-router-dom";
import ErrorMessage from "../ErrorMessage/ErrorMessage.jsx";
import {
    StyledForm
} from "../../styles.jsx";
import SuccessMessage from "../SuccessMesssage/SuccessMessage.jsx";


const Register = () => {
    const [username, setUsername] = useState("");
    const [first_name, setFirst_name] = useState("");
    const [family_name, setLast_name] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: register,
        onSuccess: () => {
            setSuccessMessage("Registration successful! Redirecting to login...");
            setErrorMessage("");
            setTimeout(() => {
                navigate('/login')
            }, 3000)
        },
        onError: (error) => {
            if (error.response && error.response.data && error.response.data.errors) {
                setErrorMessage(error.response.data.errors.map(err => err.msg).join(' '));
            } else {
                setErrorMessage(error.message);
            }
            setSuccessMessage("");
        }
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({ username, first_name, family_name, email, password });
    }

    return (
        <StyledForm onSubmit={handleSubmit}>
            <h1>Register</h1>
            {errorMessage && <ErrorMessage message={errorMessage} />}
            {successMessage && <SuccessMessage message={successMessage} />}
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                type="text"
                value={first_name}
                onChange={(e) => setFirst_name(e.target.value)}
                placeholder="First Name"
                required
            />
            <input
                type="text"
                value={family_name}
                onChange={(e) => setLast_name(e.target.value)}
                placeholder="Last Name"
                required
            />
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button type="submit" disabled={mutation.isLoading}>
                {mutation.isLoading ? "Loading..." : "Register"}
            </button>
            <p>Already an Account? Go to <Link to='/login'>Login</Link></p>
        </StyledForm>
    );
};

export default Register;
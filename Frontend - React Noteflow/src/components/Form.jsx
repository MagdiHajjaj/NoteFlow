import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css"
import LoadingIndicator from "./LoadingIndicator";
import { toast } from 'react-toastify';

function Form({ route, method, setIsAuthenticated }) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState(""); // State to store the error message

    const name = method === "login" ? "Login" : "Register"

    const handleSubmit = async (e) => {

        setLoading(true);
        setErrorMessage("");
        e.preventDefault();
        try {
            const res = await api.post(route, { username, password })
            if (method === "login") {
                localStorage.setItem(ACCESS_TOKEN, res.data.access)
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh)
                setIsAuthenticated(true)

                navigate("/")
                toast.success("Logged in successfully!")
            } else {
                navigate("/login")
                toast.success("Registration successful")
            }
        } catch (error) {
            if (error.response) {
                // Handle server-side errors based on the status code
                if (error.response.status === 401) {
                    setErrorMessage("Invalid Credentials.");
                } else {
                    setErrorMessage("An error occurred. Please try again later.");
                }
            } else {
                setErrorMessage("Network error. Please check your connection.");
            }

        } finally {
            setLoading(false)
        }
    };
    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
        <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
        />
        <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
        />
        {loading && <LoadingIndicator />}
        {errorMessage && (
            <div className="error-message" style={{ color: "red", marginTop: "10px" }}>
                {errorMessage}
            </div>
        )}
        <button className="form-button" type="submit">
            {name}
        </button>
    </form>
}
export default Form
import React from 'react'
import { FaSquarePlus } from "react-icons/fa6"
import { Link } from "react-router-dom"
import { MdEventNote } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import "../styles/Logout-btn.css"
import { FiLogOut } from "react-icons/fi";
import { toast } from 'react-toastify';

const NavBar = ({ setIsAuthenticated, searchText, handelSearchText }) => {

    const navigate = useNavigate(); // Hook to programmatically navigate

    const handleLogout = () => {
        
        localStorage.clear();
        setIsAuthenticated(false); // Update authentication state
        // Navigate to login page
        navigate("/login");
        toast.success("Logged out successfully!")
    };
    return (
        <nav className="navbar bg-body-tertiary py-50" style={{ padding: "20px" }}>
            <div className="container d-flex justify-content-around">
                <Link className="navbar-brand" to="/">
                    <h4 style={{ fontWeight: "bold" }}><MdEventNote /> NoteFlow</h4>
                </Link>
                <div className="d-flex">
                    <div
                        className="input-group input-group-sm"
                        style={{ width: "500px", height: "40px" }}
                    >
                        <input
                            className="form-control"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            value={searchText}
                            onChange={(e) => handelSearchText(e.target.value)}
                        />

                    </div>

                </div>
                <Link to="/add-note" style={{ textDecoration: "none" }}>
                    <button
                        className="btn btn-outline-primary btn-md"
                        type="button"

                    >
                        <FaSquarePlus className="me-2 fs-6" /> Add Notes
                    </button>
                </Link>

                <button
                    className="Logout-btn"
                    type="button"
                    onClick={handleLogout}>
                    <FiLogOut  className ="logout-icon" /> Logout
                </button>


            </div>
        </nav>
    )
}

export default NavBar
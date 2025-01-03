import React from 'react'
import "../styles/Modal.css"
import { IoMdClose } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const Model = ({handleIsOpen, deleteNote}) => {
    const navigate = useNavigate()
    const handleDeleteNote = ()=>{
        deleteNote()
        navigate("/")
       
    }
    
    return (
        <div className="c-modal-overlay">
            <div className="c-modal">
                <button className="close-button"onClick={handleIsOpen}><IoMdClose/></button>
                <div className="c-modal-content">
                    <h2>Delete Note</h2>
                    <p>Are you sure you want to Delete this note?</p>
                    <span className="d-flex justify-content-center">
                        <button className="btn btn-danger me-3" onClick={handleDeleteNote}>Delete</button>
                        <button className="btn btn-primary" onClick={handleIsOpen}>Cancel</button>
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Model
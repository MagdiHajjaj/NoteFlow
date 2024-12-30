import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import {ToastContainer, toast } from 'react-toastify';
import MainLayout from './layouts/MainLayout'
import HomePage from './pages/HomePage'
import AddnotePage from './pages/AddNotePage'
import NoteDetailPage from './pages/NoteDetailPage'
import EditNotePage from './pages/EditNotePage.JSX'
import Login from "./pages/login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"
import ProtectedRoute from "./components/ProtectedRoute"
import api from './api';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filterText, setFilterText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleFilterText = (val) => setFilterText(val);
  const handelSearchText = (val) => setSearchText(val);
  
  const Logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    
  };

  function RegisterAndLogout() {
    localStorage.clear();
    return <Register />;
  };


  useEffect(() => {

    const token = localStorage.getItem("access");
    if (token) {
      setIsAuthenticated(true);
    } else {

      setIsAuthenticated(false);
    }
  }, [localStorage.getItem("access")]);

  /* Fetch Notes */
  useEffect(() => {
    if (isAuthenticated) {
      getNotes();
    }
  }, [isAuthenticated, searchText]);


  const filteredNotes =
    filterText === "BUSINESS" ? notes.filter(note => note.category === "BUSINESS")
      : filterText === "PERSONAL" ? notes.filter(note => note.category === "PERSONAL")
        : filterText === "IMPORTANT" ? notes.filter(note => note.category === "IMPORTANT")
          : notes;



  const getNotes = () => {
    setIsLoading(true);
    api.get(searchText ? `api/notes-search/?search=${searchText}` : `/api/notes/`)
      .then((res) => {
        setNotes(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err.message);
        setIsLoading(false);
      });
  }
  const addNote = (data) => {
    api.post(`/api/notes/`, data)
      .then(res => {
        setNotes([...notes, res.data])
        toast.success("New note has been added");
      })
      .catch(err => {
        console.log(err.message);
      })
    getNotes();
  }

  const updateNote = (data, slug, navigate) => {
    api.put(`/api/notes/${slug}/`, data)
      .then(res => {
        const updatedNoteIndex = notes.findIndex(note => note.slug === slug);
        if (updatedNoteIndex !== -1) {
          const updatedNotes = [...notes];
          updatedNotes[updatedNoteIndex] = res.data;
          setNotes(updatedNotes);
        }
        toast.success("Note updated successfully");
        navigate(`/notes/${res.data.slug}`);
      })
      .catch(err => console.log(err.message));
    getNotes();
  }

  const deleteNote = (slug) => {
    api.delete(`/api/notes/${slug}/`)
      .then(res => {
        const updatedNotes = notes.filter(note => note.slug !== slug);
        setNotes(updatedNotes);
        toast.success("Note deleted successfully");
      })
      .catch(err => console.log(err.message));
    getNotes();
  }

  return (
    <BrowserRouter>
      <ToastContainer 
        position="top-right" // You can adjust the position here
        autoClose={5000} // Toast disappears after 5 seconds
        hideProgressBar={false} // Show the progress bar
        newestOnTop={true} // Ensure new toast shows on top
        closeOnClick
        rtl={false} 
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/logout" element={<Logout  />} />
        <Route path="/register" element={<RegisterAndLogout />} />


        <Route path="/" element={<ProtectedRoute><MainLayout handelSearchText={handelSearchText} searchText={searchText} setIsAuthenticated={setIsAuthenticated} /></ProtectedRoute>}>
          <Route index element={<HomePage notes={filteredNotes} loading={isLoading} handleFilterText={handleFilterText} />} />
          <Route path="/add-note" element={<ProtectedRoute><AddnotePage addNote={addNote} /></ProtectedRoute>} />
          <Route path="/edit-note/:slug" element={<ProtectedRoute><EditNotePage updateNote={updateNote} /></ProtectedRoute>} />
          <Route path="/notes/:slug" element={<ProtectedRoute><NoteDetailPage deleteNote={deleteNote} /></ProtectedRoute>} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      
    </BrowserRouter>
  );
};

export default App;

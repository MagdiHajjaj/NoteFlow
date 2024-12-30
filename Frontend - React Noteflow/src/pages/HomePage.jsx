import React, { useState } from "react";
import Filter from "../components/Filter";
import NoteCardBox from "../components/NoteCardBox";
import "../styles/DifferentPages.css"
const HomePage = ({ notes, loading, handleFilterText }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 9;

  // Calculate the index for slicing the notes array
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = notes.slice(indexOfFirstNote, indexOfLastNote);

  // Total pages calculation
  const totalPages = Math.ceil(notes.length / notesPerPage);

  // Change page handler
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Filter handleFilterText={handleFilterText} />

      {notes.length < 1 ? (
        <h4 style={{ textAlign: 'center', marginTop: '150px' }}>
          There's no notes found with the selected category filter.
        </h4>
      ) : (
        <NoteCardBox notes={currentNotes} loading={loading} />
      )}

      {/* Pagination Controls */}
      <div className="pagination" style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          style={{ padding: "10px", margin: "0 5px" }}
        >
          Previous
        </button>
        <span style={{color: "black"}} >
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          style={{ padding: "10px", margin: "0 5px" }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default HomePage;

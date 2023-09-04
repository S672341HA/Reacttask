import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

import AddDocument from './AddDocument';
import DisplayDocuments from './DisplayDocuments';
import UpdateDocument from './UpdateDocuments';  
import DeleteDocument from './DeleteDocument';

function App() {
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [documents, setDocuments] = useState([]);

  // Function to fetch documents from the server
  const fetchDocuments = async () => {
    try {
      const response = await axios.get('/api/documents'); // Adjust the API endpoint
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  // Initial fetching of documents
  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleAddDocument = async (newDocument) => {
    try {
      // Make a POST request to add the new document
      const response = await axios.post('/api/documents', newDocument); // Adjust the API endpoint
      setDocuments([...documents, response.data]); // Update the state with the new document
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const handleUpdateDocument = async (updatedDocument) => {
    try {
      // Make a PUT request to update the selected document
      const response = await axios.put(`/api/documents/${updatedDocument._id}`, updatedDocument); // Adjust the API endpoint
      // Update the state with the updated document
      setDocuments((prevDocuments) =>
        prevDocuments.map((doc) => (doc._id === updatedDocument._id ? response.data : doc))
      );
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  const handleDeleteDocument = async (documentId) => {
    try {
      // Make a DELETE request to delete the selected document
      await axios.delete(`/api/documents/${documentId}`); // Adjust the API endpoint
      // Remove the deleted document from the state
      setDocuments((prevDocuments) => prevDocuments.filter((doc) => doc._id !== documentId));
      // Clear the selected document
      setSelectedDocument(null);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div className="App">
      <h1>MongoDB CRUD App</h1>
      <AddDocument onAdd={handleAddDocument} />
      <DisplayDocuments documents={documents} onUpdate={setSelectedDocument} onDelete={handleDeleteDocument} />
      {selectedDocument && (
        <>
          <UpdateDocument document={selectedDocument} onUpdate={handleUpdateDocument} />
          <DeleteDocument documentId={selectedDocument._id} onDelete={handleDeleteDocument} />
        </>
      )}
    </div>
  );
}

export default App;

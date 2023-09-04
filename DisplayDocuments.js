import React, { useState, useEffect } from 'react';
import axios from 'axios';

function DisplayDocuments({ onUpdate, onDelete }) {
  const [documents, setDocuments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/documents');
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  return (
    <div>
      <h2>Documents</h2>
      <ul>
        {documents.map((document) => (
          <li key={document._id}>
            <strong>{document.title}</strong>
            <p>{document.content}</p>
            <button onClick={() => onUpdate(document)}>Update</button>
            <button onClick={() => onDelete(document._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DisplayDocuments;

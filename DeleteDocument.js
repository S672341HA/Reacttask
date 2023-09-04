import React from 'react';
import axios from 'axios';

function DeleteDocument({ documentId, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`/api/documents/${documentId}`);
      onDelete(documentId);
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  return (
    <div>
      <h2>Delete Document</h2>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
}

export default DeleteDocument;

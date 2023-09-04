import React, { useState } from 'react';
import axios from 'axios';

function AddDocument({ onAdd }) {
  const [documentData, setDocumentData] = useState({ title: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/documents', documentData);
      onAdd(response.data);
      setDocumentData({ title: '', content: '' });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  return (
    <div>
      <h2>Add Document</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={documentData.title}
          onChange={(e) => setDocumentData({ ...documentData, title: e.target.value })}
        />
        <textarea
          placeholder="Content"
          value={documentData.content}
          onChange={(e) => setDocumentData({ ...documentData, content: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default AddDocument;

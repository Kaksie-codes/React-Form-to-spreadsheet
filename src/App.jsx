import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    const currentDateTime = new Date();
    const formattedDateTime = currentDateTime.toLocaleString();

    // Set the submissionTime directly in the form data
    const formDataObject = new FormData();
    formDataObject.append('name', formData.name);
    formDataObject.append('email', formData.email);
    formDataObject.append('phone', formData.phone);
    formDataObject.append('submissionTime', formattedDateTime); // Set the submissionTime here

    fetch(
      'https://script.google.com/macros/s/AKfycbzpc8qQ1oOWZhHrjFZKuRSY-SDujdkFY7LA2quQ2L1pzMpq6flFYG9L9sEsCPe4i8IXWA/exec',
      {
        method: 'POST',
        body: formDataObject,
      }
    )
      .then((resp) => resp.text())
      .then((data) => {
        setMessage(data);
        setSubmitting(false);
        formData.name ='';
        formData.email ='';
        formData.phone ='';
         // Clear the message after 5 seconds
         setTimeout(() => {
          setMessage('');          
        }, 5000);
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>{message}</h1>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <input
          type="email"
          name="email"
          placeholder="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <input
          type="tel"
          name="phone"
          placeholder="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        <br />
        <br />
        <input
          type="hidden"
          name="submissionTime"
        />
        <input type="submit" value={submitting ? 'Submitting...' : 'Submit'} />
      </form>
    </div>
  );
}

export default App;

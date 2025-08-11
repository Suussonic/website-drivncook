import React, { useState } from 'react';

const FranchiseForm = ({ onAdd }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (name && email) {
      onAdd({ id: Date.now(), name, email });
      setName('');
      setEmail('');
    }
  };

  return (
    <form className="box mb-4" onSubmit={handleSubmit}>
      <div className="field">
        <label className="label">Nom</label>
        <div className="control">
          <input className="input" type="text" value={name} onChange={e => setName(e.target.value)} required />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
      </div>
      <button className="button is-primary" type="submit">Ajouter</button>
    </form>
  );
};

export default FranchiseForm;

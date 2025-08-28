import React, { useEffect, useState } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [form, setForm] = useState({ user: '', comment: '', rating: 5 });
  const [message, setMessage] = useState(null);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/reviews`)
      .then(res => res.json())
      .then(setReviews);
  }, []);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage(null);
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (!res.ok) throw new Error('Erreur lors de l’envoi');
      const added = await res.json();
      setReviews([added, ...reviews]);
      setForm({ user: '', comment: '', rating: 5 });
      setMessage('Merci pour votre avis !');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="section" style={{ background: '#181a20' }}>
      <div className="container" style={{ maxWidth: 600, margin: '2rem auto' }}>
        <h2 className="title has-text-white">Avis clients</h2>
        <form onSubmit={handleSubmit} className="mb-4">
          <div className="field is-grouped">
            <div className="control is-expanded">
              <input className="input" name="user" placeholder="Votre nom" value={form.user} onChange={handleChange} required />
            </div>
            <div className="control is-expanded">
              <input className="input" name="comment" placeholder="Votre avis" value={form.comment} onChange={handleChange} required />
            </div>
            <div className="control">
              <select className="input" name="rating" value={form.rating} onChange={handleChange} required>
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} ★</option>)}
              </select>
            </div>
            <div className="control">
              <button className="button is-primary" type="submit">Envoyer</button>
            </div>
          </div>
        </form>
        {message && <div className={message.includes('Merci') ? 'has-text-success' : 'has-text-danger'}>{message}</div>}
        <div>
          {reviews.map((r, i) => (
            <div key={i} className="box" style={{ background: '#23272f', color: '#fff', marginBottom: 8 }}>
              <strong>{r.user}</strong> ({r.rating} ★) : {r.comment}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;

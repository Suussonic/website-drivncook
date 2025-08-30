

import DataList from '../common/DataList';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const EditReviewForm = ({ item, onClose, onSave }) => {
  const { t } = useTranslation();
  const [form, setForm] = useState({ ...item });
  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSave && onSave(form);
    onClose();
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="field">
        <label className="label has-text-white">{t('Note')}</label>
        <div className="control">
          <input className="input" name="rating" type="number" min="1" max="5" value={form.rating} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <div className="field">
        <label className="label has-text-white">{t('Message')}</label>
        <div className="control">
          <input className="input" name="message" value={form.message} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
        </div>
      </div>
      <button className="button is-success" type="submit">{t('Enregistrer')}</button>
    </form>
  );
};

const columns = ['user', 'rating', 'message', 'createdAt'];

function ReviewsAdmin() {
  const { t } = useTranslation();
  const [reviews, setReviews] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const [r, u] = await Promise.all([
          fetch(`${process.env.REACT_APP_API_URL}/reviews`).then(res => res.json()),
          fetch(`${process.env.REACT_APP_API_URL}/users`).then(res => res.json())
        ]);
        setReviews(r);
        setUsers(u);
      } catch (err) {
        setError(t('Erreur lors du chargement'));
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [t]);

  const getUser = id => users.find(u => u._id === (id?._id || id)) || {};

  // Adapter les données pour DataList
  const data = reviews.map(r => {
    const u = getUser(r.userId);
    return {
      ...r,
      user: (u.prenom || '') + ' ' + (u.nom || ''),
      rating: '★'.repeat(r.rating) + '☆'.repeat(5 - r.rating),
      createdAt: new Date(r.createdAt).toLocaleString(),
    };
  });

  const handleDelete = async (review) => {
    if (!window.confirm(t('Supprimer cet avis ?'))) return;
    try {
      await fetch(`${process.env.REACT_APP_API_URL}/reviews/${review._id}`, { method: 'DELETE' });
      setReviews(reviews.filter(r => r._id !== review._id));
    } catch {
      alert(t('Erreur lors de la suppression'));
    }
  };

  const handleSave = async (updatedReview) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/reviews/${updatedReview._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: updatedReview.message, rating: updatedReview.rating })
      });
      if (!res.ok) throw new Error();
      const updated = await res.json();
      setReviews(reviews.map(r => r._id === updated._id ? updated : r));
    } catch {
      alert(t('Erreur lors de la modification'));
    }
  };

  if (loading) return <div className="has-text-white">{t('Chargement des avis...')}</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

    return (
      <div style={{ maxWidth: 1100, margin: '32px auto', padding: '24px 24px 32px 24px', borderRadius: 18, background: 'rgba(0,0,0,0.01)' }}>
        <h2 className="title has-text-white">{t('Gestion des avis')}</h2>
        <DataList
          columns={columns.map(col =>
            col === 'user' ? t('Utilisateur') :
            col === 'rating' ? t('Note') :
            col === 'message' ? t('Message') :
            col === 'createdAt' ? t('Date') : col
          )}
          data={data}
          EditForm={props => <EditReviewForm {...props} onSave={handleSave} />}
          onDelete={handleDelete}
          title={t('Liste des avis')}
        />
      </div>
    );
}

export default ReviewsAdmin;

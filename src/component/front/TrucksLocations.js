import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrucksLocations = () => {
  const [trucks, setTrucks] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/trucks`)
      .then(res => res.json())
      .then(data => { setTrucks(data); setLoading(false); });
  }, []);

  const filtered = trucks.filter(t =>
    (!search ||
      (t.city && t.city.toLowerCase().includes(search.toLowerCase())) ||
      (t.address && t.address.toLowerCase().includes(search.toLowerCase())) ||
      (t.plate && t.plate.toLowerCase().includes(search.toLowerCase()))
    )
  );

  return (
    <section className="section" style={{ background: '#181a20', minHeight: '100vh' }}>
      <div className="container" style={{ maxWidth: 900, margin: '2rem auto' }}>
        <h2 className="title has-text-white">Emplacements des Food Trucks</h2>
        <input
          className="input mb-4"
          style={{ maxWidth: 400 }}
          placeholder="Rechercher par ville, adresse ou plaque..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <div className="has-text-white">Chargement...</div>
        ) : (
          <div className="columns is-multiline">
            {filtered.length === 0 && (
              <div className="has-text-white ml-3">Aucun food truck trouvé.</div>
            )}
            {filtered.map(truck => (
              <div className="column is-half" key={truck._id}>
                <div
                  className="box truck-card"
                  style={{ background: '#23272f', borderRadius: 12, minHeight: 120, cursor: 'pointer', transition: 'transform 0.15s, box-shadow 0.15s' }}
                  onClick={() => navigate(`/trucks/${truck._id}`)}
                  onKeyDown={e => { if (e.key === 'Enter') navigate(`/trucks/${truck._id}`); }}
                  tabIndex={0}
                  aria-label={`Voir le food truck ${truck.plate}`}
                >
                  <h3 className="subtitle has-text-white">{truck.plate} <span className="tag is-info is-light ml-2">{truck.city || '-'}</span></h3>
                  <p className="has-text-white"><b>Adresse :</b> {truck.address || '-'}</p>
                  <p className="has-text-white"><b>Horaires :</b> {truck.schedule || '-'}</p>
                  <p className="has-text-white"><b>Status :</b> {truck.status || '-'}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};


// Ajout d'un style d'hover global pour les cards
const style = document.createElement('style');
style.innerHTML = `
.truck-card:hover, .truck-card:focus {
  transform: translateY(-4px) scale(1.03);
  box-shadow: 0 6px 24px 0 #0006;
  border: 1.5px solid #00d1b2;
}
`;
document.head.appendChild(style);

export default TrucksLocations;

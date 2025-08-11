import React from 'react';

const UserProfile = () => (
  <section className="section">
    <div className="box">
      <h2 className="title is-4">Mon profil</h2>
      <div className="field">
        <label className="label">Nom</label>
        <div className="control">
          <input className="input" type="text" value="Admin Driv'n Cook" readOnly />
        </div>
      </div>
      <div className="field">
        <label className="label">Email</label>
        <div className="control">
          <input className="input" type="email" value="admin@drivncook.com" readOnly />
        </div>
      </div>
    </div>
  </section>
);

export default UserProfile;

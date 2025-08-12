import React, { useState } from 'react';
import Modal from './Modal';

const DataList = ({ columns, data, EditForm, onDelete, title }) => {
  const [search, setSearch] = useState('');
  const [sortCol, setSortCol] = useState(null);
  const [sortAsc, setSortAsc] = useState(true);
  const [editItem, setEditItem] = useState(null);

  const handleSort = col => {
    if (sortCol === col) {
      setSortAsc(!sortAsc);
    } else {
      setSortCol(col);
      setSortAsc(true);
    }
  };

  const filtered = data.filter(row =>
    columns.some(col =>
      String(row[col]).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortCol) return 0;
    if (a[sortCol] < b[sortCol]) return sortAsc ? -1 : 1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <div className="box" style={{ borderRadius: 18, background: '#23272f' }}>
      {title && <h2 className="title has-text-white">{title}</h2>}
      <div className="field mb-4">
        <div className="control has-icons-left">
          <input
            className="input"
            type="text"
            placeholder="Rechercher..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ borderRadius: 12, background: '#181a20', color: '#fff', border: 'none' }}
          />
          <span className="icon is-left">
            <i className="fas fa-search"></i>
          </span>
        </div>
      </div>
      <div style={{ overflowX: 'auto' }}>
        <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
          <thead>
            <tr>
              <th></th>
              {columns.map(col => (
                <th
                  key={col}
                  style={{ cursor: 'pointer', userSelect: 'none', color: '#fff' }}
                  onClick={() => handleSort(col)}
                >
                  {col}
                  {sortCol === col && (
                    <span style={{ marginLeft: 4 }}>
                      {sortAsc ? ' ▲' : ' ▼'}
                    </span>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, idx) => (
              <tr key={row.id || idx}>
                <td style={{ minWidth: 70 }}>
                  <button
                    className="button is-small mr-2"
                    style={{ background: '#3ec1ef', border: 'none', marginRight: 8, borderRadius: 6, padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => setEditItem(row)}
                  >
                    <span className="icon is-small" style={{ color: '#fff' }}>
                      <i className="fas fa-pen"></i>
                    </span>
                  </button>
                  <button
                    className="button is-small"
                    style={{ background: '#ff5e7e', border: 'none', borderRadius: 6, padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                    onClick={() => onDelete && onDelete(row)}
                  >
                    <span className="icon is-small" style={{ color: '#fff' }}>
                      <i className="fas fa-trash"></i>
                    </span>
                  </button>
                </td>
                {columns.map(col => (
                  <td key={col} style={{ color: '#fff' }}>{row[col]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal isActive={!!editItem} title="Modifier" onClose={() => setEditItem(null)}>
        {editItem && EditForm && (
          <EditForm item={editItem} onClose={() => setEditItem(null)} />
        )}
      </Modal>
    </div>
  );
};

export default DataList;

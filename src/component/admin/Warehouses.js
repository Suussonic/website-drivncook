import React, { useEffect, useState } from 'react';

// Formulaire d'édition/création d'entrepôt
function EditWarehouseForm({ item, onClose, onSave }) {
  const [form, setForm] = useState({
    name: item?.name || '',
    location: item?.location || '',
    stock: item?.stock || []
  });
  const [menus, setMenus] = useState([]);
  useEffect(() => {
    console.log('EditWarehouseForm mount/item:', item);
  }, [item]);
  // Synchronise le formulaire avec l'entrepôt à éditer
  useEffect(() => {
    if (item && menus.length > 0) {
      // Fusionne le stock existant avec tous les menus
      const stockMap = {};
      (item.stock || []).forEach(s => { stockMap[s.menuId] = s.quantity; });
      const fullStock = menus.map(m => ({ menuId: m._id, quantity: stockMap[m._id] ?? 0 }));
      setForm({
        name: item.name || '',
        location: item.location || '',
        stock: fullStock
      });
    }
  }, [item, menus]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/menus`)
      .then(res => res.json())
      .then(setMenus)
      .catch(() => setMenus([]));
  }, []);

  useEffect(() => {
    if (!item?._id && menus.length > 0) {
      setForm(f => ({
        ...f,
        stock: menus.map(m => ({ menuId: m._id, quantity: 0 }))
      }));
    }
  }, [menus, item]);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    console.log('handleChange', e.target.name, e.target.value, form);
  };

  const handleStockChange = (menuId, value) => {
    setForm(f => {
      const updated = {
        ...f,
        stock: f.stock.map(s => s.menuId === menuId ? { ...s, quantity: value } : s)
      };
      console.log('handleStockChange', menuId, value, updated);
      return updated;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const stock = form.stock.filter(s => s.quantity > 0).map(s => ({ menuId: s.menuId, quantity: s.quantity }));
    console.log('handleSubmit', { _id: item?._id, name: form.name, location: form.location, stock });
    onSave && onSave({ _id: item?._id, name: form.name, location: form.location, stock });
    onClose();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <div className="field">
          <label className="label has-text-white">Nom</label>
          <div className="control">
            <input className="input" name="name" value={form.name} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
        </div>
        <div className="field">
          <label className="label has-text-white">Localisation</label>
          <div className="control">
            <input className="input" name="location" value={form.location} onChange={handleChange} style={{ background: '#181a20', color: '#fff', border: 'none' }} />
          </div>
        </div>
        <div className="field">
          <label className="label has-text-white">Stock par menu</label>
          {menus.map(menu => {
            const stockItem = form.stock.find(s => s.menuId === menu._id) || { menuId: menu._id, quantity: 0 };
            console.log('render stock input', menu.name, stockItem);
            return (
              <div key={menu._id} className="is-flex mb-2" style={{ gap: 8, alignItems: 'center' }}>
                <span style={{ minWidth: 120, color: '#fff' }}>{menu.name}</span>
                <input
                  className="input is-small"
                  type="number"
                  min="0"
                  name={`quantity_${menu._id}`}
                  placeholder="Quantité"
                  value={stockItem.quantity}
                  onChange={e => handleStockChange(menu._id, Number(e.target.value))}
                  style={{ width: 90, background: '#181a20', color: '#fff', border: 'none' }}
                />
              </div>
            );
          })}
        </div>
        <button className="button is-success mt-3" type="submit">Enregistrer</button>
      </div>
    </form>
  );
}

// Liste personnalisée des entrepôts
function WarehouseList({ warehouses, menusUrl, onEdit, onDelete, EditForm }) {
  const [menus, setMenus] = useState([]);
  const [editItem, setEditItem] = useState(null);
  useEffect(() => {
    fetch(menusUrl)
      .then(res => res.json())
      .then(setMenus)
      .catch(() => setMenus([]));
  }, [menusUrl]);

  const menuMap = Object.fromEntries(menus.map(m => [m._id, m.name]));

  return (
    <div className="box" style={{ borderRadius: 18, background: '#23272f' }}>
      <table className="table is-fullwidth is-hoverable" style={{ background: '#23272f', color: '#fff', borderRadius: 12 }}>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Localisation</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {warehouses.map(w => (
            <tr key={w._id}>
              <td>{w.name}</td>
              <td>{w.location}</td>
              <td>
                {Array.isArray(w.stock) && w.stock.length > 0
                  ? w.stock.map(s => (
                      <div key={s.menuId}>
                        {menuMap[s.menuId] || s.menuId}: {s.quantity}
                      </div>
                    ))
                  : '—'}
              </td>
              <td>
                <button
                  className="button is-small mr-2"
                  style={{ background: '#3ec1ef', border: 'none', marginRight: 8, borderRadius: 6, padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => setEditItem(w)}
                >
                  <span className="icon is-small" style={{ color: '#fff' }}>
                    <i className="fas fa-pen"></i>
                  </span>
                </button>
                <button
                  className="button is-small"
                  style={{ background: '#ff5e7e', border: 'none', borderRadius: 6, padding: 0, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  onClick={() => onDelete && onDelete(w)}
                >
                  <span className="icon is-small" style={{ color: '#fff' }}>
                    <i className="fas fa-trash"></i>
                  </span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editItem && EditForm && (
        <div className="modal is-active">
          <div className="modal-background" onClick={() => setEditItem(null)}></div>
          <div className="modal-content">
            <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
              <EditForm item={editItem} onClose={() => setEditItem(null)} />
            </div>
          </div>
          <button className="modal-close is-large" aria-label="close" onClick={() => setEditItem(null)}></button>
        </div>
      )}
    </div>
  );
}
// ...existing code...

  // Composant principal
  export default function Warehouses() {
    const [warehouses, setWarehouses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCreate, setShowCreate] = useState(false);

    const handleCreate = async (newWarehouse) => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/warehouses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newWarehouse)
        });
        if (!res.ok) throw new Error();
        const created = await res.json();
        setWarehouses([...warehouses, created]);
      } catch (err) {
        setError('Erreur lors de la création');
      }
    };

    useEffect(() => {
      const fetchWarehouses = async () => {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/warehouses`);
          if (!response.ok) throw new Error('Erreur lors du chargement des entrepôts');
          const data = await response.json();
          setWarehouses(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchWarehouses();
    }, []);

    const handleDelete = async (warehouse) => {
      try {
        await fetch(`${process.env.REACT_APP_API_URL}/warehouses/${warehouse._id}`, { method: 'DELETE' });
        setWarehouses(warehouses.filter(w => w._id !== warehouse._id));
      } catch (err) {
        setError('Erreur lors de la suppression');
      }
    };

    const handleSave = async (updatedWarehouse) => {
      try {
        const warehouseId = updatedWarehouse._id;
        const res = await fetch(`${process.env.REACT_APP_API_URL}/warehouses/${warehouseId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...updatedWarehouse, _id: warehouseId })
        });
        if (!res.ok) throw new Error();
        const saved = await res.json();
        setWarehouses(warehouses.map(w => w._id === warehouseId ? saved : w));
      } catch (err) {
        setError('Erreur lors de la modification');
      }
    };

    if (loading) return <div className="has-text-white">Chargement des entrepôts...</div>;

  if (loading) return <div className="has-text-white">Chargement des entrepôts...</div>;
  if (error) return <div className="has-text-danger">{error}</div>;

  return (
    <div style={{ maxWidth: 1100, margin: '32px auto', padding: '24px 24px 32px 24px', borderRadius: 18, background: 'rgba(0,0,0,0.01)' }}>
      <h2 className="title has-text-white">Gestion des entrepôts</h2>
      <button className="button is-primary mb-4" onClick={() => setShowCreate(true)}>Créer un entrepôt</button>
      {showCreate && (
        <div className="box" style={{ background: '#23272f', borderRadius: 12 }}>
          <EditWarehouseForm
            item={{}}
            onSave={async (data) => { await handleCreate(data); setShowCreate(false); }}
            onClose={() => setShowCreate(false)}
          />
        </div>
      )}
      <WarehouseList
        warehouses={warehouses}
        menusUrl={`${process.env.REACT_APP_API_URL}/menus`}
        onEdit={handleSave}
        onDelete={handleDelete}
        EditForm={props => <EditWarehouseForm {...props} onSave={data => handleSave({ ...props.item, ...data })} />}
      />
    </div>
  );
}

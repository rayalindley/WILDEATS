import { useState, useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import adminService from "../services/adminService";
import authService from "../services/authService";
import "../styles/AdminPanel.css";

const EMPTY_SHOP = {
  name: "", cuisine: "", description: "", emoji: "🍽️",
  rating: 0, reviewCount: 0, deliveryTime: "", isOpen: true,
  tag: "", priceRange: "", category: "", location: "",
};

const EMPTY_ITEM = {
  name: "", price: "", image: "", description: "", emoji: "🍽️", shopId: "",
};

export default function AdminPanel() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("shops");
  const [shops, setShops] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // add | edit
  const [shopForm, setShopForm] = useState({ ...EMPTY_SHOP });
  const [itemForm, setItemForm] = useState({ ...EMPTY_ITEM });
  const [editId, setEditId] = useState(null);
  const [saving, setSaving] = useState(false);

  // Delete confirm
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Filters
  const [search, setSearch] = useState("");
  const [shopFilter, setShopFilter] = useState("all");

  // Auth check
  useEffect(() => {
    const user = authService.getCurrentUser();
    if (!user || user.role !== "ADMIN") {
      navigate("/login");
    }
  }, [navigate]);

  // Load data
  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [s, m] = await Promise.all([
        adminService.getAllShops(),
        adminService.getAllMenuItems(),
      ]);
      setShops(s);
      setMenuItems(m);
    } catch (err) {
      console.error("Failed to load data:", err);
      showToast("Failed to load data ❌");
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  // ==================== SHOPS ====================
  const filteredShops = useMemo(() => {
    return shops.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.cuisine?.toLowerCase().includes(search.toLowerCase())
    );
  }, [shops, search]);

  const openAddShop = () => {
    setShopForm({ ...EMPTY_SHOP });
    setModalMode("add");
    setEditId(null);
    setShowModal(true);
  };

  const openEditShop = (shop) => {
    setShopForm({ ...shop });
    setModalMode("edit");
    setEditId(shop.id);
    setShowModal(true);
  };

  const handleSaveShop = async () => {
    if (!shopForm.name.trim()) return;
    setSaving(true);
    try {
      if (modalMode === "add") {
        const created = await adminService.createShop(shopForm);
        setShops(prev => [...prev, created]);
        showToast(`${created.name} added! 🎉`);
      } else {
        const updated = await adminService.updateShop(editId, shopForm);
        setShops(prev => prev.map(s => s.id === editId ? updated : s));
        showToast(`${updated.name} updated! ✏️`);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Save shop error:", err);
      showToast("Failed to save shop ❌");
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteShop = (shop) => {
    setDeleteTarget({ type: "shop", id: shop.id, name: shop.name });
  };

  const handleDeleteShop = async () => {
    try {
      await adminService.deleteShop(deleteTarget.id);
      setShops(prev => prev.filter(s => s.id !== deleteTarget.id));
      setMenuItems(prev => prev.filter(m => m.shopId !== deleteTarget.id));
      showToast(`${deleteTarget.name} deleted 🗑️`);
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete ❌");
    }
    setDeleteTarget(null);
  };

  // ==================== MENU ITEMS ====================
  const filteredItems = useMemo(() => {
    return menuItems.filter(m => {
      const ms = m.name.toLowerCase().includes(search.toLowerCase());
      const sf = shopFilter === "all" || m.shopId === Number(shopFilter);
      return ms && sf;
    });
  }, [menuItems, search, shopFilter]);

  const openAddItem = () => {
    setItemForm({ ...EMPTY_ITEM, shopId: shops[0]?.id || "" });
    setModalMode("add");
    setEditId(null);
    setShowModal(true);
  };

  const openEditItem = (item) => {
    setItemForm({ ...item, price: item.price?.toString() || "" });
    setModalMode("edit");
    setEditId(item.id);
    setShowModal(true);
  };

  const handleSaveItem = async () => {
    if (!itemForm.name.trim() || !itemForm.shopId) return;
    setSaving(true);
    try {
      const payload = { ...itemForm, price: parseFloat(itemForm.price) || 0 };
      if (modalMode === "add") {
        const created = await adminService.createMenuItem(payload);
        setMenuItems(prev => [...prev, created]);
        showToast(`${created.name} added! 🎉`);
      } else {
        const updated = await adminService.updateMenuItem(editId, payload);
        setMenuItems(prev => prev.map(m => m.id === editId ? updated : m));
        showToast(`${updated.name} updated! ✏️`);
      }
      setShowModal(false);
    } catch (err) {
      console.error("Save item error:", err);
      showToast("Failed to save item ❌");
    } finally {
      setSaving(false);
    }
  };

  const confirmDeleteItem = (item) => {
    setDeleteTarget({ type: "item", id: item.id, name: item.name });
  };

  const handleDeleteItem = async () => {
    try {
      await adminService.deleteMenuItem(deleteTarget.id);
      setMenuItems(prev => prev.filter(m => m.id !== deleteTarget.id));
      showToast(`${deleteTarget.name} deleted 🗑️`);
    } catch (err) {
      console.error("Delete error:", err);
      showToast("Failed to delete ❌");
    }
    setDeleteTarget(null);
  };

  const getShopName = (shopId) => shops.find(s => s.id === shopId)?.name || "—";

  // ==================== STATS ====================
  const openCount = shops.filter(s => s.isOpen).length;
  const closedCount = shops.filter(s => !s.isOpen).length;

  if (loading) {
    return (
      <div className="admin-page">
        <div className="admin-header">
          <div className="admin-header-inner">
            <div className="admin-header-left">
              <div className="admin-logo">⚙️</div>
              <div className="admin-header-text">
                <h1>Admin Panel</h1>
                <p>Loading...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="admin-loading">
          <div className="admin-spinner" />
          Loading data...
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      {/* HEADER */}
      <div className="admin-header">
        <div className="admin-header-inner">
          <div className="admin-header-left">
            <div className="admin-logo">⚙️</div>
            <div className="admin-header-text">
              <h1>Admin Panel</h1>
              <p>Manage shops, menus, and more</p>
            </div>
          </div>
          <div className="admin-header-actions">
            <Link to="/browse-shop" className="admin-back-btn">
              ← Back to Site
            </Link>
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="admin-tabs">
        <div className="admin-tabs-inner">
          <button className={`admin-tab${tab === "shops" ? " active" : ""}`} onClick={() => { setTab("shops"); setSearch(""); }}>
            🏪 Shops ({shops.length})
          </button>
          <button className={`admin-tab${tab === "menus" ? " active" : ""}`} onClick={() => { setTab("menus"); setSearch(""); }}>
            🍽️ Menu Items ({menuItems.length})
          </button>
        </div>
      </div>

      <div className="admin-body">
        {/* STATS */}
        <div className="admin-stats">
          <div className="stat-card">
            <div className="stat-icon shops">🏪</div>
            <div>
              <div className="stat-value">{shops.length}</div>
              <div className="stat-label">Total Shops</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon items">🍽️</div>
            <div>
              <div className="stat-value">{menuItems.length}</div>
              <div className="stat-label">Menu Items</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon open">✅</div>
            <div>
              <div className="stat-value">{openCount}</div>
              <div className="stat-label">Open Now</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon closed">⛔</div>
            <div>
              <div className="stat-value">{closedCount}</div>
              <div className="stat-label">Closed</div>
            </div>
          </div>
        </div>

        {/* ==================== SHOPS TAB ==================== */}
        {tab === "shops" && (
          <>
            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <div className="admin-search-wrap">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    className="admin-search"
                    placeholder="Search shops..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
              </div>
              <button className="add-btn" onClick={openAddShop}>+ Add Shop</button>
            </div>

            {filteredShops.length === 0 ? (
              <div className="admin-table-wrap">
                <div className="admin-empty">
                  <div className="admin-empty-icon">🏪</div>
                  <h3>No shops found</h3>
                  <p>Add your first shop to get started.</p>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Shop</th>
                      <th>Category</th>
                      <th>Location</th>
                      <th>Status</th>
                      <th>Rating</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredShops.map(shop => (
                      <tr key={shop.id}>
                        <td>
                          <div className="cell-name">
                            <span className="cell-emoji">{shop.emoji}</span>
                            <div>
                              <div>{shop.name}</div>
                              <div style={{ fontSize: ".73rem", color: "rgba(255,255,255,.4)", fontWeight: 400 }}>{shop.cuisine}</div>
                            </div>
                          </div>
                        </td>
                        <td><span className="cell-badge badge-category">{shop.category}</span></td>
                        <td>{shop.location}</td>
                        <td>
                          <span className={`cell-badge ${shop.isOpen ? "badge-open" : "badge-closed"}`}>
                            {shop.isOpen ? "Open" : "Closed"}
                          </span>
                        </td>
                        <td>⭐ {shop.rating}</td>
                        <td>
                          <div className="action-btns">
                            <button className="act-btn" onClick={() => openEditShop(shop)}>✏️ Edit</button>
                            <button className="act-btn delete" onClick={() => confirmDeleteShop(shop)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}

        {/* ==================== MENU ITEMS TAB ==================== */}
        {tab === "menus" && (
          <>
            <div className="admin-toolbar">
              <div className="admin-toolbar-left">
                <div className="admin-search-wrap">
                  <span className="admin-search-icon">🔍</span>
                  <input
                    className="admin-search"
                    placeholder="Search menu items..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                  />
                </div>
                <select
                  className="filter-select"
                  value={shopFilter}
                  onChange={e => setShopFilter(e.target.value)}
                >
                  <option value="all">All Shops</option>
                  {shops.map(s => (
                    <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
                  ))}
                </select>
              </div>
              <button className="add-btn" onClick={openAddItem}>+ Add Menu Item</button>
            </div>

            {filteredItems.length === 0 ? (
              <div className="admin-table-wrap">
                <div className="admin-empty">
                  <div className="admin-empty-icon">🍽️</div>
                  <h3>No menu items found</h3>
                  <p>Add menu items to your shops.</p>
                </div>
              </div>
            ) : (
              <div className="admin-table-wrap">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Shop</th>
                      <th>Price</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredItems.map(item => (
                      <tr key={item.id}>
                        <td>
                          <div className="cell-name">
                            <span className="cell-emoji">{item.emoji || "🍽️"}</span>
                            {item.name}
                          </div>
                        </td>
                        <td>{getShopName(item.shopId)}</td>
                        <td><span className="cell-price">₱{item.price}</span></td>
                        <td style={{ maxWidth: 250, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {item.description || "—"}
                        </td>
                        <td>
                          <div className="action-btns">
                            <button className="act-btn" onClick={() => openEditItem(item)}>✏️ Edit</button>
                            <button className="act-btn delete" onClick={() => confirmDeleteItem(item)}>🗑️</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {/* ==================== SHOP MODAL ==================== */}
      {showModal && tab === "shops" && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{modalMode === "add" ? "Add New Shop" : "Edit Shop"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Shop Name *</label>
                  <input value={shopForm.name} onChange={e => setShopForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. The Canteen" />
                </div>
                <div className="form-field">
                  <label>Emoji</label>
                  <input value={shopForm.emoji} onChange={e => setShopForm(p => ({ ...p, emoji: e.target.value }))} placeholder="🍱" />
                </div>
              </div>
              <div className="form-field">
                <label>Cuisine</label>
                <input value={shopForm.cuisine} onChange={e => setShopForm(p => ({ ...p, cuisine: e.target.value }))} placeholder="e.g. Rice Meals · All-Day" />
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea value={shopForm.description} onChange={e => setShopForm(p => ({ ...p, description: e.target.value }))} placeholder="Short description of the shop..." />
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Category</label>
                  <input value={shopForm.category} onChange={e => setShopForm(p => ({ ...p, category: e.target.value }))} placeholder="e.g. Rice Meals" />
                </div>
                <div className="form-field">
                  <label>Location</label>
                  <input value={shopForm.location} onChange={e => setShopForm(p => ({ ...p, location: e.target.value }))} placeholder="e.g. Building A, G/F" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Tag</label>
                  <input value={shopForm.tag} onChange={e => setShopForm(p => ({ ...p, tag: e.target.value }))} placeholder="e.g. Best Seller" />
                </div>
                <div className="form-field">
                  <label>Price Range</label>
                  <input value={shopForm.priceRange} onChange={e => setShopForm(p => ({ ...p, priceRange: e.target.value }))} placeholder="₱40–₱120" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Delivery Time</label>
                  <input value={shopForm.deliveryTime} onChange={e => setShopForm(p => ({ ...p, deliveryTime: e.target.value }))} placeholder="10–15 min" />
                </div>
                <div className="form-field">
                  <label>Rating</label>
                  <input type="number" step="0.1" min="0" max="5" value={shopForm.rating} onChange={e => setShopForm(p => ({ ...p, rating: parseFloat(e.target.value) || 0 }))} />
                </div>
              </div>
              <div className="toggle-field">
                <button
                  type="button"
                  className={`toggle-switch${shopForm.isOpen ? " on" : ""}`}
                  onClick={() => setShopForm(p => ({ ...p, isOpen: !p.isOpen }))}
                >
                  <div className="toggle-dot" />
                </button>
                <span className="toggle-label">{shopForm.isOpen ? "Open" : "Closed"}</span>
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-save" onClick={handleSaveShop} disabled={!shopForm.name.trim() || saving}>
                  {saving ? "Saving..." : modalMode === "add" ? "Add Shop" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== MENU ITEM MODAL ==================== */}
      {showModal && tab === "menus" && (
        <div className="admin-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()}>
            <div className="modal-head">
              <h2>{modalMode === "add" ? "Add Menu Item" : "Edit Menu Item"}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <div className="modal-form">
              <div className="form-row">
                <div className="form-field">
                  <label>Item Name *</label>
                  <input value={itemForm.name} onChange={e => setItemForm(p => ({ ...p, name: e.target.value }))} placeholder="e.g. Chicken Adobo" />
                </div>
                <div className="form-field">
                  <label>Emoji</label>
                  <input value={itemForm.emoji} onChange={e => setItemForm(p => ({ ...p, emoji: e.target.value }))} placeholder="🍗" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-field">
                  <label>Price (₱) *</label>
                  <input type="number" value={itemForm.price} onChange={e => setItemForm(p => ({ ...p, price: e.target.value }))} placeholder="120" />
                </div>
                <div className="form-field">
                  <label>Shop *</label>
                  <select value={itemForm.shopId} onChange={e => setItemForm(p => ({ ...p, shopId: Number(e.target.value) }))}>
                    <option value="">Select shop...</option>
                    {shops.map(s => (
                      <option key={s.id} value={s.id}>{s.emoji} {s.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-field">
                <label>Description</label>
                <textarea value={itemForm.description} onChange={e => setItemForm(p => ({ ...p, description: e.target.value }))} placeholder="Short description of the item..." />
              </div>
              <div className="form-field">
                <label>Image Path</label>
                <input value={itemForm.image} onChange={e => setItemForm(p => ({ ...p, image: e.target.value }))} placeholder="/assets/adobo.jpg" />
              </div>
              <div className="modal-actions">
                <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn-save" onClick={handleSaveItem} disabled={!itemForm.name.trim() || !itemForm.shopId || saving}>
                  {saving ? "Saving..." : modalMode === "add" ? "Add Item" : "Save Changes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================== DELETE CONFIRM ==================== */}
      {deleteTarget && (
        <div className="admin-modal-overlay" onClick={() => setDeleteTarget(null)}>
          <div className="admin-modal" onClick={e => e.stopPropagation()} style={{ maxWidth: 420 }}>
            <div className="modal-head">
              <h2>Confirm Delete</h2>
              <button className="modal-close" onClick={() => setDeleteTarget(null)}>✕</button>
            </div>
            <div className="confirm-body">
              <div className="confirm-icon">⚠️</div>
              <p>Are you sure you want to delete</p>
              <p className="confirm-name">"{deleteTarget.name}"?</p>
              {deleteTarget.type === "shop" && (
                <p style={{ fontSize: ".78rem", color: "rgba(255,255,255,.35)", marginTop: 8 }}>
                  This will also delete all menu items for this shop.
                </p>
              )}
            </div>
            <div className="confirm-actions">
              <button className="btn-cancel" onClick={() => setDeleteTarget(null)}>Cancel</button>
              <button
                className="btn-delete-confirm"
                onClick={deleteTarget.type === "shop" ? handleDeleteShop : handleDeleteItem}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOAST */}
      {toast && <div className="admin-toast">{toast}</div>}
    </div>
  );
}

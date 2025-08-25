import React, { useEffect, useMemo, useState } from 'react'
import { fetchPlants, fetchCategories, addPlant } from './api'
import PlantCard from './PlantCard'

function Spinner() {
  return <div className="spinner" aria-label="loading" />
}

function Toast({ message, onClose }) {
  useEffect(() => {
    const id = setTimeout(onClose, 2200)
    return () => clearTimeout(id)
  }, [onClose])
  return <div className="toast">{message}</div>
}

export default function App() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [stock, setStock] = useState('') // yes | no | ''
  const [plants, setPlants] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [toast, setToast] = useState('')

  // Admin form state
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [categoriesInput, setCategoriesInput] = useState('') // comma-separated
  const [inStock, setInStock] = useState(true)
  const [formErrors, setFormErrors] = useState({})

  async function loadCategories() {
    try {
      const data = await fetchCategories()
      setCategories(data.categories || [])
    } catch (e) {
      console.error(e)
    }
  }

  const query = useMemo(() => ({ search, category, inStock: stock }), [search, category, stock])

  async function loadPlants() {
    setLoading(true); setError('')
    try {
      const data = await fetchPlants(query)
      setPlants(data.plants || [])
    } catch (e) {
      setError(e.message || 'Failed to load plants')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadCategories() }, [])
  useEffect(() => { loadPlants() }, [search, category, stock])

  function validateForm() {
    const errs = {}
    if (!name.trim()) errs.name = 'Name is required'
    const p = Number(price)
    if (Number.isNaN(p) || p < 0) errs.price = 'Enter a valid price'
    if (!categoriesInput.trim()) errs.categories = 'Enter at least one category'
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (!validateForm()) return
    try {
      const payload = {
        name: name.trim(),
        price: Number(price),
        categories: categoriesInput.split(',').map(c => c.trim()).filter(Boolean),
        inStock
      }
      await addPlant(payload)
      setToast('Plant added ✔')
      setName(''); setPrice(''); setCategoriesInput(''); setInStock(true)
      await loadPlants()
      await loadCategories()
    } catch (e) {
      setToast(e.message || 'Failed to add plant')
    }
  }

  return (
    <div className="container">
      <header className="header">
        <div className="brand">
          <div className="logo" />
          <h1>Urvann • Mini Plant Store</h1>
        </div>
        <div className="controls">
          <input
            className="input"
            placeholder="Search name or keyword (e.g. home decor)"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select className="select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Categories</option>
            {categories.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <select className="select" value={stock} onChange={e => setStock(e.target.value)}>
            <option value="">Stock: Any</option>
            <option value="yes">In Stock</option>
            <option value="no">Out of Stock</option>
          </select>
          <button className="button primary" onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})}>
            + Add Plant
          </button>
        </div>
      </header>

      <section className="section" aria-live="polite" aria-busy={loading}>
        {loading ? (
          <div style={{display:'flex', gap:10, alignItems:'center'}}><Spinner /><span>Loading plants…</span></div>
        ) : error ? (
          <div className="error-text">⚠ {error}</div>
        ) : plants.length === 0 ? (
          <div className="empty">No plants found. Try a different search/filter.</div>
        ) : (
          <div className="grid">
            {plants.map(p => <PlantCard key={p._id || p.name} plant={p} />)}
          </div>
        )}
      </section>

      <h2 style={{margin: '18px 0 8px'}}>Admin • Add Plant</h2>
      <section className="section">
        <form className="form" onSubmit={onSubmit}>
          <div className="full">
            <label>Name</label><br />
            <input className="input" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Money Plant" />
            {formErrors.name && <div className="error-text">{formErrors.name}</div>}
          </div>
          <div>
            <label>Price</label><br />
            <input className="input" value={price} onChange={e => setPrice(e.target.value)} placeholder="e.g. 349" />
            {formErrors.price && <div className="error-text">{formErrors.price}</div>}
          </div>
          <div>
            <label>Availability</label><br />
            <select className="select" value={inStock ? 'yes' : 'no'} onChange={e => setInStock(e.target.value === 'yes')}>
              <option value="yes">In Stock</option>
              <option value="no">Out of Stock</option>
            </select>
          </div>
          <div className="full">
            <label>Categories (comma-separated)</label><br />
            <input className="input" value={categoriesInput} onChange={e => setCategoriesInput(e.target.value)} placeholder="e.g. Indoor, Home Decor" />
            {formErrors.categories && <div className="error-text">{formErrors.categories}</div>}
          </div>
          <div className="full" style={{display:'flex', gap:8, justifyContent:'flex-end'}}>
            <button className="button" type="button" onClick={() => { setName(''); setPrice(''); setCategoriesInput(''); setInStock(true); setFormErrors({}); }}>Reset</button>
            <button className="button primary" type="submit">Add Plant</button>
          </div>
        </form>
      </section>

      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  )
}

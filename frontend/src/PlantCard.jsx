import React from 'react'

export default function PlantCard({ plant }) {
  return (
    <div className="card">
      <h3>{plant.name}</h3>
      <div className="price">₹ {plant.price.toFixed(0)}</div>
      <div className="badge-row">
        {plant.categories.map((c, idx) => (
          <span key={idx} className="badge">{c}</span>
        ))}
      </div>
      <hr className="hr" />
      <div className="badge-row">
        <span className={`badge ${plant.inStock ? 'success' : 'error'}`}>
          {plant.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
    </div>
  )
}

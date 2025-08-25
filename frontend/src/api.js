const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export async function fetchPlants({ search = '', category = '', inStock = '' } = {}) {
  const params = new URLSearchParams();
  if (search) params.set('search', search);
  if (category) params.set('category', category);
  if (inStock) params.set('inStock', inStock);
  const resp = await fetch(`${BASE_URL}/api/plants?${params.toString()}`);
  if (!resp.ok) throw new Error(`Failed to fetch plants: ${resp.status}`);
  return resp.json();
}

export async function fetchCategories() {
  const resp = await fetch(`${BASE_URL}/api/categories`);
  if (!resp.ok) throw new Error(`Failed to fetch categories: ${resp.status}`);
  return resp.json();
}

export async function addPlant(payload) {
  const resp = await fetch(`${BASE_URL}/api/plants`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });
  if (!resp.ok) {
    const data = await resp.json().catch(() => ({}));
    throw new Error(data.error || `Failed to add plant: ${resp.status}`);
  }
  return resp.json();
}

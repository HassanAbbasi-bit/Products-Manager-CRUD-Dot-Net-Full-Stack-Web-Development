// File: src/components/ProductList.js
import React from 'react';

function ProductList({ products, onEdit, onDelete, loading }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="mt-2 text-muted">Loading products...</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="alert alert-info text-center">
        📦 No products yet. Add your first product above!
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-dark text-white">
        <h5 className="mb-0">📋 Product List ({products.length} items)</h5>
      </div>
      <div className="table-responsive">
        <table className="table table-hover table-striped mb-0">
          <thead className="table-dark">
            <tr>
              <th>#ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td className="text-muted">#{product.id}</td>
                <td className="fw-bold">{product.name}</td>
                <td className="text-success">${product.price.toFixed(2)}</td>
                <td>
                  <span className={`badge ${product.quantity > 0 ? 'bg-success' : 'bg-danger'}`}>
                    {product.quantity}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => onEdit(product)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => onDelete(product.id)}
                  >
                    🗑️ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProductList;
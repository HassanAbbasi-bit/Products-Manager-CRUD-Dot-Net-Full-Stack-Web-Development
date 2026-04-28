// File: src/components/ProductForm.js
import React, { useState, useEffect } from 'react';

function ProductForm({ onSubmit, editingProduct, onCancel }) {
  const [form, setForm] = useState({
    name: '',
    price: '',
    quantity: ''
  });
  const [errors, setErrors] = useState({});

  // If we're editing, pre-fill the form
  useEffect(() => {
    if (editingProduct) {
      setForm({
        name: editingProduct.name,
        price: editingProduct.price,
        quantity: editingProduct.quantity
      });
    } else {
      setForm({ name: '', price: '', quantity: '' });
    }
  }, [editingProduct]);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required.';
    if (!form.price || isNaN(form.price) || Number(form.price) <= 0)
      newErrors.price = 'Price must be a positive number.';
    if (!form.quantity || isNaN(form.quantity) || Number(form.quantity) < 0)
      newErrors.quantity = 'Quantity must be 0 or more.';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error on change
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const product = {
      ...(editingProduct && { id: editingProduct.id }),
      name: form.name.trim(),
      price: parseFloat(form.price),
      quantity: parseInt(form.quantity)
    };

    onSubmit(product);
    setForm({ name: '', price: '', quantity: '' });
  };

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">{editingProduct ? '✏️ Edit Product' : '➕ Add New Product'}</h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>

          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Product Name</label>
            <input
              type="text"
              name="name"
              className={`form-control ${errors.name ? 'is-invalid' : ''}`}
              placeholder="e.g. Wireless Mouse"
              value={form.name}
              onChange={handleChange}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          {/* Price Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Price ($)</label>
            <input
              type="number"
              name="price"
              step="0.01"
              className={`form-control ${errors.price ? 'is-invalid' : ''}`}
              placeholder="e.g. 29.99"
              value={form.price}
              onChange={handleChange}
            />
            {errors.price && <div className="invalid-feedback">{errors.price}</div>}
          </div>

          {/* Quantity Field */}
          <div className="mb-3">
            <label className="form-label fw-bold">Quantity</label>
            <input
              type="number"
              name="quantity"
              className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
              placeholder="e.g. 100"
              value={form.quantity}
              onChange={handleChange}
            />
            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
          </div>

          {/* Buttons */}
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              {editingProduct ? '💾 Update Product' : '➕ Add Product'}
            </button>
            {editingProduct && (
              <button type="button" className="btn btn-secondary" onClick={onCancel}>
                Cancel
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}

export default ProductForm;
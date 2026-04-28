// File: src/App.js
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import productService from './services/productService';

function App() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState(null); // { type: 'success'|'danger', message: '' }

  // Load all products on page load
  useEffect(() => {
    fetchProducts();
  }, []);

  const showAlert = (type, message) => {
    setAlert({ type, message });
    setTimeout(() => setAlert(null), 3000); // Auto-hide after 3s
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await productService.getAll();
      setProducts(response.data);
    } catch (error) {
      showAlert('danger', '❌ Failed to load products. Is the API running?');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (product) => {
    try {
      if (editingProduct) {
        // UPDATE
        await productService.update(product.id, product);
        showAlert('success', `✅ "${product.name}" updated successfully!`);
        setEditingProduct(null);
      } else {
        // CREATE
        await productService.create(product);
        showAlert('success', `✅ "${product.name}" added successfully!`);
      }
      fetchProducts();
    } catch (error) {
      showAlert('danger', '❌ Operation failed. Please try again.');
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to form
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      await productService.remove(id);
      showAlert('success', '✅ Product deleted successfully!');
      fetchProducts();
    } catch (error) {
      showAlert('danger', '❌ Failed to delete product.');
    }
  };

  const handleCancel = () => {
    setEditingProduct(null);
  };

  return (
    <div className="bg-light min-vh-100 py-4">
      <div className="container" style={{ maxWidth: '860px' }}>

        {/* Header */}
        <div className="text-center mb-4">
          <h1 className="display-5 fw-bold text-primary">🛒 Products Manager</h1>
          <p className="text-muted">Full-Stack CRUD App · ASP.NET Core + React</p>
          <hr />
        </div>

        {/* Alert Banner */}
        {alert && (
          <div className={`alert alert-${alert.type} alert-dismissible`} role="alert">
            {alert.message}
            <button type="button" className="btn-close" onClick={() => setAlert(null)} />
          </div>
        )}

        {/* Form (Add or Edit) */}
        <ProductForm
          onSubmit={handleSubmit}
          editingProduct={editingProduct}
          onCancel={handleCancel}
        />

        {/* Product Table */}
        <ProductList
          products={products}
          onEdit={handleEdit}
          onDelete={handleDelete}
          loading={loading}
        />

        {/* Footer */}
        <div className="text-center mt-4 text-muted small">
          Built with ❤️ using ASP.NET Core + React + Bootstrap
        </div>

      </div>
    </div>
  );
}

export default App;
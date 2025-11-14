import { useState } from 'react';
import itemService from '../services/itemService';
import ItemForm from './ItemForm';

const ItemList = ({ items, pagination, onRefresh, onPageChange, userRole }) => {
  const [editingItem, setEditingItem] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) {
      return;
    }

    try {
      setLoading(true);
      await itemService.deleteItem(id);
      onRefresh();
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to delete item');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  const handleFormSubmit = async (data) => {
    try {
      setLoading(true);
      if (editingItem) {
        await itemService.updateItem(editingItem._id, data);
      } else {
        await itemService.createItem(data);
      }
      setShowForm(false);
      setEditingItem(null);
      onRefresh();
    } catch (error) {
      console.error('Error saving item:', error);
      const errorMessage = 
        error.response?.data?.message || 
        error.response?.data?.errors?.join(', ') ||
        error.message ||
        'Failed to save item. Please check your connection and try again.';
      alert(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingItem(null);
  };

  if (showForm) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          {editingItem ? 'Edit Item' : 'Create New Item'}
        </h2>
        <ItemForm
          onSubmit={handleFormSubmit}
          initialData={editingItem}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Items</h2>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          + Create Item
        </button>
      </div>

      {items.length === 0 ? (
        <div className="bg-white p-8 rounded-lg shadow-md text-center text-gray-500">
          <p>No items found. Create your first item!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  {item.description && (
                    <p className="text-gray-600 mb-3">{item.description}</p>
                  )}
                  <div className="flex gap-4 text-sm text-gray-500">
                    <span>
                      Created: {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                    {userRole === 'Admin' && item.user && (
                      <span>By: {item.user.name} ({item.user.email})</span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <button
                    onClick={() => handleEdit(item)}
                    disabled={loading}
                    className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 disabled:opacity-50"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    disabled={loading}
                    className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {pagination && pagination.totalPages > 1 && onPageChange && (
        <div className="flex justify-center items-center gap-2 mt-6">
          <button
            onClick={() => onPageChange(pagination.currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <span className="px-4 py-2 text-gray-700">
            Page {pagination.currentPage} of {pagination.totalPages}
          </span>
          <button
            onClick={() => onPageChange(pagination.currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default ItemList;


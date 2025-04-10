import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import AddCategoryForm from "../components/AddCategoryForm";

interface Category {
  id: number;
  name: string;
  description: string;
}

const Categories: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { user } = useAuth();

  const fetchCategories = async () => {
    try {
      const { data } = await api.get("/categorys");
      setCategories(data);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
      setError("Não foi possível carregar as categorias");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja excluir esta categoria?"))
      return;

    try {
      await api.delete(`/categorys/${id}`);
      fetchCategories();
    } catch (error) {
      console.error("Erro ao deletar categoria:", error);
      setError("Erro ao deletar categoria");
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleCancelEdit = () => {
    setEditingCategory(null);
  };

  if (loading) {
    return (
      <div className="content-container">
        <div className="content-box">
          <p className="text-center">Carregando categorias...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="content-container">
        <div className="content-box">
          <h1 className="page-title">Erro</h1>
          <p className="text-center text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="content-container">
      <div className="content-box">
        <h1 className="page-title">Categorias</h1>

        {user?.isAdmin && !editingCategory && (
          <AddCategoryForm onCategoryAdded={fetchCategories} />
        )}

        {user?.isAdmin && editingCategory && (
          <AddCategoryForm
            onCategoryAdded={fetchCategories}
            category={editingCategory}
            mode="edit"
            onCancel={handleCancelEdit}
          />
        )}

        <div className="grid-list">
          {categories.map((category) => (
            <div key={category.id} className="list-item">
              <h2 className="book-title">{category.name}</h2>
              <p className="text-gray-300">{category.description}</p>
              {user?.isAdmin && (
                <div className="book-actions">
                  <button
                    onClick={() => handleEdit(category)}
                    className="edit-button"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="delete-button"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;

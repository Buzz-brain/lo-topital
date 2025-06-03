import { useEffect, useState } from "react";
import {
  LayoutGrid,
  PlusCircle,
  Pencil,
  Trash2,
  Loader,
} from "lucide-react";
const apiURL = import.meta.env.VITE_API_URL;

const CategoryPage = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchCategories = async () => {
    try {
      const res = await fetch(`${apiURL}/category`);
      if (!res.ok) throw new Error("Failed to fetch categories");
      const data = await res.json();
      console.log(data.length)
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `${apiURL}/category/${editingId}` : `${apiURL}/category`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save category");
      }

      setForm({ name: "", description: "" });
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category) => {
    setEditingId(category._id);
    setForm({ name: category.name, description: category.description || "" });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      const res = await fetch(`${apiURL}/category/${id}`, { method: "DELETE", credentials: "include", }, );
      if (!res.ok) throw new Error("Failed to delete category");
      fetchCategories();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div style={{ padding: "1.5rem" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1.5rem" }}>
        <LayoutGrid size={24} />
        <h1 style={{ fontSize: "1.75rem", fontWeight: "700" }}>Manage Categories</h1>
      </div>

      <div
        style={{
          marginBottom: "1.5rem",
          padding: "1rem",
          border: "1px solid #ddd",
          borderRadius: "8px",
          display: "flex",
          flexWrap: "wrap",
          gap: "0.75rem",
        }}
      >
        <input
          type="text"
          placeholder="Category name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ flexGrow: 1, padding: "0.5rem", fontSize: "1rem" }}
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          style={{ flexGrow: 2, padding: "0.5rem", fontSize: "1rem" }}
        />
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.25rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: submitting ? "not-allowed" : "pointer",
            backgroundColor: "#2563EB",
            color: "white",
            border: "none",
            borderRadius: "6px",
            userSelect: "none",
          }}
        >
          {submitting ? (
            <Loader className="animate-spin" size={16} />
          ) : editingId ? (
            "Update"
          ) : (
            <>
              <PlusCircle size={16} /> Add
            </>
          )}
        </button>
      </div>

      {error && (
        <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>
      )}

      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loader className="animate-spin text-gray-500 mr-2" size={40} />
          Fetching category data
        </div>
      ) : categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            gap: "1rem",
          }}
        >
          {categories.map((category) => (
            <div
              key={category._id}
              style={{
                border: "1px solid #ddd",
                borderRadius: "8px",
                padding: "1rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <h2 style={{ fontWeight: "600", fontSize: "1.125rem" }}>{category.name}</h2>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <Pencil
                    size={18}
                    style={{ cursor: "pointer", color: "#2563EB" }}
                    onClick={() => handleEdit(category)}
                  />
                  <Trash2
                    size={18}
                    style={{ cursor: "pointer", color: "#DC2626" }}
                    onClick={() => handleDelete(category._id)}
                  />
                </div>
              </div>
              <p style={{ fontSize: "0.9rem", color: "#6B7280" }}>
                {category.description || "No description"}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;

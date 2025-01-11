import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home, Plus, Pencil, Trash2, Save, X, Upload } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface PG {
  id: string;
  name: string;
  address: string;
  contact: string;
  photos: string[];
}

function AdminPage() {
  const [pgs, setPgs] = useState<PG[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<PG>>({});
  const [csvFile, setCsvFile] = useState<File | null>(null);

  useEffect(() => {
    fetchPGs();
  }, []);

  async function fetchPGs() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('pgs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setPgs(data || []);
    } catch (error) {
      console.error('Error fetching PGs:', error);
      alert('Error fetching PGs. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(id: string) {
    try {
      const { error } = await supabase
        .from('pgs')
        .update(formData)
        .eq('id', id);

      if (error) throw error;
      
      setEditingId(null);
      setFormData({});
      await fetchPGs();
    } catch (error) {
      console.error('Error updating PG:', error);
      alert('Error updating PG. Please try again.');
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this PG?')) return;

    try {
      const { error } = await supabase
        .from('pgs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      await fetchPGs();
    } catch (error) {
      console.error('Error deleting PG:', error);
      alert('Error deleting PG. Please try again.');
    }
  }

  async function handleCsvUpload() {
    if (!csvFile) return;

    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        const rows = text.split('\n').slice(1); // Skip header row
        
        for (const row of rows) {
          const [name, address, contact, ...photoUrls] = row.split(',');
          
          const { error } = await supabase
            .from('pgs')
            .insert({
              name: name.trim(),
              address: address.trim(),
              contact: contact.trim(),
              photos: photoUrls.map(url => url.trim()).filter(Boolean)
            });

          if (error) throw error;
        }
        
        await fetchPGs();
        alert('PGs imported successfully!');
        setCsvFile(null);
      };
      reader.readAsText(csvFile);
    } catch (error) {
      console.error('Error importing PGs:', error);
      alert('Error importing PGs. Please check your CSV format and try again.');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white">
      {/* Navbar */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <Home className="h-6 w-6 text-purple-400" />
            <span className="font-bold text-xl">FindRoom Admin</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">Manage PGs</h1>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="file"
                accept=".csv"
                onChange={(e) => setCsvFile(e.target.files?.[0] || null)}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <button className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-xl hover:bg-purple-700">
                <Upload className="h-5 w-5" />
                Upload CSV
              </button>
            </div>
            {csvFile && (
              <button
                onClick={handleCsvUpload}
                className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600"
              >
                Import {csvFile.name}
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="grid gap-6">
            {pgs.map((pg) => (
              <div key={pg.id} className="bg-gray-900/50 rounded-2xl border-2 border-green-500 p-6">
                {editingId === pg.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={formData.name || pg.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                      placeholder="PG Name"
                    />
                    <input
                      type="text"
                      value={formData.address || pg.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                      placeholder="Address"
                    />
                    <input
                      type="text"
                      value={formData.contact || pg.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                      placeholder="Contact"
                    />
                    <input
                      type="text"
                      value={formData.photos?.join(', ') || pg.photos.join(', ')}
                      onChange={(e) => setFormData({ ...formData, photos: e.target.value.split(',').map(url => url.trim()) })}
                      className="w-full bg-gray-800 rounded-lg px-4 py-2 text-white"
                      placeholder="Photo URLs (comma-separated)"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSave(pg.id)}
                        className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                      >
                        <Save className="h-4 w-4" />
                        Save
                      </button>
                      <button
                        onClick={() => {
                          setEditingId(null);
                          setFormData({});
                        }}
                        className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600"
                      >
                        <X className="h-4 w-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h2 className="text-2xl font-bold">{pg.name}</h2>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingId(pg.id)}
                          className="flex items-center gap-2 bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                        >
                          <Pencil className="h-4 w-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(pg.id)}
                          className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                          Delete
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-300 mb-2">{pg.address}</p>
                    <p className="text-gray-300 mb-4">{pg.contact}</p>
                    <div className="grid grid-cols-3 gap-4">
                      {pg.photos.map((photo, index) => (
                        <img
                          key={index}
                          src={photo}
                          alt={`${pg.name} - Photo ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
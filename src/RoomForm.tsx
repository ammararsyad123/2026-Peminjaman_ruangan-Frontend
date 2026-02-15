import { useState } from 'react';
import axios from 'axios';

const RoomForm = ({ onRoomAdded }: { onRoomAdded: () => void }) => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post('http://localhost:5025/api/Rooms', { name, location, capacity: 30 })
      .then(() => {
        alert("Ruangan berhasil ditambah!");
        setName(''); setLocation('');
        onRoomAdded(); // Memperbarui tabel secara otomatis
      })
      .catch(err => console.error(err));
  };

  return (
    <div className="card shadow mt-4">
      <div className="card-header bg-success text-white"><h3>Tambah Ruangan Baru</h3></div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Nama Ruangan</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label">Lokasi</label>
            <input type="text" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Simpan Ruangan</button>
        </form>
      </div>
    </div>
  );
};

export default RoomForm;
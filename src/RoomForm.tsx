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
        onRoomAdded(); 
      })
      .catch(err => console.error(err));
  };
  
        return (
        <div className="card border-0 shadow-sm" style={{ borderRadius: '15px' }}>
            <div className="card-body p-4">
            <h5 className="fw-bold mb-4" style={{ color: '#166534' }}>Tambah Ruangan Baru</h5>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">NAMA RUANGAN</label>
                    <input type="text" className="form-control bg-light border-0 py-2" style={{ borderRadius: '10px' }} value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="col-md-6">
                    <label className="form-label small fw-bold text-muted">LOKASI</label>
                    <input type="text" className="form-control bg-light border-0 py-2" style={{ borderRadius: '10px' }} value={location} onChange={(e) => setLocation(e.target.value)} required />
                </div>
                <div className="col-12 mt-4">
                    <button 
                    type="submit" 
                    className="btn btn-success w-100 py-2 fw-bold shadow-sm" 
                    style={{ 
                        borderRadius: '10px', 
                        background: 'linear-gradient(45deg, #166534, #22c55e)', // Hijau Tua ke Hijau Terang
                        border: 'none' 
                    }}> Simpan Ruangan
                    </button>
                </div>
                </div>
            </form>
            </div>
        </div>
        );
};

export default RoomForm;
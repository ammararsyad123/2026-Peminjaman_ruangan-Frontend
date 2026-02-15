import { useEffect, useState } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
  location: string;
  capacity: number;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  // State baru untuk filter status: 'all', 'tersedia', atau 'dipinjam'
  const [statusFilter, setStatusFilter] = useState<'all' | 'tersedia' | 'dipinjam'>('all');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error ambil data:", err));
  };

  // Logika Filter Ganda: Berdasarkan Nama/Lokasi DAN Status
  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const isAvailable = room.capacity > 0;
    if (statusFilter === 'tersedia') return matchesSearch && isAvailable;
    if (statusFilter === 'dipinjam') return matchesSearch && !isAvailable;
    return matchesSearch;
  });

  const toggleStatus = (id: number, currentCapacity: number) => {
    const newCapacity = currentCapacity === 0 ? 30 : 0;
    axios.put(`http://localhost:5025/api/Rooms/${id}`, { 
      id: id, 
      name: rooms.find(r => r.id === id)?.name, 
      location: rooms.find(r => r.id === id)?.location,
      capacity: newCapacity
    })
    .then(() => fetchRooms())
    .catch(err => console.error("Gagal update status:", err));
  };

  const deleteRoom = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      axios.delete(`http://localhost:5025/api/Rooms/${id}`)
        .then(() => {
          alert("Ruangan berhasil dihapus!");
          fetchRooms();
        })
        .catch(err => console.error("Gagal menghapus:", err));
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
      <div className="card-header border-0 py-3 bg-white">
        <h5 className="mb-0 fw-bold" style={{ color: '#166534' }}>Dashboard Pengelolaan Ruangan</h5>
      </div>
      
      <div className="card-body p-4 pt-0">
        {/* Fitur Penelusuran Canggih (Poin 3) */}
        <div className="row g-3 mb-4 mt-1">
          <div className="col-md-7">
            <input 
              type="text" 
              className="form-control bg-light border-0 py-2" 
              placeholder="Cari ruangan atau lokasi..." 
              style={{ borderRadius: '10px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="col-md-5 d-flex gap-2">
            {/* Tombol Filter Status (Toggle Style) */}
            <button 
              className={`btn btn-sm flex-fill rounded-pill ${statusFilter === 'all' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setStatusFilter('all')}
            >
              Semua
            </button>
            <button 
              className={`btn btn-sm flex-fill rounded-pill ${statusFilter === 'tersedia' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setStatusFilter('tersedia')}
            >
              Tersedia
            </button>
            <button 
              className={`btn btn-sm flex-fill rounded-pill ${statusFilter === 'dipinjam' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setStatusFilter('dipinjam')}
            >
              Dipinjam
            </button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="px-4 py-3 border-0 text-muted small text-uppercase">Nama Ruangan</th>
                <th className="py-3 border-0 text-muted small text-uppercase">Lokasi</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-center">Status</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="align-middle">
                  <td className="px-4 py-3 fw-semibold">{room.name}</td>
                  <td className="py-3 text-secondary">{room.location}</td>
                  <td className="py-3 text-center">
                    <span className={`badge rounded-pill px-3 py-2 ${room.capacity === 0 ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'}`} style={{ fontSize: '0.75rem' }}>
                      ● {room.capacity === 0 ? 'Dipinjam' : 'Tersedia'}
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button className="btn btn-light btn-sm me-2 shadow-sm rounded-3 fw-bold text-success" onClick={() => toggleStatus(room.id, room.capacity)}>
                      {room.capacity === 0 ? 'Set Tersedia' : 'Set Dipinjam'}
                    </button>
                    <button className="btn btn-outline-danger btn-sm rounded-3" onClick={() => deleteRoom(room.id)}>
                      Hapus
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredRooms.length === 0 && (
            <div className="text-center py-5">
              <p className="text-muted mb-0">Tidak ada ruangan yang cocok dengan filter kamu.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RoomList;
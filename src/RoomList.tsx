import { useEffect, useState } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
  location: string;
  status?: string; // Tambahkan properti status
  capacity: number;
}

const RoomList = () => {
  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error ambil data:", err));
  };

  // Fungsi Fitur Update Status (Wajib ada di tugas)
  const toggleStatus = (id: number, currentStatus: string | undefined) => {
    const newStatus = currentStatus === 'Dipinjam' ? 'Tersedia' : 'Dipinjam';
    
    // Kita kirim update ke backend (Pastikan backend mendukung update capacity/status)
    axios.put(`http://localhost:5025/api/Rooms/${id}`, { 
      id: id, 
      name: rooms.find(r => r.id === id)?.name, 
      location: rooms.find(r => r.id === id)?.location,
      capacity: newStatus === 'Dipinjam' ? 0 : 30 // Simulasi perubahan data
    })
    .then(() => {
      fetchRooms();
    })
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
    <div className="card-header border-0 py-3" style={{ background: '#ffffff' }}>
      <h5 className="mb-0 fw-bold" style={{ color: '#4a90e2' }}>Dashboard Pengelolaan Ruangan</h5>
    </div>
    <div className="card-body p-0">
      <div className="table-responsive">
        <table className="table table-hover mb-0">
          <thead style={{ background: '#f8f9fa' }}>
            <tr>
              <th className="px-4 py-3 border-0 text-muted small text-uppercase">Nama Ruangan</th>
              <th className="py-3 border-0 text-muted small text-uppercase">Lokasi</th>
              <th className="py-3 border-0 text-muted small text-uppercase">Status</th>
              <th className="py-3 border-0 text-muted small text-uppercase text-center">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id} className="align-middle">
                <td className="px-4 py-3 fw-semibold">{room.name}</td>
                <td className="py-3 text-secondary">{room.location}</td>
                <td className="py-3">
                  <span className={`badge rounded-pill px-3 py-2 ${room.capacity === 0 ? 'bg-warning-subtle text-warning' : 'bg-success-subtle text-success'}`} style={{ fontSize: '0.75rem' }}>
                    ● {room.capacity === 0 ? 'Dipinjam' : 'Tersedia'}
                  </span>
                </td>
                <td className="py-3 text-center">
                  <button className="btn btn-light btn-sm me-2 shadow-sm rounded-3" onClick={() => toggleStatus(room.id, room.capacity === 0 ? 'Dipinjam' : 'Tersedia')}>
                    <i className="bi bi-arrow-repeat"></i> Ubah Status
                  </button>
                  <button className="btn btn-outline-danger btn-sm rounded-3" onClick={() => deleteRoom(room.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);
};

export default RoomList;
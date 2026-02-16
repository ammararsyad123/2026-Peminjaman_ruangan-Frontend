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
  const [statusFilter, setStatusFilter] = useState<'all' | 'tersedia' | 'dipinjam'>('all');

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = () => {
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error ambil data:", err));
  };

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          room.location.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  const deleteRoom = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      axios.delete(`http://localhost:5025/api/Rooms/${id}`)
        .then(() => {
          localStorage.removeItem(`booking_info_${id}`);
          alert("Ruangan berhasil dihapus!");
          fetchRooms();
        })
        .catch(err => console.error("Gagal menghapus:", err));
    }
  };

  const resetBooking = (id: number) => {
    if (window.confirm("Kosongkan semua jadwal booking untuk ruangan ini?")) {
      localStorage.removeItem(`booking_info_${id}`);
      fetchRooms();
    }
  };

  return (
    <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: '15px', overflow: 'hidden' }}>
      <div className="card-header border-0 py-3 bg-white text-center">
        <h5 className="mb-0 fw-bold" style={{ color: '#166534' }}>Dashboard Pengelolaan & Booking Ruangan</h5>
      </div>
      
      <div className="card-body p-4 pt-0">
        <div className="row g-3 mb-4 mt-1">
          <div className="col-md-12">
            <input 
              type="text" 
              className="form-control bg-light border-0 py-2" 
              placeholder="Cari ruangan atau lokasi..." 
              style={{ borderRadius: '10px' }}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead style={{ background: '#f8f9fa' }}>
              <tr>
                <th className="px-4 py-3 border-0 text-muted small text-uppercase text-start">Nama Ruangan</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-start">Lokasi</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-center">Informasi Booking</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-center">Status</th>
                <th className="py-3 border-0 text-muted small text-uppercase text-center">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room) => (
                <tr key={room.id} className="align-middle">
                  <td className="px-4 py-3 fw-semibold text-start">{room.name}</td>
                  <td className="py-3 text-secondary text-start">{room.location}</td>
                  
                  {/* REVISI: Menampilkan LIST Jadwal yang sudah masuk */}
                  <td className="py-3 text-center">
                    {localStorage.getItem(`booking_info_${room.id}`) ? (
                      <div className="small">
                        <span className="badge bg-success-subtle text-success d-block mb-1">Terjadwal</span>
                        <div className="text-muted fw-normal" style={{ fontSize: '10px', maxWidth: '180px', margin: '0 auto', lineHeight: '1.4' }}>
                          {localStorage.getItem(`booking_info_${room.id}`)}
                        </div>
                      </div>
                    ) : (
                      <span className="text-success small fw-bold">Siap di Booking</span>
                    )}
                  </td>

                  <td className="py-3 text-center">
                    <span className="badge rounded-pill px-3 py-2 bg-success-subtle text-success" style={{ fontSize: '0.75rem' }}>
                      ● Aktif
                    </span>
                  </td>
                  <td className="py-3 text-center">
                    <button className="btn btn-light btn-sm me-2 shadow-sm rounded-3 fw-bold text-warning" onClick={() => resetBooking(room.id)}>
                      Reset Jadwal
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


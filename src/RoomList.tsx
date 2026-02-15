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
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Daftar Pengelolaan Ruangan PENS</h3>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped w-100">
          <thead className="table-dark">
            <tr>
              <th>Nama Ruangan</th>
              <th>Lokasi</th>
              <th>Status</th> {/* Kolom Baru sesuai instruksi */}
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>
                  <span className={`badge ${room.capacity === 0 ? 'bg-warning' : 'bg-success'}`}>
                    {room.capacity === 0 ? 'Dipinjam' : 'Tersedia'}
                  </span>
                </td>
                <td>
                  <button 
                    className="btn btn-info btn-sm me-2" 
                    onClick={() => toggleStatus(room.id, room.capacity === 0 ? 'Dipinjam' : 'Tersedia')}
                  >
                    Ubah Status
                  </button>
                  <button className="btn btn-danger btn-sm" onClick={() => deleteRoom(room.id)}>
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RoomList;
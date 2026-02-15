import { useEffect, useState } from 'react';
import axios from 'axios';

interface Room {
  id: number;
  name: string;
  location: string;
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

  // Fungsi untuk menghapus data
  const deleteRoom = (id: number) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus ruangan ini?")) {
      axios.delete(`http://localhost:5025/api/Rooms/${id}`)
        .then(() => {
          alert("Ruangan berhasil dihapus!");
          fetchRooms(); // Refresh data tabel setelah hapus
        })
        .catch(err => console.error("Gagal menghapus:", err));
    }
  };

  return (
    <div className="card shadow">
      <div className="card-header bg-primary text-white">
        <h3 className="mb-0">Daftar Ruangan PENS</h3>
      </div>
      <div className="card-body">
        <table className="table table-hover table-striped w-100">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Nama Ruangan</th>
              <th>Lokasi</th>
              <th>Aksi</th> {/* Kolom baru */}
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.location}</td>
                <td>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => deleteRoom(room.id)}
                  >
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
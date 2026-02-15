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
    // Ganti port 5025 jika port Backend kamu berbeda
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data))
      .catch(err => console.error("Error ambil data:", err));
  }, []);

return (
  <div className="container-fluid mt-5">
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
            </tr>
          </thead>
          <tbody>
            {rooms.map((room) => (
              <tr key={room.id}>
                <td>{room.id}</td>
                <td>{room.name}</td>
                <td>{room.location}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rooms.length === 0 && (
          <p className="text-center text-muted">Data ruangan tidak ditemukan.</p>
        )}
      </div>
    </div>
  </div>
);
};

export default RoomList;
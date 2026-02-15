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
    <div>
      <h3>Daftar Ruangan PENS</h3>
      <ul>
        {rooms.map(r => <li key={r.id}>{r.name} - {r.location}</li>)}
      </ul>
    </div>
  );
};

export default RoomList;
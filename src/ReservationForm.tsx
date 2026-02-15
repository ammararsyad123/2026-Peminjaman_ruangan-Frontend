import { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = ({ onReserved }: { onReserved: () => void }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data.filter((r: any) => r.capacity > 0)))
      .catch(err => console.error(err));
  }, []);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    const roomToBook = rooms.find(r => r.id === parseInt(selectedRoomId));

    if (roomToBook) {
      axios.put(`http://localhost:5025/api/Rooms/${roomToBook.id}`, { 
        ...roomToBook,
        capacity: 0 
      })
      .then(() => {
        // Simpan info waktu agar tabel bisa menampilkan data yang sesuai input
        localStorage.setItem(`booking_info_${roomToBook.id}`, `${date} | ${time}`);
        
        alert(`Berhasil! ${userName} telah membooking ${roomToBook.name} untuk tanggal ${date} pukul ${time}`);
        onReserved(); 
        
        setUserName('');
        setSelectedRoomId('');
        setDate('');
        setTime('');
      })
      .catch(err => {
        console.error("Gagal booking:", err);
        alert("Terjadi kesalahan saat menghubungi server.");
      });
    }
  };

  return (
    <div className="card border-0 shadow-sm mt-4 text-start" style={{ borderRadius: '15px' }}>
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4" style={{ color: '#166534' }}>Form Pinjam Ruangan</h5>
        <form onSubmit={handleReserve}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">PILIH RUANGAN</label>
              <select className="form-select bg-light border-0" value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)} required>
                <option value="">-- Pilih --</option>
                {rooms.map(r => <option key={r.id} value={r.id}>{r.name}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">NAMA PEMINJAM</label>
              <input type="text" className="form-control bg-light border-0" value={userName} onChange={e => setUserName(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">TANGGAL</label>
              <input type="date" className="form-control bg-light border-0" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">JAM</label>
              <input type="time" className="form-control bg-light border-0" value={time} onChange={e => setTime(e.target.value)} required />
            </div>
            <div className="col-12 mt-4">
              <button type="submit" className="btn btn-success w-100 py-2 fw-bold shadow-sm" style={{ borderRadius: '10px' }}>
                Konfirmasi Peminjaman
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReservationForm;


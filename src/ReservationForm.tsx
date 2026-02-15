import { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = ({ onReserved }: { onReserved: () => void }) => {
  const [rooms, setRooms] = useState<any[]>([]);
  const [selectedRoom, setSelectedRoom] = useState('');
  const [userName, setUserName] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState(''); // State baru untuk Jam

  useEffect(() => {
    axios.get('http://localhost:5025/api/Rooms')
      .then(res => setRooms(res.data.filter((r: any) => r.capacity > 0)))
      .catch(err => console.error(err));
  }, []);

  const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Berhasil! ${userName} telah meminjam ruangan ${selectedRoom} pada ${date} pukul ${time}`);
    onReserved();
  };

  return (
    <div className="card border-0 shadow-sm mt-4" style={{ borderRadius: '15px' }}>
      <div className="card-body p-4">
        <h5 className="fw-bold mb-4" style={{ color: '#166534' }}>Form Pinjam Ruangan</h5>
        <form onSubmit={handleReserve}>
          <div className="row g-3">
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">PILIH RUANGAN</label>
              <select className="form-select bg-light border-0" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} required>
                <option value="">-- Pilih --</option>
                {rooms.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
              </select>
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">NAMA PEMINJAM</label>
              <input type="text" className="form-control bg-light border-0" value={userName} onChange={e => setUserName(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">TANGGAL</label>
              {/* REVISI: Tambahkan onChange agar bisa dipilih */}
              <input type="date" className="form-control bg-light border-0" value={date} onChange={e => setDate(e.target.value)} required />
            </div>
            <div className="col-md-3">
              <label className="form-label small fw-bold text-muted">JAM</label>
              {/* REVISI: Tambahkan value & onChange agar bisa diatur */}
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
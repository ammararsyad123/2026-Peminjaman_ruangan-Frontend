import { useState, useEffect } from 'react';
import axios from 'axios';

const ReservationForm = ({ onReserved }: { onReserved: () => void }) => {
    const [rooms, setRooms] = useState<any[]>([]);
    const [selectedRoomId, setSelectedRoomId] = useState('');
    const [userName, setUserName] = useState('');
    const [date, setDate] = useState('');
    const [timeStart, setTimeStart] = useState('');
    const [timeEnd, setTimeEnd] = useState('');

    useEffect(() => {
    axios.get('http://localhost:5025/api/Rooms')
        .then(res => setRooms(res.data))
        .catch(err => console.error(err));
    }, []);

    const handleReserve = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (timeEnd <= timeStart) {
        alert("Jam selesai harus lebih lambat dari jam mulai!");
        return;
    }

    const roomToBook = rooms.find(r => r.id === parseInt(selectedRoomId));

    if (roomToBook) {
        const existingBookings = localStorage.getItem(`booking_info_${roomToBook.id}`) || "";
        const newEntryText = `${date} (${timeStart}-${timeEnd}) - [${userName}]`;
        const updatedBookings = existingBookings 
        ? `${existingBookings} | ${newEntryText}` 
        : newEntryText;

        localStorage.setItem(`booking_info_${roomToBook.id}`, updatedBookings);

        const currentHistory = JSON.parse(localStorage.getItem('peminjaman_history') || '[]');
        const newHistoryData = {
        id: Date.now(),
        roomName: roomToBook.name,
        user: userName,
        date: date,
        time: `${timeStart} - ${timeEnd}`,
        timestamp: new Date().toLocaleString()
    };
        
        currentHistory.push(newHistoryData);
        localStorage.setItem('peminjaman_history', JSON.stringify(currentHistory));
        
        alert(`Berhasil! Booking ${userName} telah tercatat di sistem dan riwayat.`);
        onReserved(); 
        setUserName('');
        setSelectedRoomId('');
        setDate('');
        setTimeStart('');
        setTimeEnd('');
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
                <div className="col-md-2">
                <label className="form-label small fw-bold text-muted">TANGGAL</label>
                <input type="date" className="form-control bg-light border-0" value={date} onChange={e => setDate(e.target.value)} required />
                </div>
                <div className="col-md-2">
                <label className="form-label small fw-bold text-muted">JAM MULAI</label>
                <input type="time" className="form-control bg-light border-0" value={timeStart} onChange={e => setTimeStart(e.target.value)} step="60" required />
                </div>
                <div className="col-md-2">
                <label className="form-label small fw-bold text-muted">JAM SELESAI</label>
                <input type="time" className="form-control bg-light border-0" value={timeEnd} onChange={e => setTimeEnd(e.target.value)} step="60" required />
                </div>
                <div className="col-12 mt-4">
                    <button 
                    type="submit" 
                    className="btn btn-success w-100 py-2 fw-bold shadow-sm" 
                    style={{ 
                        borderRadius: '10px', 
                        background: 'linear-gradient(45deg, #166534, #22c55e)', // Samakan gradasinya dengan tombol Simpan
                        border: 'none'
                    }}
                    >
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


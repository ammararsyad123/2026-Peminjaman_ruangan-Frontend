import RoomList from './RoomList';
import RoomForm from './RoomForm';
import ReservationForm from './ReservationForm';

function App() {
  const handleRefresh = () => window.location.reload();

  return (
    <div className="container py-5 text-center">
      <div className="glass-header">
        <h1>Sistem Peminjaman Ruangan</h1>
      </div>
      
      {/* 1. Tabel Utama */}
      <RoomList />

      {/* 2. Form Transaksi Pinjam */}
      <ReservationForm onReserved={handleRefresh} />

      {/* 3. Form Master Data (Tambah Ruangan) */}
      <div className="mt-5">
        <RoomForm onRoomAdded={handleRefresh} />
      </div>
    </div>
  );
}

export default App;
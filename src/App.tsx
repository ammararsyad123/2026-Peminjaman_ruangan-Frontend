import RoomList from './RoomList';
import RoomForm from './RoomForm'; // Import form yang baru dibuat

function App() {
  // Fungsi untuk memuat ulang data saat ada ruangan baru ditambah
  const handleRoomAdded = () => {
    window.location.reload();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Sistem Peminjaman Ruangan</h1>
      
      {/* Tampilkan Tabel Ruangan */}
      <RoomList />
      
      {/* Tampilkan Form Tambah Ruangan di bawahnya */}
      <div className="mt-5">
        <RoomForm onRoomAdded={handleRoomAdded} />
      </div>
    </div>
  );
}

export default App;
import RoomList from './RoomList';
import RoomForm from './RoomForm'; // Import form yang baru dibuat

function App() {
  // Fungsi untuk memuat ulang data saat ada ruangan baru ditambah
  const handleRoomAdded = () => {
    window.location.reload();
  };
    return (
        <div className="container py-5 text-center">
          {/* Judul dengan kotak cembung transparan */}
          <div className="glass-header">
            <h1 className="fw-bold mb-0" style={{ color: '#2c3e50', letterSpacing: '-1px' }}>
              Sistem Peminjaman Ruangan
            </h1>
          </div>
          
          <RoomList />
          <div className="mt-5">
            <RoomForm onRoomAdded={handleRoomAdded} />
          </div>
        </div>
      );
}

export default App;
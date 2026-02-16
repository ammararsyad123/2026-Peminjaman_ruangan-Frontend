import RoomList from './RoomList';
import RoomForm from './RoomForm';
import ReservationForm from './ReservationForm';
import HistoryTable from './HistoryTable'; // 1. Tambahkan Import ini

function App() {
  const handleRefresh = () => window.location.reload();

  return (
    <div className="container py-5 text-center">
      <div className="glass-header">
        <h1>Sistem Peminjaman Ruangan</h1>
      </div>
      
      <RoomList />
      <ReservationForm onReserved={handleRefresh} />
      
      <HistoryTable /> 

      <div className="mt-5">
        <RoomForm onRoomAdded={handleRefresh} />
      </div>
    </div>
  );
}

export default App;


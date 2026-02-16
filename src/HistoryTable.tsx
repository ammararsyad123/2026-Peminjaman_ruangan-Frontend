import { useEffect, useState } from 'react';

const HistoryTable = () => {
  const [history, setHistory] = useState<any[]>([]);

  useEffect(() => {
    const loadHistory = () => {
        const data = JSON.parse(localStorage.getItem('peminjaman_history') || '[]');

        setHistory(data.reverse());
    };

    loadHistory();
    window.addEventListener('storage', loadHistory);
    return () => window.removeEventListener('storage', loadHistory);
    }, []);

    return (
        <div className="card border-0 shadow-sm mt-5" style={{ borderRadius: '15px' }}>
        <div className="card-header border-0 bg-white py-3 text-center">
            <h5 className="mb-0 fw-bold text-secondary">📋 Riwayat Peminjaman Ruangan </h5>
        </div>
        <div className="card-body p-0">
            <div className="table-responsive">
            <table className="table table-hover mb-0">
                <thead className="table-light">
                <tr className="small text-muted text-uppercase text-center">
                    <th className="px-4 py-3">Nama Ruangan</th>
                    <th className="py-3">Peminjam</th>
                    <th className="py-3">Tanggal</th>
                    <th className="py-3">Waktu Pinjam</th>
                    <th className="py-3">Log Sistem</th>
                </tr>
                </thead>
                <tbody>
                {history.length > 0 ? history.map((item) => (
                    <tr key={item.id} className="align-middle text-center">
                    <td className="px-4 py-3 fw-semibold">{item.roomName}</td>
                    <td className="py-3">{item.user}</td>
                    <td className="py-3">{item.date}</td>
                    <td className="py-3">{item.time}</td>
                    <td className="py-3">
                        <span className="badge bg-light text-success border border-success-subtle" style={{ fontSize: '10px' }}>
                        {item.timestamp}
                        </span>
                    </td>
                    </tr>
                )) : (
                    <tr>
                    <td colSpan={5} className="text-center py-5 text-muted">
                        Belum ada riwayat transaksi peminjaman.
                    </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </div>
        </div>
    );
    };

export default HistoryTable;


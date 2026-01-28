import React, { useEffect, useState } from 'react';
import { ticketApi } from '../api/tickets';
import { Ticket } from '../types/ticket';
import TicketCard from '../components/TicketCard';

const Dashboard: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTickets = async () => {
    setLoading(true);
    setError(null);

    try {
      const data = await ticketApi.getTickets();
      setTickets(data);
    } catch (err) {
      setError('Failed to load tickets. Please ensure the backend is running.');
      console.error('Error fetching tickets:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Tickets Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                AI-powered ticket triage and auto-resolution system
              </p>
            </div>
            <button
              onClick={fetchTickets}
              className="btn-secondary"
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh'}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Total Tickets</p>
            <p className="text-2xl font-bold">{tickets.length}</p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Open</p>
            <p className="text-2xl font-bold text-blue-600">
              {tickets.filter(t => t.status.toLowerCase() === 'open').length}
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">SLA Breached</p>
            <p className="text-2xl font-bold text-red-600">
              {tickets.filter(t => t.sla?.breached).length}
            </p>
          </div>

          <div className="bg-white border rounded-lg p-4">
            <p className="text-sm text-gray-600">Resolved</p>
            <p className="text-2xl font-bold text-green-600">
              {tickets.filter(t => t.status.toLowerCase() === 'resolved').length}
            </p>
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded mb-6">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center py-12 text-gray-600">
            Loading tickets...
          </div>
        )}

        {/* Empty */}
        {!loading && !error && tickets.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No tickets found.
          </div>
        )}

        {/* Tickets */}
        {!loading && !error && tickets.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tickets.map(ticket => (
              <TicketCard key={ticket.id} ticket={ticket} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

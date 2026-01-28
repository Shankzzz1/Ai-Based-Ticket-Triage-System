import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TicketForm from '../components/TicketForm';

const CreateTicket: React.FC = () => {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => {
      navigate('/ticke');
    }, 2000);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Ticket
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Submit a new support ticket for AI-powered triage
              </p>
            </div>
            <button
              onClick={() => navigate('/')}
              className="btn-secondary"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showSuccess && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-6 py-4 rounded-lg mb-6">
            <p className="font-medium">Success!</p>
            <p className="text-sm mt-1">
              Ticket created successfully. Redirecting to dashboard...
            </p>
          </div>
        )}

        <div className="card">
          <TicketForm onSuccess={handleSuccess} />
        </div>
      </div>
    </div>
  );
};

export default CreateTicket;

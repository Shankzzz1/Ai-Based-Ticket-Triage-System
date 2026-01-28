import React, { useState } from 'react';
import { ticketApi } from '../api/tickets';
import { CreateTicketRequest } from '../types/ticket';

interface TicketFormProps {
  onSuccess: () => void;
}

const TicketForm: React.FC<TicketFormProps> = ({ onSuccess }) => {
  const [formData, setFormData] = useState<CreateTicketRequest>({
    title: '',
    description: '',
    createdById: 'user-001', // Temporary hardcoded value
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title.trim() || !formData.description.trim()) {
      setError('Title and description are required');
      return;
    }

    setLoading(true);

    try {
      await ticketApi.createTicket(formData);
      setFormData({
        title: '',
        description: '',
        createdById: 'user-001',
      });
      onSuccess();
    } catch (err) {
      setError('Failed to create ticket. Please try again.');
      console.error('Error creating ticket:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
          {error}
        </div>
      )}

      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter ticket title"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className="input-field resize-none"
          placeholder="Describe the issue in detail"
          disabled={loading}
        />
      </div>

      <div>
        <label
          htmlFor="createdById"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Created By ID
        </label>
        <input
          type="text"
          id="createdById"
          name="createdById"
          value={formData.createdById}
          onChange={handleChange}
          className="input-field"
          placeholder="Enter user ID"
          disabled={loading}
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Creating...' : 'Create Ticket'}
        </button>
      </div>
    </form>
  );
};

export default TicketForm;

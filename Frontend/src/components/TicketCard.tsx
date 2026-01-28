import React from 'react';
import { Ticket } from '../types/ticket';
import PriorityBadge from './PriorityBadge';
import StatusBadge from './StatusBadge';
import SLAIndicator from './SLAIndicator';
import AIRiskIndicator from './AIRiskIndicator'; // ✅ NEW

interface TicketCardProps {
  ticket: Ticket;
}

const TicketCard: React.FC<TicketCardProps> = ({ ticket }) => {
  return (
    <div
      className={`card hover:shadow-md transition-shadow ${
        ticket.sla?.breached ? 'border-l-4 border-l-red-500' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">
            {ticket.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2">
            {ticket.description}
          </p>
        </div>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <StatusBadge status={ticket.status} />
        <PriorityBadge priority={ticket.priority} />
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
          {ticket.category}
        </span>
        <AIRiskIndicator risk={ticket.aiRisk} /> {/* 🔮 AI */}
      </div>

      {/* Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Confidence Score
          </p>
          <div className="flex items-center">
            <div className="flex-1 bg-gray-200 rounded-full h-2 mr-2">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${ticket.confidence * 100}%` }}
              />
            </div>
            <span className="text-sm font-mono font-medium text-gray-900">
              {(ticket.confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>

        <div>
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">
            Assigned To
          </p>
          <p className="text-sm font-medium text-gray-900">
            {ticket.assignedTo?.name || 'Unassigned'}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        {ticket.sla ? (
          <SLAIndicator
            dueBy={ticket.sla.dueBy}
            breached={ticket.sla.breached}
          />
        ) : (
          <span className="text-xs text-gray-400">
            SLA not assigned
          </span>
        )}

        <p className="text-xs text-gray-500">
          Created: {new Date(ticket.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TicketCard;

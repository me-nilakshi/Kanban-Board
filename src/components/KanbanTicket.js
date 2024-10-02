// src/components/KanbanTicket.js
import React from 'react';
import '../styles/KanbanTicket.css';

const KanbanTicket = ({ ticket }) => {
  return (
    <div className="kanban-ticket">
      <div className="ticket-header">
        <h4>{ticket.title}</h4>
      </div>
      <div className="ticket-body">
        <p><strong>Status:</strong> {ticket.status}</p>
        <p><strong>Priority:</strong> {ticket.priority}</p>
        <p><strong>Assigned to:</strong> {ticket.user}</p>
      </div>
    </div>
  );
};

export default KanbanTicket;

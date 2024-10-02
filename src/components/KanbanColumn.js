// src/components/KanbanColumn.js
import React from 'react';
import KanbanTicket from './KanbanTicket';
import '../styles/KanbanColumn.css';

const KanbanColumn = ({ title, tickets }) => {
  return (
    <div className="kanban-column">
      <h3>{title}</h3>
      {tickets.map(ticket => (
        <KanbanTicket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default KanbanColumn;

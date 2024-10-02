import React, { useState, useEffect } from 'react';
import KanbanColumn from './KanbanColumn';
import { groupTickets } from '../utils/grouping';
import { sortTickets } from '../utils/sorting';
import '../styles/KanbanBoard.css';

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');  // Default grouping by status
  const [sortBy, setSortBy] = useState('priority');  // Default sorting by priority
  const [isDropdownVisible, setDropdownVisible] = useState(false);  // To control dropdown visibility

  useEffect(() => {
    // Fetch tickets and users from the API
    fetch('https://api.quicksell.co/v1/internal/frontend-assignment')
      .then(response => response.json())
      .then(data => {
        setTickets(data.tickets);
        setUsers(data.users);
      })
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const toggleDropdown = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const getUserById = (userId) => {
    const user = users.find(u => u.id === userId);
    return user ? user.name : 'Unknown User';
  };

  // Add the user names to each ticket object
  const ticketsWithUserNames = tickets.map(ticket => ({
    ...ticket,
    user: getUserById(ticket.userId)
  }));

  // Group and sort tickets based on the user's selection
  const groupedTickets = groupTickets(ticketsWithUserNames, groupBy);
  const sortedTickets = sortTickets(groupedTickets, sortBy);

  return (
    <div className="kanban-board">
      <div className="kanban-controls">
        <div className="display-container">
          <button className="display-button" onClick={toggleDropdown}>
            Display
          </button>

          {/* Dropdown container */}
          {isDropdownVisible && (
            <div className="dropdown-menu">
              <div className="dropdown-item">
                <div className="dropdown-item-row">
                  <label htmlFor="grouping">Grouping:</label>
                  <select
                    id="grouping"
                    value={groupBy}
                    onChange={(e) => setGroupBy(e.target.value)}
                  >
                    <option value="status">Status</option>
                    <option value="user">User</option>
                    <option value="priority">Priority</option>
                  </select>
                </div>
              </div>

              <div className="dropdown-item">
                <div className="dropdown-item-row">
                  <label htmlFor="ordering">Ordering:</label>
                  <select
                    id="ordering"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    <option value="priority">Priority</option>
                    <option value="title">Title</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Closing divs added */}
      <div className="kanban-columns">
        {Object.keys(sortedTickets).map((groupKey) => (
          <KanbanColumn key={groupKey} title={groupKey} tickets={sortedTickets[groupKey]} />
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;

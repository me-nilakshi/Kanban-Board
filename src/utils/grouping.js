export const groupTickets = (tickets, groupBy) => {
    if (groupBy === 'status') {
      return groupByField(tickets, 'status');
    } else if (groupBy === 'user') {
      return groupByField(tickets, 'user', ['id', 'title', 'tag']); // Only include id, title, and tag for user grouping
    } else if (groupBy === 'priority') {
      return groupByField(tickets, 'priority');
    }
  };
  
  // Modified groupByField function to strictly include specific fields for user grouping
  const groupByField = (tickets, field, includeFields = null) => {
    return tickets.reduce((groups, ticket) => {
      const groupKey = ticket[field];
      if (!groups[groupKey]) {
        groups[groupKey] = [];
      }
  
      if (includeFields) {
        // Create a new object that only includes the specified fields
        const filteredTicket = includeFields.reduce((filtered, key) => {
          if (ticket.hasOwnProperty(key)) {
            filtered[key] = ticket[key]; // Only add the fields specified
          }
          return filtered;
        }, {});
  
        groups[groupKey].push(filteredTicket);
      } else {
        // If no field filtering, add the full ticket
        groups[groupKey].push(ticket);
      }
  
      return groups;
    }, {});
  };
  
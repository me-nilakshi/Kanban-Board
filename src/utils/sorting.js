// src/utils/sorting.js

export const sortTickets = (groupedTickets, sortBy) => {
  const sortedGroups = {};

  Object.keys(groupedTickets).forEach(groupKey => {
    sortedGroups[groupKey] = groupedTickets[groupKey].sort((a, b) => {
      if (sortBy === 'priority') {
        return b.priority - a.priority; // Descending order of priority
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title); // Alphabetical order by title
      }
      return 0;
    });
  });

  return sortedGroups;
};

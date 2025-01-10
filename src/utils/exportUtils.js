export const exportToJSON = (events, filename) => {
    const dataStr = JSON.stringify(events, null, 2);
    const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
    
    const exportFileDefaultName = `${filename}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };
  
  export const exportToCSV = (events, filename) => {
    // Define CSV headers
    const headers = [
      'Title',
      'Date',
      'Start Time',
      'End Time',
      'Category',
      'Description'
    ];
  
    // Convert events to CSV rows
    const rows = events.map(event => [
      event.title,
      event.date,
      event.startTime,
      event.endTime,
      event.category,
      event.description || ''
    ].map(cell => `"${cell}"`).join(','));
  
    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows
    ].join('\n');
  
    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    
    if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, `${filename}.csv`);
    } else {
      const link = document.createElement('a');
      if (link.download !== undefined) {
        const url = URL.createObjectURL(blob);
        link.setAttribute('href', url);
        link.setAttribute('download', `${filename}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };
export function FormatData(isoString) {
    const date = new Date(isoString);
    const options = {
        day: '2-digit',
        month: 'long', // Full month name (e.g., June)
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        
        hour12: true, // 12-hour format with am/pm
    };

    const formattedDate = date.toLocaleString('en-US', options);
    return formattedDate.replace(',', ' at'); // Replace comma with "at"
}
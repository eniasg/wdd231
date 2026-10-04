// thankyou.js - Display submitted form data from the URL query string

document.addEventListener('DOMContentLoaded', () => {

    const params = new URLSearchParams(window.location.search);
    const summary = document.querySelector('#summary');

    if (!summary) return;

    // Required fields to display in the confirmation summary
    const fields = [
        { key: 'firstName', label: 'First Name' },
        { key: 'lastName', label: 'Last Name' },
        { key: 'email', label: 'Email Address' },
        { key: 'phone', label: 'Mobile Phone' },
        { key: 'businessName', label: 'Business / Organization' },
        { key: 'membershipLevel', label: 'Membership Level' },
        { key: 'timestamp', label: 'Submitted On' }
    ];

    let html = '';

    fields.forEach(field => {
        const value = params.get(field.key);
        if (value) {
            let display = value;

            // Friendly name for membership level
            if (field.key === 'membershipLevel') {
                const map = {
                    np: 'NP Membership (Non-profit)',
                    bronze: 'Bronze Membership',
                    silver: 'Silver Membership',
                    gold: 'Gold Membership'
                };
                display = map[value] || value;
            }

            html += `<p><strong>${field.label}:</strong> ${escapeHTML(display)}</p>`;
        }
    });

    summary.innerHTML = html || '<p>No form data was found.</p>';
});

// Prevent HTML injection if the URL is tampered with
function escapeHTML(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
// thankyou.js - Display form data from URL parameters

document.addEventListener('DOMContentLoaded', function () {
    const urlParams = new URLSearchParams(window.location.search);
    const summaryContainer = document.getElementById('summaryContainer');

    if (summaryContainer) {
        // Get form values from URL parameters
        const firstName = urlParams.get('firstName') || 'Not provided';
        const lastName = urlParams.get('lastName') || 'Not provided';
        const email = urlParams.get('email') || 'Not provided';
        const phone = urlParams.get('phone') || 'Not provided';
        const businessName = urlParams.get('businessName') || 'Not provided';
        const timestamp = urlParams.get('timestamp') || 'Not recorded';
        const title = urlParams.get('title') || 'Not provided';
        const membershipLevel = urlParams.get('membershipLevel') || 'Not selected';
        const description = urlParams.get('description') || 'Not provided';

        // Format membership level for display
        let membershipDisplay = '';
        switch (membershipLevel) {
            case 'np':
                membershipDisplay = 'NP Membership (Non-Profit - No Fee)';
                break;
            case 'bronze':
                membershipDisplay = 'Bronze Membership ($250/year)';
                break;
            case 'silver':
                membershipDisplay = 'Silver Membership ($500/year)';
                break;
            case 'gold':
                membershipDisplay = 'Gold Membership ($1,000/year)';
                break;
            default:
                membershipDisplay = membershipLevel;
        }

        // Build the summary HTML
        summaryContainer.innerHTML = `
            <div class="summary-item">
                <strong>Full Name:</strong> ${escapeHTML(firstName)} ${escapeHTML(lastName)}
            </div>
            <div class="summary-item">
                <strong>Organizational Title:</strong> ${escapeHTML(title)}
            </div>
            <div class="summary-item">
                <strong>Email Address:</strong> ${escapeHTML(email)}
            </div>
            <div class="summary-item">
                <strong>Mobile Phone:</strong> ${escapeHTML(phone)}
            </div>
            <div class="summary-item">
                <strong>Business/Organization:</strong> ${escapeHTML(businessName)}
            </div>
            <div class="summary-item">
                <strong>Membership Level:</strong> ${escapeHTML(membershipDisplay)}
            </div>
            <div class="summary-item">
                <strong>Business Description:</strong> ${escapeHTML(description) || 'Not provided'}
            </div>
            <div class="summary-item">
                <strong>Application Submitted:</strong> ${escapeHTML(timestamp)}
            </div>
        `;
    }
});

// Helper function to escape HTML to prevent XSS attacks
function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
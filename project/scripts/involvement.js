// involvement.js - Get Involved page: options + LocalStorage + modal confirmation

// =====================================================
// Involvement option data
// =====================================================
const involvementTypes = [
    {
        title: 'Donate',
        icon: '💚',
        description: 'Support wildlife conservation through financial contributions. Every dollar helps protect our wildlife.',
        actions: ['One-time donation', 'Monthly recurring']
    },
    {
        title: 'Volunteer',
        icon: '🙋',
        description: 'Join our team of volunteers working on the ground to protect wildlife and their habitats.',
        actions: ['Field work', 'Community outreach', 'Research assistance']
    },
    {
        title: 'Adopt an Animal',
        icon: '🐘',
        description: 'Support the care of specific species through our adoption program — a perfect gift idea.',
        actions: ['Elephant adoption', 'Rhino adoption', 'Wild dog adoption']
    }
];

// =====================================================
// Display involvement options
// =====================================================
function displayInvolvementOptions() {
    const container = document.querySelector('#involvement-options');
    if (!container) return;

    container.innerHTML = '';
    involvementTypes.forEach(option => {
        const card = document.createElement('div');
        card.className = 'involvement-card';
        card.innerHTML = `
            <div class="involvement-icon">${option.icon}</div>
            <h3>${option.title}</h3>
            <p>${option.description}</p>
            <ul>
                ${option.actions.map(action => `<li>✓ ${action}</li>`).join('')}
            </ul>
        `;
        container.appendChild(card);
    });
}

// =====================================================
// Form submission → store in localStorage + redirect
// =====================================================
function setupDonationForm() {
    const form = document.querySelector('#donation-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        // Let the form submit normally (GET → thankyou.html)
        // But also store the last donation in localStorage for reference
        const data = {
            fullName: form.fullName.value,
            email: form.email.value,
            amount: form.amount.value,
            message: form.message.value,
            date: new Date().toISOString()
        };

        try {
            // Keep a rolling history of the last 5 donations
            const history = JSON.parse(localStorage.getItem('zwcnDonations') || '[]');
            history.unshift(data);
            localStorage.setItem('zwcnDonations', JSON.stringify(history.slice(0, 5)));
        } catch (err) {
            console.warn('Could not write to localStorage:', err);
        }

        // Let the browser submit the form normally after storing
    });
}

// =====================================================
// Show last donation info (if present) as a small confirmation banner
// =====================================================
function showRecentDonation() {
    try {
        const history = JSON.parse(localStorage.getItem('zwcnDonations') || '[]');
        if (!history.length) return;

        const last = history[0];
        const banner = document.createElement('div');
        banner.className = 'recent-donation-banner';
        banner.innerHTML = `
            <p><strong>Welcome back, ${last.fullName}!</strong>
            Your last donation of $${last.amount} was recorded on
            ${new Date(last.date).toLocaleDateString()}.</p>
        `;
        const main = document.querySelector('main');
        if (main) main.prepend(banner);
    } catch (err) {
        console.warn('Could not read localStorage:', err);
    }
}

// =====================================================
// Init
// =====================================================
document.addEventListener('DOMContentLoaded', () => {
    displayInvolvementOptions();
    setupDonationForm();
    showRecentDonation();
});
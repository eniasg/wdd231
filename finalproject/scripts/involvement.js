// involvement.js - Get Involved page with localStorage

// DOM Elements
const involvementOptions = document.querySelector('#involvement-options');
const donationForm = document.querySelector('#donation-form');

// Involvement options data
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
        description: 'Support the care of specific species through our adoption program. Great for gifts!',
        actions: ['Elephant adoption', 'Rhino adoption', 'Wild dog adoption']
    }
];

// Display involvement options
function displayInvolvementOptions() {
    if (!involvementOptions) return;

    involvementOptions.innerHTML = '';

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
        involvementOptions.appendChild(card);
    });
}

// Handle form submission with localStorage
function handleDonationForm() {
    if (!donationForm) return;

    donationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(donationForm);
        const data = {
            name: formData.get('fullName'),
            email: formData.get('email'),
            amount: formData.get('amount'),
            message: formData.get('message'),
            date: new Date().toLocaleDateString()
        };

        // Save to localStorage
        const donations = JSON.parse(localStorage.getItem('donations')) || [];
        donations.push(data);
        localStorage.setItem('donations', JSON.stringify(donations));

        // Show confirmation
        alert(`Thank you ${data.name}! Your donation of $${data.amount} has been recorded.`);
        donationForm.reset();
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    displayInvolvementOptions();
    handleDonationForm();
});
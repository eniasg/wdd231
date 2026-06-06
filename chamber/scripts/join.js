// join.js - Handle timestamp and form validation

// Set the timestamp when the page loads
document.addEventListener('DOMContentLoaded', function () {
    const timestampField = document.getElementById('timestamp');
    if (timestampField) {
        const now = new Date();
        const formattedTimestamp = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        timestampField.value = formattedTimestamp;
        console.log('Timestamp set:', formattedTimestamp);
    }

    // Add animation class to cards after a slight delay
    const cards = document.querySelectorAll('.member-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate-in');
        }, index * 150);
    });
});

// Form validation - ensure organizational title pattern works
const titleInput = document.getElementById('title');
if (titleInput) {
    titleInput.addEventListener('input', function () {
        const pattern = /^[A-Za-z\s\-]{7,}$/;
        if (pattern.test(this.value)) {
            this.setCustomValidity('');
        } else {
            this.setCustomValidity('Must be at least 7 characters using letters, spaces, and hyphens only');
        }
    });
}
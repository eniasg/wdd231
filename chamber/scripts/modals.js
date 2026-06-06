// modals.js - Handle modal dialog functionality

document.addEventListener('DOMContentLoaded', function () {
    // Get all modal trigger buttons
    const modalLinks = document.querySelectorAll('.modal-link');

    // Get all modals
    const modals = document.querySelectorAll('.modal');

    // Open modal when button is clicked
    modalLinks.forEach(button => {
        button.addEventListener('click', function () {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.showModal();
            }
        });
    });

    // Close modal when close button is clicked
    const closeButtons = document.querySelectorAll('.close-modal');
    closeButtons.forEach(button => {
        button.addEventListener('click', function () {
            const modal = this.closest('.modal');
            if (modal) {
                modal.close();
            }
        });
    });

    // Close modal when clicking outside the modal content
    modals.forEach(modal => {
        modal.addEventListener('click', function (event) {
            const modalContent = this.querySelector('.modal-content');
            if (modalContent && !modalContent.contains(event.target)) {
                this.close();
            }
        });
    });

    // Close modal with Escape key (default behavior, but ensuring it works)
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape') {
            modals.forEach(modal => {
                if (modal.open) {
                    modal.close();
                }
            });
        }
    });
});
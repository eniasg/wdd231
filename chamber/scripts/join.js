// join.js - Timestamp, modal dialogs, and card entrance animation

document.addEventListener('DOMContentLoaded', () => {

    /* =============================================
       1. Set hidden timestamp when the form loads
       ============================================= */
    const timestampField = document.querySelector('#timestamp');
    if (timestampField) {
        timestampField.value = new Date().toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
    }

    /* =============================================
       2. Modal dialog open/close
       ============================================= */
    document.querySelectorAll('.modal-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) modal.showModal();
        });
    });

    // Close button inside each modal
    document.querySelectorAll('.modal-close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            const dialog = closeBtn.closest('dialog');
            if (dialog) dialog.close();
        });
    });

    // Click outside the dialog closes it
    document.querySelectorAll('dialog.modal').forEach(dialog => {
        dialog.addEventListener('click', event => {
            const rect = dialog.getBoundingClientRect();
            const inside =
                event.clientX >= rect.left &&
                event.clientX <= rect.right &&
                event.clientY >= rect.top &&
                event.clientY <= rect.bottom;
            if (!inside) dialog.close();
        });
    });

    /* =============================================
       3. Stagger the entrance animation on cards
       ============================================= */
    document.querySelectorAll('.member-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
});
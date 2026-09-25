// output.mjs - Renders the course title and section list to the page

export function setTitle(course) {
    const titleElement = document.querySelector('#course-title');
    if (titleElement) {
        titleElement.textContent = `${course.prefix} ${course.number}: ${course.title} (${course.credits} credits)`;
    }
}

export function renderSections(sections) {
    const sectionsList = document.querySelector('#sections-list');
    if (!sectionsList) return;

    sectionsList.innerHTML = '';

    sections.forEach(section => {
        const card = document.createElement('div');
        card.className = 'section-card';

        // Calculate fill percentage for visual cue
        const percentFilled = (section.enrollment / section.maxEnrollment) * 100;
        let statusColor = '#2E7D32'; // green
        if (percentFilled > 90) statusColor = '#FF6B35'; // orange
        if (percentFilled >= 100) statusColor = '#C62828'; // red

        card.innerHTML = `
            <h3>Section ${section.sectionNumber}</h3>
            <p><strong>Instructor:</strong> ${section.instructor}</p>
            <p><strong>Schedule:</strong> ${section.schedule}</p>
            <p class="enrollment" style="color: ${statusColor};">
                <strong>Enrollment:</strong> ${section.enrollment} / ${section.maxEnrollment}
            </p>
        `;

        sectionsList.appendChild(card);
    });
}
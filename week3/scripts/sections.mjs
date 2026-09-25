// sections.mjs - Populates the section selection dropdown

export function setSectionSelection(sections) {
    const sectionSelect = document.querySelector('#sectionNumber');
    if (!sectionSelect) return;

    // Clear existing options
    sectionSelect.innerHTML = '';

    // Populate with current section data
    sections.forEach((section) => {
        const option = document.createElement('option');
        option.value = section.sectionNumber;
        option.textContent = `Section ${section.sectionNumber} — ${section.schedule} (${section.enrollment}/${section.maxEnrollment})`;
        sectionSelect.appendChild(option);
    });
}
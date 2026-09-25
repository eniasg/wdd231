// modules.mjs - Main entry point; imports modules and wires up event listeners

import byuiCourse from './course.mjs';
import { setSectionSelection } from './sections.mjs';
import { setTitle, renderSections } from './output.mjs';

// ----- Initial page render -----
setTitle(byuiCourse);
setSectionSelection(byuiCourse.sections);
renderSections(byuiCourse.sections);

// ----- Enroll button -----
document.querySelector('#enrollStudent').addEventListener('click', function () {
    const sectionNum = Number(document.querySelector('#sectionNumber').value);
    byuiCourse.changeEnrollment(sectionNum);
    renderSections(byuiCourse.sections);
    setSectionSelection(byuiCourse.sections); // refresh dropdown counts
});

// ----- Drop button -----
document.querySelector('#dropStudent').addEventListener('click', function () {
    const sectionNum = Number(document.querySelector('#sectionNumber').value);
    byuiCourse.changeEnrollment(sectionNum, false);
    renderSections(byuiCourse.sections);
    setSectionSelection(byuiCourse.sections); // refresh dropdown counts
});
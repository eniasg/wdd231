// course.mjs - Course object with sections and enrollment methods

const byuiCourse = {
    prefix: 'WDD',
    number: 231,
    title: 'Web Frontend Development I',
    credits: 3,
    sections: [
        {
            sectionNumber: 1,
            instructor: 'Brother Smith',
            schedule: 'MW 9:00–10:30',
            enrollment: 28,
            maxEnrollment: 30
        },
        {
            sectionNumber: 2,
            instructor: 'Sister Johnson',
            schedule: 'TTh 11:00–12:30',
            enrollment: 24,
            maxEnrollment: 30
        },
        {
            sectionNumber: 3,
            instructor: 'Brother Williams',
            schedule: 'Online',
            enrollment: 32,
            maxEnrollment: 35
        }
    ],

    changeEnrollment(sectionNum, add = true) {
        const section = this.sections.find(s => s.sectionNumber === sectionNum);

        if (!section) {
            console.log(`Section ${sectionNum} not found.`);
            return;
        }

        if (add) {
            if (section.enrollment < section.maxEnrollment) {
                section.enrollment++;
                console.log(`Enrolled in section ${sectionNum}. Total: ${section.enrollment}`);
            } else {
                console.log(`Section ${sectionNum} is full.`);
            }
        } else {
            if (section.enrollment > 0) {
                section.enrollment--;
                console.log(`Dropped from section ${sectionNum}. Total: ${section.enrollment}`);
            } else {
                console.log(`Section ${sectionNum} has no students to drop.`);
            }
        }

        // NOTE: renderSections(this.sections) removed here per instructions.
        // This function is not available in this module.
    }
};

export default byuiCourse;
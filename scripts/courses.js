const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development.',
        technology: ['HTML', 'CSS'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers.',
        technology: ['Python'],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects.',
        technology: ['C#'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals.',
        technology: ['HTML', 'CSS', 'JavaScript'],
        completed: false
    }
];

// Function to get formatted course code (e.g., "WDD 130")
function getCourseCode(course) {
    return `${course.subject} ${course.number}`;
}

// Function to display courses based on filter
function displayCourses(filter = "ALL") {
    const courseContainer = document.querySelector('#course-cards');
    if (!courseContainer) return;

    let filteredCourses = [...courses];

    if (filter === "WDD") {
        filteredCourses = courses.filter(course => course.subject === "WDD");
    } else if (filter === "CSE") {
        filteredCourses = courses.filter(course => course.subject === "CSE");
    }

    // Clear container
    courseContainer.innerHTML = '';

    // Create and append course cards
    filteredCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        if (course.completed) {
            card.classList.add('completed');
        }

        // Build technology badges HTML
        let techBadges = '';
        course.technology.forEach(tech => {
            techBadges += `<span class="technology-badge">${tech}</span>`;
        });

        card.innerHTML = `
            <h3>${getCourseCode(course)}</h3>
        `;

        // Add description as tooltip or hidden on small screens
        // const description = document.createElement('p');
        // description.className = 'course-description';
        // description.textContent = course.description;
        // card.appendChild(description);

        courseContainer.appendChild(card);
    });

    // Update total credits using reduce
    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    const totalCreditsElement = document.querySelector('#total-credits');
    if (totalCreditsElement) {
        totalCreditsElement.textContent = totalCredits;
    }
}

// Helper function to set active button styling
function setActiveButton(activeButton) {
    const buttons = document.querySelectorAll('.filter-buttons button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });
    activeButton.classList.add('active');
}

// Set up filter button event listeners
function setupFilters() {
    const allBtn = document.querySelector('#filter-all');
    const wddBtn = document.querySelector('#filter-wdd');
    const cseBtn = document.querySelector('#filter-cse');

    if (allBtn) {
        allBtn.addEventListener('click', () => {
            setActiveButton(allBtn);
            displayCourses('ALL');
        });
    }

    if (wddBtn) {
        wddBtn.addEventListener('click', () => {
            setActiveButton(wddBtn);
            displayCourses('WDD');
        });
    }

    if (cseBtn) {
        cseBtn.addEventListener('click', () => {
            setActiveButton(cseBtn);
            displayCourses('CSE');
        });
    }
}

// Initialize courses when page loads
if (document.querySelector('#course-cards')) {
    displayCourses('ALL');
    setupFilters();
}
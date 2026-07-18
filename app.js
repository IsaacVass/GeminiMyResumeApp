// =========================================================================
//  PORTFOLIO DATA CONFIGURATION
//  Edit this JSON structure to instantly update your hosted resume!
// =========================================================================
const portfolioData = {
    header: {
        name: "Isaac Vass",
        linkedin: "https://www.linkedin.com/in/isaac-vass/",
        github: "https://github.com/IsaacVass",
        email: "isaacjosephvass@gmail.com",
        bio: "Passionate Computer Science student at California Baptist University. Interested in web development, backend architectures, and secure software development.",
        
        // Place your media files inside your GitHub root directory and path them here
        photo: "Selfie.jpeg",               // e.g. "profile.jpg" or an image url
        resumePdf: "VassCurrentResume.pdf",            // e.g. "resume.pdf"
        transcriptPdf: "transcript.pdf"     // e.g. "transcript.pdf"
    },
    education: {
        school: "California Baptist University",
        degree: "Bachelor of Computer Science",
        desc: "Pursuing a comprehensive curriculum in Computer Science. Gaining practical, hands-on experience in software methodologies, advanced mathematics, and project management.",
        link: "https://calbaptist.edu",
        
        classes: [
            { 
                name: "EGR 302: Junior Design", 
                label: "Major Requirement", 
                semester: "Spring 2026", 
                desc: "Developed an application with a team with strict timelines for deliverables under the SCRUM framework. Required Sprint planning and documentation of the project process as well as Sprint presentations and securing a mentorship to guide the team." 
            },
            { 
                name: "EGR 227: Data Structures", 
                label: "Major Requirement", 
                semester: "Fall 2024", 
                desc: "Analyzed memory allocation architectures, recursive practices, complexity profiling (Big O), trees, hash structures, and classical sorting algorithms." 
            },
            { 
                name: "EGR 222: Software Engineering", 
                label: "Major Requirement", 
                semester: "Spring 2024", 
                desc: "Practiced standard development lifecycles (SDLC) focusing on requirements gathering, user stories, systems analysis, and teamwork frameworks." 
            }
        ]
    },
    skills: [
        { name: "Python", rating: 4.0, comment: "Scripting", desc: "Utilized for data structures assignments, server automation scripting, API designs, and core software prototypes." },
        { name: "GitHub", rating: 4.5, comment: "Source Control", desc: "Used GitHub for all for school, work, and personal coding projects through the desktop app, and SourceTree. Experienced in commiting code practices and merging code for team development scenarios" },
    ],
    projects: [
        { 
            name: "AI Resume Web Application", 
            date: "2026-05", 
            featured: true, 
            label: "Group Project - Junior Design", 
            tech: "Flutter, GCP, GitHub, Source Tree", 
            desc: "Built a rapid prototype using the SCRUM framework of a web application that uses AI to review, create, and improve user\’s resumes. Used Flutter for the main code of the application as we were most familiar with it. Google Cloud Platform was used to store user information, provide authentication, monitor feature use, and call artificial intelligence. GitHub for source control with Source Tree to keep track of the team\ 's commits. Additionally we met with a mentor at the end of Sprints to review our progress and guide us for implementing new features.",
            link: "https://www.youtube.com/watch?v=k28Lc7Mi7Co" 
        },
        { 
            name: "AI Fashion App", 
            date: "2026-12", 
            featured: false, 
            label: "Group Project - Mobile App", 
            tech: "Flutter, GCP, GitHub", 
            desc: "Worked with a partner to create a mobile app that uses AI to generate outfits for events. The app uses GitHub as source control, Firebase Auth for authentication, Google Cloud Storage for storing the images, Firestore for user preferences, Flutter Plugins for features, and Riverpod for state in Firebase.", 
            link: "https://www.youtube.com/watch?v=FFMMtQqk5EU" 
        },
    { 
            name: "SQL Database Restraunt Management System", 
            date: "2026-12", 
            featured: false, 
            label: "Group Project - Databases", 
            tech: "SQL, GitHub", 
            desc: "Built a model of a restaurant using SQL tables to demonstrate user stories and triggers to obey business rules and assumptions. We showed the stories of customers on a waitlist getting assigned to tables where they can then place orders food off of a menu which the chefs will prepare and servers will finally bring the food to the right table and check out the customer at the end of the night."
        }
    ],
    experience: [
        { 
            name: "California Baptist University Artificial Intelligence Machine Learning Lab", 
            date: "November 2023 - June 2025 September 2025 - Present", 
            label: "Part-Time", 
            tech: "Student Researcher", 
            desc: "Developing solutions for the lab\’s clients generally working with other researchers with enterprise software programs and coding libraries.", 
            link: "https://calbaptist.edu" 
        },
        { 
            name: "Naval Surface Warfare Center Corona", 
            date: "June 2025 - August 2025", 
            label: "Full-Time", 
            tech: "NRIEP Intern", 
            desc: "10 week internship program working with a team in a SCRUM framework to develop a software solution for a NISE project. Gained experience in software development, team collaboration, and project management.", 
            link: "https://www.navalsteminterns.us/nreip/" 
        }
    ]
};


// =========================================================================
//  RENDERING ENGINE (No logic edits needed)
// =========================================================================

// 1. Tab Navigation Routing
function switchTab(tabId) {
    document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');
    
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
        return btn.getAttribute('onclick').includes(tabId);
    });
    if (activeBtn) activeBtn.classList.add('active');
}

// 2. Render Header Information
function renderHeaderAndStatic() {
    document.getElementById('header-name').innerText = portfolioData.header.name;
    document.getElementById('about-text').innerText = portfolioData.header.bio;
    document.getElementById('profile-img').src = portfolioData.header.photo || "https://via.placeholder.com/150";
    
    // Links
    document.getElementById('link-linkedin').href = portfolioData.header.linkedin;
    document.getElementById('link-github').href = portfolioData.header.github;
    document.getElementById('link-email').href = `mailto:${portfolioData.header.email}`;

    // Education Information
    document.getElementById('edu-institution').innerText = portfolioData.education.school;
    document.getElementById('edu-degree').innerText = portfolioData.education.degree;
    document.getElementById('edu-description').innerText = portfolioData.education.desc;
    
    const eduLink = document.getElementById('edu-link');
    eduLink.innerText = portfolioData.education.link;
    eduLink.href = portfolioData.education.link;

    // Transcript Link
    const viewTranscriptBtn = document.getElementById('view-transcript-btn');
    if (portfolioData.header.transcriptPdf) {
        viewTranscriptBtn.href = portfolioData.header.transcriptPdf;
        viewTranscriptBtn.style.display = 'inline-flex';
    } else {
        viewTranscriptBtn.style.display = 'none';
    }

    // Embed PDF Resume
    const resumeContainer = document.getElementById('resume-viewer');
    if (portfolioData.header.resumePdf) {
        resumeContainer.innerHTML = `<iframe src="${portfolioData.header.resumePdf}" class="resume-iframe"></iframe>`;
    } else {
        resumeContainer.innerHTML = `<p class="placeholder-text">No PDF resume configured yet.</p>`;
    }
}

// 3. Star Ratings Builder
function getStarsHtml(rating) {
    let starsHtml = '';
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            starsHtml += '<i class="fas fa-star"></i>';
        } else if (i === fullStars + 1 && hasHalf) {
            starsHtml += '<i class="fas fa-star-half-alt"></i>';
        } else {
            starsHtml += '<i class="far fa-star"></i>';
        }
    }
    return starsHtml;
}

// 4. Render Skills Section with Dynamic Filters
function renderSkills() {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';

    const searchTerm = document.getElementById('skill-search').value.toLowerCase();
    const sortVal = document.getElementById('skill-sort').value;

    let filtered = portfolioData.skills.filter(s => 
        s.name.toLowerCase().includes(searchTerm) || 
        s.desc.toLowerCase().includes(searchTerm)
    );

    if (sortVal === "name-asc") {
        filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortVal === "rating-desc") {
        filtered.sort((a, b) => b.rating - a.rating);
    }

    filtered.forEach(skill => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${skill.name}</h4>
            <div class="card-underline"></div>
            <div class="stars-container">${getStarsHtml(skill.rating)}</div>
            <p class="card-desc">${skill.desc}</p>
            <p class="card-comment">${skill.comment ? `Comment: ${skill.comment}` : ''}</p>
        `;
        grid.appendChild(card);
    });
}

// 5. Render Projects Section Sorted Chronologically
function renderProjects() {
    const featuredGrid = document.getElementById('featured-projects-grid');
    const allGrid = document.getElementById('all-projects-grid');
    
    featuredGrid.innerHTML = '';
    allGrid.innerHTML = '';

    const sortedProjects = [...portfolioData.projects].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${proj.name}</h4>
            <div class="card-underline"></div>
            <span class="card-label">${proj.label || 'Project'}</span>
            <p class="card-desc">${proj.desc}</p>
            <p class="card-tech-stack"><strong>Tech Stack:</strong> ${proj.tech}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                ${proj.link ? `<a class="card-link" href="${proj.link}" target="_blank"><i class="fab fa-youtube"></i> View Project</a>` : '<span></span>'}
                <span class="card-comment" style="font-size:0.75rem">${proj.date}</span>
            </div>
        `;

        if (proj.featured) {
            featuredGrid.appendChild(card);
        } else {
            allGrid.appendChild(card);
        }
    });
}

// 6. Render Job Experiences
function renderExperiences() {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';

    portfolioData.experience.forEach(exp => {
        const card = document.createElement('div');
        card.className = 'experience-card';
        card.innerHTML = `
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap;">
                <div>
                    <h3>${exp.name}</h3>
                    <p style="color:var(--accent); font-weight:600; font-size:0.95rem;">${exp.tech} <span class="card-label" style="margin-left:8px">${exp.label}</span></p>
                </div>
                <span class="card-comment" style="font-weight:600;">${exp.date}</span>
            </div>
            <p class="card-desc" style="margin-top: 1rem;">${exp.desc}</p>
            ${exp.link ? `<p style="margin-top:0.5rem;"><a class="card-link" href="${exp.link}" target="_blank">Organization Webpage</a></p>` : ''}
        `;
        container.appendChild(card);
    });
}

// 7. Render Completed Academic Classes
function renderClasses() {
    const grid = document.getElementById('classes-grid');
    grid.innerHTML = '';

    portfolioData.education.classes.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${c.name}</h4>
            <div class="card-underline"></div>
            <span class="card-label">${c.label}</span>
            <p class="card-desc">${c.desc}</p>
            <p class="card-comment">Taken: ${c.semester}</p>
        `;
        grid.appendChild(card);
    });
}

// ================= SYSTEM INITIALIZATION =================
window.onload = function() {
    renderHeaderAndStatic();
    renderSkills();
    renderProjects();
    renderExperiences();
    renderClasses();
};
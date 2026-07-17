// =========================================================================
//  PORTFOLIO DATA CONFIGURATION
//  Edit these values directly to update your portfolio website!
// =========================================================================
const portfolioData = {
    header: {
        name: "Isaac Joseph Vass",
        linkedin: "www.linkedin.com/in/isaac-vass",
        email: "your.email@example.com",
        github: "https://github.com/IsaacVass",
        bio: "Passionate Computer Science student at California Baptist University. Interested in web development, backend architectures, and secure software development.",
        
        // Place your image and PDF files inside your GitHub repository, 
        // then link them here using their relative file names.
        photo: "profile.jpg",               // e.g., "profile.jpg" or a web url
        resumePdf: "resume.pdf",            // e.g., "resume.pdf"
        transcriptPdf: "transcript.pdf"     // e.g., "transcript.pdf"
    },
    education: {
        school: "California Baptist University",
        degree: "Bachelor of Computer Science",
        desc: "Pursuing a comprehensive curriculum in Computer Science. Gaining practical, hands-on experience in software methodologies, advanced mathematics, and project management.",
        link: "https://calbaptist.edu",
        
        classes: [
            { 
                name: "CSC 212: Data Structures", 
                label: "Core Major", 
                semester: "Fall 2025", 
                desc: "Analyzed memory allocation architectures, recursive practices, complexity profiling (Big O), trees, hash structures, and classical sorting algorithms." 
            },
            { 
                name: "CSC 313: Software Engineering", 
                label: "Major Requirement", 
                semester: "Spring 2026", 
                desc: "Practiced standard development lifecycles (SDLC) focusing on requirements gathering, user stories, systems analysis, and teamwork frameworks." 
            }
        ]
    },
    skills: [
        { name: "JavaScript", rating: 4.5, comment: "Daily use", desc: "Proficient in modern ES6 specifications, asynchronous programming, dynamic DOM operations, and data structures." },
        { name: "Python", rating: 4.0, comment: "Scripting and AI", desc: "Utilized for data structures assignments, server automation scripting, API designs, and core software prototypes." },
        { name: "CSS / Responsive Web Design", rating: 4.5, comment: "UI Layouts", desc: "Skilled in CSS Grid, Flexbox, responsive alignments, structural transitions, and professional framework styles." },
        { name: "Linux Systems", rating: 3.5, comment: "Operating Systems", desc: "Experienced with Unix environments, bash terminal utilities, standard git setups, and workspace configurations." }
    ],
    projects: [
        { 
            name: "Algorithm Visualizer Engine", 
            date: "2025-11", 
            featured: true, 
            label: "Academic Capstone", 
            tech: "HTML5, CSS3, JavaScript", 
            desc: "Designed and built an interactive system allowing users to step through sorting algorithm pipelines with graphical step-by-step tree logic.", 
            link: "https://github.com/yourprofile/project-repo" 
        },
        { 
            name: "Automated Student Scheduling Hub", 
            date: "2026-04", 
            featured: false, 
            label: "Group Project", 
            tech: "Node.js, Express, SQL", 
            desc: "Constructed a scheduling portal backend optimized with custom algorithms to resolve course conflicts across curriculum tracks.", 
            link: "https://github.com/yourprofile/project-repo" 
        }
    ],
    experience: [
        { 
            name: "Academic Peer Tutor", 
            date: "Sept 2025 - Present", 
            label: "Part-Time", 
            tech: "CBU Tutoring Center", 
            desc: "Led weekly instruction sessions assisting students in mastering introductory programming standards, discrete math properties, and debugging steps.", 
            link: "https://calbaptist.edu" 
        }
    ]
};


// =========================================================================
//  RENDERING ENGINE (No need to edit below this line)
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
    document.getElementById('link-github').href = `mailto:${portfolioData.header.github}`;
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

    // Sort: Newest Projects First (converts "YYYY-MM" to dates to compare)
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
                ${proj.link ? `<a class="card-link" href="${proj.link}" target="_blank"><i class="fab fa-github"></i> View Project</a>` : '<span></span>'}
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
// ================= APPLICATION STATE =================
// Default starting data in case localStorage is empty
const defaultData = {
    header: {
        name: "Alex Mercer",
        linkedin: "https://linkedin.com",
        email: "alex.mercer@cbu.edu",
        bio: "Passionate Computer Science student at California Baptist University. Interested in web development, backend architectures, and secure coding implementations.",
        photo: "https://via.placeholder.com/150",
        resumePdf: "", // Base64 or Blob URL string
        transcriptPdf: ""
    },
    education: {
        school: "California Baptist University",
        degree: "Bachelor of Computer Science",
        desc: "Currently working on a fast-paced Computer Science program. Learning fundamental data structures, database designs, and interactive GUI development.",
        link: "https://calbaptist.edu",
        classes: [
            { id: "c1", name: "CSC 212: Data Structures", label: "Core", semester: "Fall 2025", desc: "Learned advanced OOP concepts, memory allocation, lists, stacks, queues, trees, sorting algorithms, and hash tables." },
            { id: "c2", name: "CSC 313: Software Engineering", label: "Major", semester: "Spring 2026", desc: "Collaborated in an Agile project environment. Managed deployments and unit testing cycles." }
        ]
    },
    skills: [
        { id: "s1", name: "JavaScript", rating: 4.5, comment: "Used in most current side-projects", desc: "Experienced in ES6 standard, asynchronous programming, DOM manipulations, and local persistence." },
        { id: "s2", name: "Python", rating: 4.0, comment: "Primary scripting language", desc: "Utilized for algorithm implementations, scripting, data parsing, and minor backend API testing." },
        { id: "s3", name: "Linux / Bash", rating: 3.5, comment: "Proficient terminal navigator", desc: "Comfortable scripting environment setup, pipeline automations, and file permissions." }
    ],
    projects: [
        { id: "p1", name: "Interactive Smart Hub", date: "2026-03-15", featured: true, label: "IoT Portfolio", tech: "React, Node.js, Python", desc: "A dashboard designed to control and track IoT diagnostics, utilizing live web sockets.", link: "https://github.com" },
        { id: "p2", name: "Algorithm Visualizer", date: "2025-11-20", featured: false, label: "Academic", tech: "HTML5 Canvas, Vanilla JS", desc: "Created to visualize tree traversal processes and Dijkstra's pathfinding mechanics interactively.", link: "https://github.com" }
    ],
    experience: [
        { id: "e1", name: "IT Helpdesk Specialist", date: "2025-09", featured: false, label: "Part-Time", tech: "CBU Tech Support", desc: "Assisted students and professors with secure network access configurations, software troubleshooting, and hardware configurations.", link: "" }
    ]
};

// Global App State
let appData = {};

// Load data from localStorage or fallback to default data
function loadState() {
    const saved = localStorage.getItem('resumeAppData');
    if (saved) {
        try {
            appData = JSON.parse(saved);
        } catch (e) {
            console.error("Error loading data from localStorage, falling back to defaults", e);
            appData = { ...defaultData };
        }
    } else {
        appData = { ...defaultData };
    }
}

// Save data to localStorage
function saveState() {
    localStorage.setItem('resumeAppData', JSON.stringify(appData));
    console.log("State successfully committed to LocalStorage!");
}

// ================= TAB NAVIGATION =================
function switchTab(tabId) {
    // Hide all sections
    document.querySelectorAll('.tab-section').forEach(sec => sec.classList.remove('active'));
    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));

    // Show selected section
    document.getElementById(tabId).classList.add('active');
    
    // Highlight the active tab button
    const activeBtn = Array.from(document.querySelectorAll('.tab-btn')).find(btn => {
        return btn.getAttribute('onclick').includes(tabId);
    });
    if (activeBtn) activeBtn.classList.add('active');
}


// ================= PHOTO & FILE UPLOADS =================
function uploadPhoto(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.header.photo = e.target.result;
            document.getElementById('profile-img').src = e.target.result;
            saveState();
        };
        reader.readAsDataURL(file);
    }
}

function uploadResume(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.header.resumePdf = e.target.result;
            renderResume();
            saveState();
        };
        reader.readAsDataURL(file);
    }
}

function uploadTranscript(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            appData.header.transcriptPdf = e.target.result;
            renderTranscriptLink();
            saveState();
        };
        reader.readAsDataURL(file);
    }
}


// ================= RENDERING ENGINE =================

// 1. Header, Bio & Basic Info
function renderHeaderAndStatic() {
    document.getElementById('header-name').innerText = appData.header.name || "Alex Mercer";
    document.getElementById('about-text').innerText = appData.header.bio || "Write your bio...";
    document.getElementById('profile-img').src = appData.header.photo || "https://via.placeholder.com/150";
    
    // Links
    const li = document.getElementById('link-linkedin');
    li.href = appData.header.linkedin || "https://linkedin.com";
    
    const em = document.getElementById('link-email');
    em.href = `mailto:${appData.header.email || 'your.email@example.com'}`;

    // Education Static
    document.getElementById('edu-institution').innerText = appData.education.school;
    document.getElementById('edu-degree').innerText = appData.education.degree;
    document.getElementById('edu-description').innerText = appData.education.desc;
    
    const eduLink = document.getElementById('edu-link');
    eduLink.innerText = appData.education.link;
    eduLink.href = appData.education.link;

    renderTranscriptLink();
    renderResume();
}

function renderTranscriptLink() {
    const viewBtn = document.getElementById('view-transcript-btn');
    if (appData.header.transcriptPdf) {
        viewBtn.href = appData.header.transcriptPdf;
        viewBtn.style.display = 'inline-flex';
    } else {
        viewBtn.style.display = 'none';
    }
}

function renderResume() {
    const container = document.getElementById('resume-viewer');
    if (appData.header.resumePdf) {
        container.innerHTML = `<iframe src="${appData.header.resumePdf}" class="resume-iframe"></iframe>`;
    } else {
        container.innerHTML = `<p class="placeholder-text">No resume uploaded yet. Click the button above to upload a PDF resume.</p>`;
    }
}

// 2. Render Stars Helper
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

// 3. Render Skills Tab
function renderSkills() {
    const grid = document.getElementById('skills-grid');
    grid.innerHTML = '';

    const searchTerm = document.getElementById('skill-search').value.toLowerCase();
    const sortVal = document.getElementById('skill-sort').value;

    let filtered = appData.skills.filter(s => 
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
            <div class="card-actions">
                <button class="edit-card-btn" onclick="editItem('skills', '${skill.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-card-btn" onclick="deleteItem('skills', '${skill.id}')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// 4. Render Projects Tab
function renderProjects() {
    const featuredGrid = document.getElementById('featured-projects-grid');
    const allGrid = document.getElementById('all-projects-grid');
    
    featuredGrid.innerHTML = '';
    allGrid.innerHTML = '';

    // Sort projects chronologically descending by date (newest first)
    const sortedProjects = [...appData.projects].sort((a, b) => new Date(b.date) - new Date(a.date));

    sortedProjects.forEach(proj => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${proj.name}</h4>
            <div class="card-underline"></div>
            <span class="card-label">${proj.label || 'Personal'}</span>
            <p class="card-desc">${proj.desc}</p>
            <p class="card-tech-stack"><strong>Tech Stack:</strong> ${proj.tech}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: auto;">
                ${proj.link ? `<a class="card-link" href="${proj.link}" target="_blank"><i class="fab fa-github"></i> View Project</a>` : '<span>No Link</span>'}
                <span class="card-comment" style="font-size:0.75rem">${proj.date}</span>
            </div>
            <div class="card-actions">
                <button class="edit-card-btn" onclick="editItem('projects', '${proj.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-card-btn" onclick="deleteItem('projects', '${proj.id}')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;

        if (proj.featured) {
            featuredGrid.appendChild(card);
        } else {
            allGrid.appendChild(card);
        }
    });
}

// 5. Render Work Experience Tab
function renderExperiences() {
    const container = document.getElementById('experience-list');
    container.innerHTML = '';

    appData.experience.forEach(exp => {
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
            ${exp.link ? `<p style="margin-top:0.5rem;"><a class="card-link" href="${exp.link}" target="_blank">Company Site</a></p>` : ''}
            <div class="card-actions">
                <button class="edit-card-btn" onclick="editItem('experience', '${exp.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-card-btn" onclick="deleteItem('experience', '${exp.id}')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        container.appendChild(card);
    });
}

// 6. Render Education Classes Grid
function renderClasses() {
    const grid = document.getElementById('classes-grid');
    grid.innerHTML = '';

    appData.education.classes.forEach(c => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <h4>${c.name}</h4>
            <div class="card-underline"></div>
            <span class="card-label">${c.label}</span>
            <p class="card-desc">${c.desc}</p>
            <p class="card-comment">Taken: ${c.semester}</p>
            <div class="card-actions">
                <button class="edit-card-btn" onclick="editItem('classes', '${c.id}')"><i class="fas fa-edit"></i> Edit</button>
                <button class="delete-card-btn" onclick="deleteItem('classes', '${c.id}')"><i class="fas fa-trash"></i> Delete</button>
            </div>
        `;
        grid.appendChild(card);
    });
}


// ================= STATIC DATA SAVERS =================
function saveHeaderData() {
    appData.header.name = document.getElementById('header-name').innerText;
    saveState();
}

function saveBioData() {
    appData.header.bio = document.getElementById('about-text').innerText;
    saveState();
}

function saveEducationInfo() {
    appData.education.school = document.getElementById('edu-institution').innerText;
    appData.education.degree = document.getElementById('edu-degree').innerText;
    appData.education.desc = document.getElementById('edu-description').innerText;
    appData.education.link = document.getElementById('edu-link').innerText;
    saveState();
}


// ================= HEADER LINKS MODAL =================
function editHeaderLinks() {
    document.getElementById('input-linkedin').value = appData.header.linkedin;
    document.getElementById('input-email').value = appData.header.email;
    document.getElementById('links-modal').classList.add('active');
}

function closeLinksModal() {
    document.getElementById('links-modal').classList.remove('active');
}

function saveHeaderLinks() {
    appData.header.linkedin = document.getElementById('input-linkedin').value;
    appData.header.email = document.getElementById('input-email').value;
    
    closeLinksModal();
    renderHeaderAndStatic();
    saveState();
}


// ================= DYNAMIC MODALS SYSTEM (ADD/EDIT) =================
const modal = document.getElementById('modal-overlay');
const formFields = document.getElementById('dynamic-form-fields');

function openModal(title, type, id = '') {
    document.getElementById('modal-title').innerText = title;
    document.getElementById('form-item-type').value = type;
    document.getElementById('form-item-id').value = id;
    
    formFields.innerHTML = ''; // Clear previous fields
    buildFormFields(type, id);
    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

// Generate the specific forms based on what section we are editing
function buildFormFields(type, id) {
    let item = {};
    
    // Find active object if editing
    if (id) {
        if (type === 'skills') item = appData.skills.find(s => s.id === id);
        if (type === 'projects') item = appData.projects.find(p => p.id === id);
        if (type === 'experience') item = appData.experience.find(e => e.id === id);
        if (type === 'classes') item = appData.education.classes.find(c => c.id === id);
    }

    if (type === 'skills') {
        formFields.innerHTML = `
            <div class="form-group">
                <label for="f-skill-name">Skill / OS Name</label>
                <input type="text" id="f-skill-name" value="${item.name || ''}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="f-skill-rating">Proficiency Stars (0.5 to 5)</label>
                    <input type="number" id="f-skill-rating" step="0.5" min="0.5" max="5" value="${item.rating || 5}" required>
                </div>
                <div class="form-group">
                    <label for="f-skill-comment">Brief Comment</label>
                    <input type="text" id="f-skill-comment" value="${item.comment || ''}" placeholder="e.g., Daily use">
                </div>
            </div>
            <div class="form-group">
                <label for="f-skill-desc">Description</label>
                <textarea id="f-skill-desc" rows="3" required>${item.desc || ''}</textarea>
            </div>
        `;
    } 
    else if (type === 'projects') {
        formFields.innerHTML = `
            <div class="form-group">
                <label for="f-proj-name">Project Name</label>
                <input type="text" id="f-proj-name" value="${item.name || ''}" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="f-proj-label">Label</label>
                    <input type="text" id="f-proj-label" value="${item.label || ''}" placeholder="e.g. Web App, Academic">
                </div>
                <div class="form-group">
                    <label for="f-proj-date">Date Created</label>
                    <input type="date" id="f-proj-date" value="${item.date || ''}" required>
                </div>
            </div>
            <div class="form-group">
                <label for="f-proj-tech">Tech Stack</label>
                <input type="text" id="f-proj-tech" value="${item.tech || ''}" placeholder="e.g. HTML, CSS, JavaScript" required>
            </div>
            <div class="form-group">
                <label for="f-proj-link">Project Link / Repo URL</label>
                <input type="url" id="f-proj-link" value="${item.link || ''}">
            </div>
            <div class="form-group">
                <label for="f-proj-desc">Description</label>
                <textarea id="f-proj-desc" rows="3" required>${item.desc || ''}</textarea>
            </div>
            <div class="form-group" style="display:flex; gap:10px; align-items:center;">
                <input type="checkbox" id="f-proj-featured" ${item.featured ? 'checked' : ''} style="width:auto;">
                <label for="f-proj-featured" style="margin-bottom:0; cursor:pointer;">Feature this project on top</label>
            </div>
        `;
    } 
    else if (type === 'experience') {
        formFields.innerHTML = `
            <div class="form-group">
                <label for="f-exp-name">Role / Title Name</label>
                <input type="text" id="f-exp-name" value="${item.name || ''}" placeholder="e.g. Frontend Developer Intern" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="f-exp-label">Job Type</label>
                    <input type="text" id="f-exp-label" value="${item.label || ''}" placeholder="e.g. Part-Time, Remote">
                </div>
                <div class="form-group">
                    <label for="f-exp-date">Dates Employed</label>
                    <input type="text" id="f-exp-date" value="${item.date || ''}" placeholder="e.g. June 2025 - Present" required>
                </div>
            </div>
            <div class="form-group">
                <label for="f-exp-tech">Company Name or Team</label>
                <input type="text" id="f-exp-tech" value="${item.tech || ''}" required>
            </div>
            <div class="form-group">
                <label for="f-exp-link">Company Link</label>
                <input type="url" id="f-exp-link" value="${item.link || ''}">
            </div>
            <div class="form-group">
                <label for="f-exp-desc">Responsibilities / Accomplishments</label>
                <textarea id="f-exp-desc" rows="4" required>${item.desc || ''}</textarea>
            </div>
        `;
    } 
    else if (type === 'classes') {
        formFields.innerHTML = `
            <div class="form-group">
                <label for="f-cls-name">Course Name & Code</label>
                <input type="text" id="f-cls-name" value="${item.name || ''}" placeholder="e.g. CSC 212: Data Structures" required>
            </div>
            <div class="form-row">
                <div class="form-group">
                    <label for="f-cls-label">Course Category</label>
                    <input type="text" id="f-cls-label" value="${item.label || ''}" placeholder="e.g. Core, Elective">
                </div>
                <div class="form-group">
                    <label for="f-cls-semester">Semester Taken</label>
                    <input type="text" id="f-cls-semester" value="${item.semester || ''}" placeholder="e.g. Fall 2025" required>
                </div>
            </div>
            <div class="form-group">
                <label for="f-cls-desc">Course Description</label>
                <textarea id="f-cls-desc" rows="3" required>${item.desc || ''}</textarea>
            </div>
        `;
    }
}

// Open modals for specific types
function openSkillModal() { openModal('Add Technical Skill', 'skills'); }
function openProjectModal() { openModal('Add Project Card', 'projects'); }
function openExperienceModal() { openModal('Add Work Experience', 'experience'); }
function openClassModal() { openModal('Add Completed Class', 'classes'); }

// Edit triggered by item actions
function editItem(type, id) {
    const title = `Edit ${type.charAt(0).toUpperCase() + type.slice(1)}`;
    openModal(title, type, id);
}

// Handle submitting structural changes
function handleModalSubmit(event) {
    event.preventDefault();
    const type = document.getElementById('form-item-type').value;
    const id = document.getElementById('form-item-id').value;
    
    let targetArray;
    if (type === 'skills') targetArray = appData.skills;
    if (type === 'projects') targetArray = appData.projects;
    if (type === 'experience') targetArray = appData.experience;
    if (type === 'classes') targetArray = appData.education.classes;

    let targetItem = id ? targetArray.find(x => x.id === id) : {};

    if (type === 'skills') {
        targetItem.name = document.getElementById('f-skill-name').value;
        targetItem.rating = parseFloat(document.getElementById('f-skill-rating').value);
        targetItem.comment = document.getElementById('f-skill-comment').value;
        targetItem.desc = document.getElementById('f-skill-desc').value;
    } 
    else if (type === 'projects') {
        targetItem.name = document.getElementById('f-proj-name').value;
        targetItem.label = document.getElementById('f-proj-label').value;
        targetItem.date = document.getElementById('f-proj-date').value;
        targetItem.tech = document.getElementById('f-proj-tech').value;
        targetItem.link = document.getElementById('f-proj-link').value;
        targetItem.desc = document.getElementById('f-proj-desc').value;
        targetItem.featured = document.getElementById('f-proj-featured').checked;
    } 
    else if (type === 'experience') {
        targetItem.name = document.getElementById('f-exp-name').value;
        targetItem.label = document.getElementById('f-exp-label').value;
        targetItem.date = document.getElementById('f-exp-date').value;
        targetItem.tech = document.getElementById('f-exp-tech').value;
        targetItem.link = document.getElementById('f-exp-link').value;
        targetItem.desc = document.getElementById('f-exp-desc').value;
    } 
    else if (type === 'classes') {
        targetItem.name = document.getElementById('f-cls-name').value;
        targetItem.label = document.getElementById('f-cls-label').value;
        targetItem.semester = document.getElementById('f-cls-semester').value;
        targetItem.desc = document.getElementById('f-cls-desc').value;
    }

    if (!id) {
        // Adding a new item
        targetItem.id = type.charAt(0) + Date.now();
        targetArray.push(targetItem);
    }

    // Save and re-render everything
    saveState();
    closeModal();
    
    if (type === 'skills') renderSkills();
    if (type === 'projects') renderProjects();
    if (type === 'experience') renderExperiences();
    if (type === 'classes') renderClasses();
}

// Delete item confirmation
function deleteItem(type, id) {
    if (confirm("Are you sure you want to delete this item?")) {
        if (type === 'skills') {
            appData.skills = appData.skills.filter(x => x.id !== id);
            renderSkills();
        } else if (type === 'projects') {
            appData.projects = appData.projects.filter(x => x.id !== id);
            renderProjects();
        } else if (type === 'experience') {
            appData.experience = appData.experience.filter(x => x.id !== id);
            renderExperiences();
        } else if (type === 'classes') {
            appData.education.classes = appData.education.classes.filter(x => x.id !== id);
            renderClasses();
        }
        saveState();
    }
}


// ================= SYSTEM INITIALIZATION =================
window.onload = function() {
    loadState();
    renderHeaderAndStatic();
    renderSkills();
    renderProjects();
    renderExperiences();
    renderClasses();
};
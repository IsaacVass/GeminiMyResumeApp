document.addEventListener('DOMContentLoaded', function() {

    // Skill Data (example) - Define this here initially
    const skills = [
        { name: "JavaScript", description: "A versatile programming language...", proficiency: 50 }, //Scale of 1-5
        { name: "HTML/CSS", description: "Foundation for web design.", proficiency: 40}
     ];

   // Project Data (example) - Define this here initially
    const projects = [
        { name: 'Project 1', label:'Description', descr:"Detailed explanation of what it is, how it works etc. ", techStack: "HTML, CSS, JavaScript", link:"[project url]"}
     ];

  // Add skills dynamically
   skills.forEach(skill => {
    const skillList = document.getElementById("skillList"); // Get reference to the element where the list will be inserted
    const listItem = document.createElement('li'); 
    listItem.textContent = skill.name + " - " + skill.proficiency;  // Display Skill name and proficiency
    skillList.appendChild(listItem);   
   });


    // Tab functionality (Simplified example)

    const tabs = document.querySelectorAll('#tabs li'); //Get references to the tab buttons
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
             // This is a minimal example -- you'd need more sophisticated logic 
            console.log("Tab clicked: " + this.textContent);
        });
    });

});
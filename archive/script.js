// Get the container element where the projects will be added
let container = document.getElementById("projects");

// Read the JSON data from the projects_data.json file
fetch("projects_data.json")
  .then(response => response.json())
  .then(data => {

    // Loop through the projects in the JSON data
    for (let i = 0; i < data.featuredProjects.length; i++) {
        let project = data.featuredProjects[i];

        // Create a new div element for the project
        let projectDiv = document.createElement("div");
        projectDiv.classList.add("project");

        // Create an h3 element for the project name
        let projectName = document.createElement("h3");
        projectName.innerHTML = project.name;

        // Create an img element for the project image
        let projectImg = document.createElement("img");
        projectImg.src = project.imageUrl;
        projectImg.alt = project.name;

        // Create a p element for the project description
        let projectDescription = document.createElement("p");
        projectDescription.innerHTML = project.description;

        // Create a link element for the tutorial
        let projectLink = document.createElement("a");
        projectLink.href = project.tutorialUrl;
        projectLink.innerHTML = "Learn More";
        projectLink.classList.add("button");

        // Append the project name, image, description and link to the project div
        projectDiv.appendChild(projectName);
        projectDiv.appendChild(projectImg);
        projectDiv.appendChild(projectDescription);
        projectDiv.appendChild(projectLink);

        // Append the project div to the container
        container.appendChild(projectDiv);
    }
  })
  .catch(error => console.error("Error:", error));


// Get all the project links (i.e., the "Learn More" buttons)
let projectLinks = document.querySelectorAll(".project .button");

// Add a click event listener to each project link
projectLinks.forEach(link => {
    link.addEventListener("click", function(event) {
        event.preventDefault(); // prevents the link from following its default behavior
        // Get the tutorial URL from the link's href attribute
        let tutorialUrl = this.getAttribute("href");
        // Redirect the user to the tutorial page
        window.location.href = tutorialUrl;
    });
});

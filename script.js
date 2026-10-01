//1. Create the HTML Structure
//1.1
//Create input fields for the post title and post content.
let taskForm = document.getElementById("taskForm");
let taskName = document.getElementById("taskName");
let taskContent = document.getElementById("taskContent");
let titleError = document.getElementById("titleError");
let contentError = document.getElementById("contentError");

//1.2
//Include a “Submit Post” button that will add the post to the post list.

let submitButton = document.getElementById("submitButton");

// Store all posts in an array
let posts = [];

// Keep track of which post is being edited
let editingPostId = null;

// Load posts from local storage
let savedPosts = localStorage.getItem("posts");

if (savedPosts) {
    posts = JSON.parse(savedPosts);
}

// Display saved posts when the page loads
displayPosts();

// Handle form submission
taskForm.addEventListener("submit", function (event) {

    // Prevent the page from refreshing
    event.preventDefault();

    // Clear previous error messages
    titleError.textContent = "";
    contentError.textContent = "";

    let title = taskName.value.trim();
    let content = taskContent.value.trim();

    // Validate the title
    if (title === "") {
        titleError.textContent = "Please enter a post title.";
        return;
    }

    // Validate the content
    if (content === "") {
        contentError.textContent = "Please enter some post content.";
        return;
    }

    // Check if we are editing an existing post
    if (editingPostId !== null) {

        // Find the post being edited
        let post = posts.find(function (post) {
            return post.id === editingPostId;
        });

        // Update the post
        post.title = title;
        post.content = content;

        // Stop editing
        editingPostId = null;

        // Change button text back
        submitButton.textContent = "Submit Post";

    } else {

        //1.3
        //Each post should be stored as an object with properties
        //such as title, content, ID, and timestamp.
        let newPost = {
            id: Date.now(),
            title: title,
            content: content,
            timestamp: new Date().toLocaleString()
        };

        //1.4
        //Add the post object to an array that holds all posts.
        posts.push(newPost);
    }

    // Save posts
    keepPosts();

    // Display posts
    displayPosts();

    // Clear the input fields
    taskName.value = "";
    taskContent.value = "";
});

//2.1
//Create an HTML structure (such as an unordered list or table)
//to display the post list.
let taskList = document.getElementById("taskList");

//2.2
//For each post, display the post title and content.

//2.3
//Dynamically update the post list in the browser each time
//a new post is added, edited, or deleted.

function displayPosts() {

    // Clear the current post list
    taskList.innerHTML = "";

    // Display each post
    posts.forEach(function (post) {

        // Create a list item
        let listItem = document.createElement("li");

        // Display post title
        let postTitle = document.createElement("h3");
        postTitle.textContent = post.title;

        // Display post content
        let postContent = document.createElement("p");
        postContent.textContent = post.content;

        // Display timestamp
        let postTime = document.createElement("small");
        postTime.textContent = "Posted: " + post.timestamp;

        // Create Edit button
        let editButton = document.createElement("button");

        editButton.textContent = "Edit";
        editButton.classList.add("editButton");
        editButton.dataset.id = post.id;

        // Create Delete button
        let deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.classList.add("deleteButton");
        deleteButton.dataset.id = post.id;

        // Add post information to the list item
        listItem.appendChild(postTitle);
        listItem.appendChild(postContent);
        listItem.appendChild(postTime);
        listItem.appendChild(editButton);
        listItem.appendChild(deleteButton);

        // Add the list item to the post list
        taskList.appendChild(listItem);
    });
}

//3. Delete and Edit Posts
//3.1
//Use event delegation to handle Edit and Delete buttons.
taskList.addEventListener("click", function (event) {

    // Get the post ID from the button
    let postId = Number(event.target.dataset.id);

    //3.2
    //Delete the selected post.
    if (event.target.classList.contains("deleteButton")) {
        // Remove the post from the array
        posts = posts.filter(function (post) {
            return post.id !== postId;
        });

        // Save the updated posts
        keepPosts();

        // Display the updated posts
        displayPosts();
    }

    //3.3
    //Edit the selected post.
    if (event.target.classList.contains("editButton")) {
        // Find the selected post
        let post = posts.find(function (post) {
            return post.id === postId;
        });

        // Put the post information into the form
        taskName.value = post.title;
        taskContent.value = post.content;

        // Remember which post is being edited
        editingPostId = postId;

        // Change the button text
        submitButton.textContent = "Update Post";

        // Put the cursor in the title field
        taskName.focus();
    }
});


//4. Persisting Post Data with Local Storage
//4.1
//Use local storage to save the current state of the post list
//so that posts are restored when the page is refreshed.

function keepPosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

//4.2
//Ensure that post data (including title, content, ID,
//and timestamp) is stored and retrieved correctly.

function loadPosts() {
    let savedPosts = localStorage.getItem("posts");
    if (savedPosts) {
        posts = JSON.parse(savedPosts);
    }
}

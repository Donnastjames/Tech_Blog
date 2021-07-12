const saveNewBlogPostHandler = async (event) => {
  event.preventDefault();
  // Collect values from the /newBlogPost form
  const title = document.querySelector("#newBlogPostTitle").value.trim();
  const content = document.querySelector("#newBlogPostContent").value.trim();

  // title and content are required to create a new blogPost
  if (title && content) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/blogPosts", {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser to the dashboard
      document.location.assign("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".newBlogPostForm")
  .addEventListener("click", saveNewBlogPostHandler);

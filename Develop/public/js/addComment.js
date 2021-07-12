const saveNewCommentHandler = async (event) => {
  event.preventDefault();
  // Collect values from the /newComment form
  const url = window.location.href;
  const blog_post_id = url.substring(url.lastIndexOf('/') + 1);
  const comment = document.querySelector("#newBlogComment").value.trim();

  // title and content are required to create a new blogPost
  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/newComment", {
      method: "POST",
      body: JSON.stringify({ comment, blog_post_id }),
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
  .querySelector(".newCommentForm")
  .addEventListener("click", saveNewCommentHandler);
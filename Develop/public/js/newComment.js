const saveNewCommentHandler = async (event) => {
  event.preventDefault();
  // Collect values from the /newComment form
  const blog_post_id = event.target.getAttribute("data-id");
  const comment = document.querySelector("#newBlogComment").value.trim();

  // title and content are required to create a new blogPost
  if (comment) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/blogComments", {
      method: "POST",
      body: JSON.stringify({ comment, blog_post_id }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      // If successful, redirect the browser back to the same Blog Post
      document.location.assign(`/api/blogPosts/${blog_post_id}`);
    } else {
      alert(response.statusText);
    }
  }
};

document
  .querySelector(".newCommentForm")
  .addEventListener("click", saveNewCommentHandler);
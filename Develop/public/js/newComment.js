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

// https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery
// This newComment.js file is loaded only when viewing a Blog Post,
// so we can store the last viewed Blog Post id in local storage ...
const url = window.location.href;
const lastViewedBlogPostId = url.substring(url.lastIndexOf('/') + 1);
localStorage.setItem('lastViewedBlogPostId', lastViewedBlogPostId);
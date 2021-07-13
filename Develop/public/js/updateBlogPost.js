const updateFormHandler = async (event) => {
  event.preventDefault();
  console.log('updateFormHandler() called!');
  const url = window.location.href;
  console.log('url:', url);
  // https://stackoverflow.com/questions/3730359/get-id-from-url-with-jquery
  const urlParts = url.split('/');
  const id = urlParts[urlParts.length - 2];
  console.log('id:', id);
  const title = document.getElementById("blogPostTitle").value.trim();
  const content = document.getElementById("blogPostContent").value.trim();
  console.log('title:', title);
  console.log('content:', content);

  if (title && content) {
    const response = await fetch(`/api/blogPosts/${id}/update`, {
      method: "PUT",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to update blog post!");
    }
  }
};

const deleteButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogPosts/${id}/update`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete blog post");
    }
  } else {
    alert("Delete button did not have a data-id");
  }
};

document
  .querySelector("#delete-post-btn")
  .addEventListener("click", deleteButtonHandler);

document
  .querySelector(".updateBlogPostForm")
  .addEventListener("submit", updateFormHandler);
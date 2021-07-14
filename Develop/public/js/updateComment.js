const updateCommentHandler = async (event) => {
  event.preventDefault();
  const id = event.target.getAttribute("data-id");
  const comment = document.getElementById("blogComment").value.trim();

  if (comment) {
    const response = await fetch(`/api/blogComments/${id}/update`, {
      method: "PUT",
      body: JSON.stringify({ comment }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.assign(`/api/blogPosts/${id}`);
    } else {
      alert("Failed to update comment!");
    }
  }
};

const deleteCommentHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");

    const response = await fetch(`/api/blogComments/${id}/update`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.assign(`/api/blogPosts/${id}`);
    } else {
      alert("Failed to delete comment");
    }
  } else {
    alert("Delete button did not have a data-id");
  }
};

document
  .querySelector('.updateCommentForm')
  .addEventListener('submit', updateCommentHandler);

document
  .querySelector('#delete-comment-btn')
  .addEventListener('click', deleteCommentHandler);
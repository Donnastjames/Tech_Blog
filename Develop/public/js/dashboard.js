const newPostButtonHandler = async () => {
  document.location.assign('/api/blogPosts');
}

document.querySelector('#newPostBtn').addEventListener('click', newPostButtonHandler);
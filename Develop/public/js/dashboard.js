const newPostButtonHandler = async () => {
  document.location.replace('/api/blogPosts');
}

document.querySelector('#newPostBtn').addEventListener('click', newPostButtonHandler);
// Import the posts_new.json file
const posts = require('./posts_new.json');

// Function to find a post by ID
function findPostById(postId) {
  return posts.find(post => post.postid === postId);
}

// Vercel serverless function
module.exports = (req, res) => {
  // Extract the PostID from the request URL
  const postId = req.url.substring(1);

  // Find the post with the given PostID
  const post = findPostById(postId);

  // If the post is found, return the title and image
  if (post) {
    const { title, metaValue } = post;
    res.status(200).send(`
      <h1>${title}</h1>
      <img src="${metaValue}" alt="${title}">
    `);
  } else {
    // If the post is not found, return a 404 response
    res.status(404).send('Post not found');
  }
};

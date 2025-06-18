document.addEventListener("DOMContentLoaded", function () {
  const latestBlogLink = document.getElementById("latest-blog-link");

  if (!latestBlogLink) return;

  fetch("/null-log/blog/blog_index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to fetch blog_index.json");
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // 配列の先頭が最新記事とする
        const latest = data[0];
        latestBlogLink.href = `/null-log/blog/${latest.file}`;
        latestBlogLink.textContent = `Latest Blog: ${latest.title}`;
      } else {
        latestBlogLink.textContent = "No blog posts found.";
      }
    })
    .catch((error) => {
      console.error("Error loading latest blog:", error);
      latestBlogLink.textContent = "Error loading latest blog.";
    });
});

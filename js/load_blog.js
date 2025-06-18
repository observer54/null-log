document.addEventListener("DOMContentLoaded", function () {
  const latestBlogLink = document.getElementById("latest-blog-link");

  if (!latestBlogLink) return;

  fetch("blog/index.json")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not OK");
      }
      return response.json();
    })
    .then((data) => {
      if (Array.isArray(data) && data.length > 0) {
        // 最新の記事（最も日付が新しいもの）を取得
        const sorted = data.sort((a, b) => (a.date < b.date ? 1 : -1));
        const latest = sorted[0];
        latestBlogLink.href = `blog/${latest.file}`;
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


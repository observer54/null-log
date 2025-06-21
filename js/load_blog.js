function findLatestBlog(data) {
  let latestDate = "";
  let latestPath = "";
  let latestTitle = "";

  for (const [month, entries] of Object.entries(data)) {
    entries.forEach(entry => {
      const match = entry.file.match(/^(\d{4}-\d{2}-\d{2})_blog\.html$/);
      if (match) {
        const date = match[1];
        if (date > latestDate) {
          latestDate = date;
          latestPath = `${month}/${entry.file}`;
          latestTitle = entry.title;
        }
      }
    });
  }

  return { path: latestPath, title: latestTitle };
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("blog-list");
  const latestBlogLink = document.getElementById("latest-blog-link");

  // 🔍 GitHub Pages対応
  const root = window.location.pathname.includes("/blog/") ? "/null-log/blog/" : "blog/";

  try {
    const res = await fetch(`${root}blog_index.json`);
    const data = await res.json();

    // 🔗 最新リンク
    const latest = findLatestBlog(data);
    if (latestBlogLink && latest.path) {
      latestBlogLink.href = `${root}${latest.path}`;
      latestBlogLink.textContent = `Latest Blog: ${latest.title}`;
    }

    // 🗂️ リスト描画
    if (container) {
      for (const [month, entries] of Object.entries(data)) {
        if (!entries.length) continue;

        const section = document.createElement("section");
        const h3 = document.createElement("h3");
        h3.textContent = month;

        const ul = document.createElement("ul");
        entries.forEach(entry => {
          const li = document.createElement("li");
          const a = document.createElement("a");
          a.href = `${root}${month}/${entry.file}`;
          a.textContent = entry.title || entry.file;
          li.appendChild(a);
          ul.appendChild(li);
        });

        section.appendChild(h3);
        section.appendChild(ul);
        container.appendChild(section);
      }
    }
  } catch (e) {
    if (container) container.textContent = "⚠️ Failed to load blog entries.";
    console.error("Error loading blog list:", e);
  }
});

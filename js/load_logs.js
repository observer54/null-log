
function findLatestLog(data) {
  let latestDate = "";
  let latestPath = "";
  for (const [month, files] of Object.entries(data)) {
    files.forEach(file => {
      const match = file.match(/^(\d{4}-\d{2}-\d{2})_observation_log\.html$/);
      if (match) {
        const date = match[1];
        if (date > latestDate) {
          latestDate = date;
          latestPath = `${month}/${file}`;
        }
      }
    });
  }
  return latestPath;
}

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("log-list");
  try {
    const res = await fetch("/null-log/logs/index.json");  // ✅ パスを修正
    const data = await res.json();

    // ⏩ 最新ログリンクの設定
    const latestPath = findLatestLog(data);
    const latestLink = document.getElementById("latest-log-link");
    if (latestLink && latestPath) {
      latestLink.href = latestPath;
    }

    // 🗂 通常のログリスト描画
    for (const [month, files] of Object.entries(data)) {
      const section = document.createElement("section");
      const h3 = document.createElement("h3");
      h3.textContent = month;
      const ul = document.createElement("ul");
      files.forEach(file => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = `${month}/${file}`;
        a.textContent = file.replace(".html", "");
        li.appendChild(a);
        ul.appendChild(li);
      });
      section.appendChild(h3);
      section.appendChild(ul);
      container.appendChild(section);
    }
  } catch (e) {
    container.textContent = "⚠️ Could not load logs/index.json.";
  }
});

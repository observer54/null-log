
document.addEventListener("DOMContentLoaded", async () => {
  const container = document.getElementById("log-list");
  try {
    const res = await fetch("index.json");
    const data = await res.json();
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
    container.textContent = "⚠️ Could not load index.json.";
  }
});

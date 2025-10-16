// static/js/app.js
const apiBase = "/api/books";

async function fetchBooks() {
  try {
    const res = await fetch(apiBase);
    const books = await res.json();
    renderBooks(books);
  } catch (err) {
    console.error("Fetch books error:", err);
  }
}

function renderBooks(books) {
  const tbody = document.getElementById("books-body");
  tbody.innerHTML = "";
  books.forEach(book => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${book.id ?? ""}</td>
      <td>${escapeHtml(book.title)}</td>
      <td>${escapeHtml(book.author)}</td>
      <td>${escapeHtml(book.description)}</td>
      <td>${book.rating}</td>
      <td>
        <button class="btn-edit" data-id="${book.id}">Edit</button>
        <button class="btn-del" data-id="${book.id}">Delete</button>
      </td>
    `;
    tbody.appendChild(tr);
  });

  document.getElementById("book-count").textContent = books.length;

  // attach handlers
  document.querySelectorAll(".btn-edit").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      const row = btn.closest("tr");
      fillFormFromRow(row);
    });
  });

  document.querySelectorAll(".btn-del").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.getAttribute("data-id");
      if (!confirm("Delete book id " + id + " ?")) return;
      await deleteBook(id);
      fetchBooks();
    });
  });
}

function fillFormFromRow(row) {
  const id = row.children[0].textContent;
  const title = row.children[1].textContent;
  const author = row.children[2].textContent;
  const description = row.children[3].textContent;
  const rating = row.children[4].textContent;

  document.getElementById("book-id").value = id;
  document.getElementById("title").value = title;
  document.getElementById("author").value = author;
  document.getElementById("description").value = description;
  document.getElementById("rating").value = rating;
}

async function deleteBook(id) {
  await fetch(`${apiBase}/${id}`, { method: "DELETE" });
}

async function saveBook(e) {
  e.preventDefault();
  const id = document.getElementById("book-id").value;
  const payload = {
    title: document.getElementById("title").value.trim(),
    author: document.getElementById("author").value.trim(),
    description: document.getElementById("description").value.trim(),
    rating: parseInt(document.getElementById("rating").value, 10)
  };

  const opts = {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  };

  if (id) {
    await fetch(`${apiBase}/${id}`, { method: "PUT", ...opts });
  } else {
    await fetch(apiBase, { method: "POST", ...opts });
  }

  clearForm();
  fetchBooks();
}

function clearForm() {
  document.getElementById("book-form").reset();
  document.getElementById("book-id").value = "";
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

document.getElementById("book-form").addEventListener("submit", saveBook);
document.getElementById("clear-btn").addEventListener("click", clearForm);

// initial load
fetchBooks();

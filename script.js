let myBooks = [];

function getGenreIcon(genre) {
    const icons = {
        "Sci-Fi": "🚀",
        "Horror": "👻",
        "Comedy": "😂",
        "Drama": "🎭",
        "Fantasy": "🧙‍♂️",
        "Mystery": "🕵️‍♂️",
        "Romance": "❤️",
        "Default": "📖"
    };
    return icons[genre] || icons["Default"];
}

/* AI assisted me */
function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");

    // Save user preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}

// Apply dark mode if previously selected
window.onload = function () {
    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
    }
};

function addNewBook() {
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const genre = document.getElementById("genre").value;
    const status = document.getElementById("status").value;
    const rating = document.getElementById("rating").value;

    if (!title || !author || !genre) {
        alert("Please fill out all fields!");
        return;
    }

    myBooks.push({ title, author, genre, status, rating });
    displayBooks();
}

function displayBooks() {
    const bookList = document.getElementById("bookList");
    bookList.innerHTML = "";

    myBooks.forEach((book, index) => {
        const li = document.createElement("li");
        li.className = `list-group-item book-item ${book.status === "Completed" ? "completed" : ""}`;
        li.innerHTML = `
            ${getGenreIcon(book.genre)} <strong>${book.title}</strong> by ${book.author} - ${book.genre} 
            (${book.rating} ⭐)
            <select onchange="changeBookStatus(${index}, this.value)">
                <option value="To Read" ${book.status === "To Read" ? "selected" : ""}>To Read</option>
                <option value="In Progress" ${book.status === "In Progress" ? "selected" : ""}>In Progress</option>
                <option value="Completed" ${book.status === "Completed" ? "selected" : ""}>Completed</option>
            </select>
            <button class="btn btn-danger btn-sm float-end" onclick="removeBook(${index})">Remove</button>
        `;
        bookList.appendChild(li);
    });
}

function changeBookStatus(index, status) {
    myBooks[index].status = status;
    if (status === "Completed") {
        let sound = document.getElementById("celebrationSound");
        if (sound) {
            sound.volume = 0.3;
            sound.play();
        }
        alert("Congratulations! You completed a book!");
    }
    displayBooks();
}

function removeBook(index) {
    myBooks.splice(index, 1);
    displayBooks();
}

function searchForBook() {
    const query = document.getElementById("search").value.toLowerCase();
    myBooks = myBooks.filter(book => 
        book.title.toLowerCase().includes(query) || 
        book.author.toLowerCase().includes(query)
    );
    displayBooks();
}

function sortBooks(criteria) {
    myBooks.sort((a, b) => a[criteria].localeCompare(b[criteria]));
    displayBooks();
}

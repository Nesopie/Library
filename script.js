let myLibrary = [];

function Book(title,author,pages,pagesRead,read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.pagesRead = pagesRead;
}

function addBookToLibrary(newBook) {
    myLibrary.push(newBook);
    createBook(newBook);
}

function createBook(newBook) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");
    bookCard.classList.add(`${myLibrary.length}`);

    const title = document.createElement("div");
    title.classList.add("bookItem");
    title.innerText = `Title : ${newBook.title}`;

    const author = document.createElement("div");
    author.classList.add("bookItem");
    author.innerText = `Author : ${newBook.author}`;

    const pages = document.createElement("div");
    pages.classList.add("bookItem");
    pages.innerText = `Number of Pages : ${newBook.pages}`;

    const pagesRead = document.createElement("div");
    pagesRead.classList.add("bookItem");
    pagesRead.innerText = `Pages Completed : ${newBook.pagesRead}`;

    const bookCardBtns = document.createElement("div");
    bookCardBtns.classList.add("bookCardBtns");

    const edit = document.createElement("button");
    edit.classList.add("editBtn");
    edit.classList.add("cardBtn");
    edit.innerText = "Edit";

    const remove = document.createElement("button");
    remove.classList.add("removeBtn");
    remove.classList.add("cardBtn");
    remove.innerText = "Remove";

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type","checkbox");
    checkbox.setAttribute("id",`switch${myLibrary.length}`);
    checkbox.classList.add("checkbox");

    const label = document.createElement("label");
    label.setAttribute("for",`switch${myLibrary.length}`);
    label.classList.add("toggle");
    const para = document.createElement("p");
    para.innerText = "Read";
    label.appendChild(para);

    bookCard.appendChild(title);
    bookCard.appendChild(author);
    bookCard.appendChild(pages);
    bookCard.appendChild(pagesRead);

    bookCardBtns.appendChild(edit);
    bookCardBtns.appendChild(remove);
    bookCardBtns.appendChild(checkbox);
    bookCardBtns.appendChild(label);

    bookCard.appendChild(bookCardBtns);

    const addCard = document.querySelector(".addCard");
    const cards = document.querySelector(".cards");
    cards.insertBefore(bookCard,addCard);
}

let inputs = document.querySelectorAll("input");

inputs.forEach((input) =>{
    input.addEventListener("keyup", () => {
        let label = input.previousElementSibling;
        if(input.value != "") {
            label.style.visibility = "visible";
        }else {
            label.style.display = "hidden";
        }
    });
});

let addBtn = document.querySelector("#plus");

addBtn.addEventListener("click", () => {
    let container = document.querySelector(".container");
    let header = document.querySelector("header");
    let form = document.querySelector(".bookForm");
    form.style.display = "flex";
    container.style.opacity = "0.3";
    header.style.opacity = "0.3";
    document.querySelector(".textInput").reset();
});

let formBtns = document.querySelectorAll(".formButton");
formBtns.forEach((formBtn) => {
    formBtn.addEventListener("click", () => {
        let form = document.querySelector(".bookForm");
        let container = document.querySelector(".container");
        let header = document.querySelector("header");
        form.style.display = "none";
        container.style.opacity = "1.0";
        header.style.opacity = "1.0";
        if(formBtn.id === "add") {
            let book = document.querySelector("#book").value;
            let author = document.querySelector("#author").value;
            let pages = document.querySelector("#pages").value;
            let pagesCompleted = document.querySelector("#compeletedPages").value;
            let newBook = new Book(book,author,pages,pagesCompleted);
            if(isNaN(+pages) || (+pages >= 10000) || (+pages <= 0)) {
                alert("Please enter a number between 1 and 9999");
            }else if(isNaN(+pagesCompleted) || (+pagesCompleted >= 10000) || (+pagesCompleted <= 0)) {
                alert("Please enter a number between 1 and 9999");
            }else if(+pages < +pagesCompleted){
                alert("You can't read more pages than those in the book");
            }else {
                addBookToLibrary(newBook);
                let cardBtns = document.querySelectorAll(".cardBtn");
                cardBtns.forEach((cardBtn) => {
                    cardBtn.addEventListener("click", () => {
                        if(cardBtn.classList[0] === "editBtn") {
                            let container = document.querySelector(".container");
                            let header = document.querySelector("header");
                            let form = document.querySelector(".bookForm");
                            form.style.display = "flex";
                            container.style.opacity = "0.3";
                            header.style.opacity = "0.3";
                            retainFormInfo(cardBtn.parentElement.parentElement.classList[1]);
                        }else {
                            const bookCard = cardBtn.parentElement.parentElement;
                            const bookCardParent = bookCard.parentElement;
                            bookCardParent.removeChild(bookCard);
                        }
                    })
                });
            }
        }
    });
});

function retainFormInfo(bookNumber) {
    book = myLibrary[bookNumber - 1];

    const title = document.querySelector("#book");
    title.value = book.title;

    const author = document.querySelector("#author");
    author.value = book.author;

    const pages = document.querySelector("#pages");
    pages.value = book.pages;

    const pagesCompleted = document.querySelector("#compeletedPages");
    pagesCompleted.value = book.pagesRead;
}

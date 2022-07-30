
const booksFormPanel = document.querySelector('#booksFormPanel');
const booksForm = document.querySelector('.books-form');
const closeFormBtn = document.querySelector('#btn-closeForm');
const booksPanel = document.querySelector('#booksPanel');
const newBookBtn = document.querySelector('#btn-newBook');
const addBookBtn = document.querySelector('#btn-addBook');


function Book(title, author, pages, read) {
		this.id = ++id; 
		this.title = title;
		this.author = author;
		this.pages = pages;
		this.read = read;	
};

Book.prototype.setRead = function(){
	this.read = this.read === true ? false : true;

}

var id = null;

var library = [ 
	new Book('Teste', 'Fulano', 200, false), 
	new Book('Teste2', 'Fulano2222', 1, true)
];

// create the card html with obj book data
function createBookCard(book){
	const bookCard = document.createElement('div');
	const bookId = document.createElement('p')
	const bookTitle = document.createElement('h3');
	const bookAuthor = document.createElement('p');
	const bookPages = document.createElement('p');
	const btnGroup = document.createElement('div');
	const btnRead = document.createElement('button');
	const btnRemove = document.createElement('button');

	bookCard.setAttribute('id', 'bookCard'); 
	bookCard.classList.add('book-card');
	bookId.style.display = 'none';
	btnGroup.classList.add('book-panel-buttons');

	bookId.textContent = book.id;
	bookTitle.textContent = book.title
	bookAuthor.textContent = book.author
	bookPages.textContent = book.pages
	btnRemove.textContent = 'Remove'
	btnRead.textContent = 'Read'

	setBtnReadStyle(book, btnRead)

	btnRemove.addEventListener('click', (e) => {
		removeBook(book);
	})
	
	btnRead.addEventListener('click', (e) => {
		book.setRead();
		setBtnReadStyle(book, btnRead);
	})

	bookCard.appendChild(bookId);
	bookCard.appendChild(bookTitle);
  	bookCard.appendChild(bookAuthor);
  	bookCard.appendChild(bookPages);
  	btnGroup.appendChild(btnRead);
  	btnGroup.appendChild(btnRemove);
  	bookCard.appendChild(btnGroup);

  	booksPanel.appendChild(bookCard);

}

// refresh the book card panel html
function updateBooksPanel(){
	booksPanel.innerHTML = '';

	for (let book of library){
		createBookCard(book);
	}

}

function addBookToLibrary() {
		var formInputs = document.querySelectorAll('.books-form > input');
		var formInputsValues = Array.prototype.map.call(formInputs, function (item){
			return item.value;
		});

		var checkboxInput = document.querySelector('#readBook');
		
		var newBook = new Book( ...formInputsValues, checkboxInput.checked);
		library.push(newBook);

		updateBooksPanel();
	
};

function changeFormDisplay(){
	booksFormPanel.style.display = booksFormPanel.style.display === "none" ? "inline" : "none";

}

function removeBook(book){
	library = library.filter((bookInLibrary) => {
		return bookInLibrary.id !== book.id 
	});

	updateBooksPanel();
}

function setBtnReadStyle(book, btn){
	if(book.read){
		btn.textContent = 'Read'
		btn.setAttribute('class', 'btn-green');
		
	}else{
		btn.textContent = 'Not Read'
		btn.setAttribute('class', 'btn-red');
	}
	
}

newBookBtn.addEventListener('click', function(event){
	event.preventDefault();
	changeFormDisplay();
})
	
addBookBtn.addEventListener('click', function(event){
		event.preventDefault();
		addBookToLibrary();
		booksForm.reset();
});

closeFormBtn.addEventListener('click', (event) => {
	event.preventDefault();
	booksForm.reset();
	changeFormDisplay();
})









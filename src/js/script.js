/* global Handlebars, utils, dataSource */ // eslint-disable-line no-unused-vars

{
  'use strict';
  
  const select = {
    templateOf: {
      bookCart: '#template-book'
    },
    containerOf: {
      booksList: '.books-list'
    },
    imageOf: {
      bookImage: '.book__image'
    }
  };
  
  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
      bookClass: 'book__image',
      checkedClass: 'checked',
      hiddenClass: 'hidden'
    }
  };
  
  function render() {
    const thisBooksList = this;
    thisBooksList.data = dataSource.books;
  
    for (const book of thisBooksList.data) {
  
      /* make a template for a book */
  
      const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
  
      /* generate HTML from template */
  
      const generatedHTML = bookTemplate(book);
      console.log('generatedHTML: ', generatedHTML);
  
      /* create DOM element */
  
      thisBooksList.element = utils.createDOMFromHTML(generatedHTML);
      console.log('thisBooksList.element: ', thisBooksList.element);
  
      /* find container of books*/
  
      const bookContainer = document.querySelector(select.containerOf.booksList);
  
      /* add element to list */
  
      bookContainer.appendChild(thisBooksList.element);
  
    }
  }
  
  /*function getElements() {
      const thisBooksList = this;
      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);
    }*/
  const favoriteBooks = [];

  function initActions() {
  
    const booksList = document.querySelector(select.containerOf.booksList);
    const event = 'dblclick';
    booksList.addEventListener(event, function (event) {
      event.preventDefault();
      if (event.target.offsetParent.classList.contains('book__image')) {

        let id = event.target.offsetParent.getAttribute('data-id');
        if (!favoriteBooks.includes(id)) {
          event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);
          favoriteBooks.push(id);
        } else {
          event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
          const indexOfId = favoriteBooks.indexOf(id);
          favoriteBooks.splice(indexOfId, 1);
        }
  
      }
    });
  }

  render();
  initActions();
}
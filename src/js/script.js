{
  'use strict';

  const select = {
    templateOf:{
      bookCart: '#template-book',
    },
    containerOf: {
      booksList: '.books-list',
    },
    bookItem: {
      image: '.book__image',
    },
    filters: {
      form: '.filters',
    }
  };

  const classNames = {
    bookCart: {
      imageFavorite: 'favorite',
      bookClass: 'book__image',
    }
  };


  class BooksList {
    constructor(data){
      const thisBooksList = this;
      thisBooksList.data = data;

      thisBooksList.filters = [];

      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initActions();
    }

    initData(){
      const thisBooksList = this;
      thisBooksList.data = dataSource.books;

      for (const book of thisBooksList.data){
        const rating = book.rating;

        book.ratingBgc = thisBooksList.determineRatingBgc(rating);
        book.ratingWidth = rating * 10;


        // make a template for a book
        const bookTemplate = Handlebars.compile(document.querySelector(select.templateOf.bookCart).innerHTML);
        // generate HTML from template
        const generatedHTML = bookTemplate(book);
        // create DOM element
        thisBooksList.element = utils.createDOMFromHTML(generatedHTML);

        const bookContainer = document.querySelector(select.containerOf.booksList);
        // add element to list
        bookContainer.appendChild(thisBooksList.element);
      }
    }

    getElements(){
      const thisBooksList = this;

      thisBooksList.booksList = document.querySelector(select.containerOf.booksList);

      thisBooksList.form = document.querySelector(select.filters.form);
    }



    initActions(){
      const thisBooksList = this;

      const favoriteBooks = [];

      thisBooksList.booksList.addEventListener('click', function(event){
        event.preventDefault();

        if (event.target.offsetParent.classList.contains(classNames.bookCart.bookClass)){

          let id = event.target.offsetParent.getAttribute('data-id');

          if (!favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(!classNames.bookCart.imageFavorite)){
            favoriteBooks.push(id);
            event.target.offsetParent.classList.add(classNames.bookCart.imageFavorite);
          }
          else if (favoriteBooks.includes(id) || event.target.offsetParent.classList.contains(classNames.bookCart.imageFavorite)){
            const indexOfId = favoriteBooks.indexOf(id);
            favoriteBooks.splice(indexOfId, 1);
            event.target.offsetParent.classList.remove(classNames.bookCart.imageFavorite);
          }
        }
      });


      thisBooksList.form.addEventListener('click', function(event){

        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter' ){
          if (event.target.checked == true){
            thisBooksList.filters.push(event.target.value);
          }
          else if (event.target.checked == false){
            const indexOfFilters = thisBooksList.filters.indexOf(event.target.value);
            thisBooksList.filters.splice(indexOfFilters, 1);
          }
          thisBooksList.filterBooks();
        }
      });
    }



    filterBooks(){
      const thisBooksList = this;

      for(let book of thisBooksList.data){
        let shouldBeHidden = false;
        for (const filter of thisBooksList.filters){
          if (!book.details[filter]){
            shouldBeHidden = true;
            break;
          }
        }
        const id = book.id;
        const item = document.querySelector('.book__image[data-id="' + id + '"]');

        if (shouldBeHidden == true){
          item.classList.add('hidden');
        }
        else if (shouldBeHidden == false){
          item.classList.remove('hidden');
        }
      }
    }

    determineRatingBgc(rating){
      const thisBooksList = this;

      if (rating < 6){
        thisBooksList.background = 'linear-gradient(to bottom,  #fefcea 0%, #f1da36 100%)';
      } else if (rating > 6 && rating <= 8){
        thisBooksList.background = 'linear-gradient(to bottom, #b4df5b 0%,#b4df5b 100%)';
      } else if (rating > 8 && rating <= 9){
        thisBooksList.background = 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%)';
      } else if (rating > 9){
        thisBooksList.background = 'linear-gradient(to bottom, #ff0084 0%,#ff0084 100%)';
      }
      return thisBooksList.background;
    }
  }

  const app = new BooksList();
}
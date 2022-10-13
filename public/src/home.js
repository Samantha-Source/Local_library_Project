// take in array of book objects & return # of book objects in the array
function getTotalBooksCount(books = []) {
  return books.length;
}

// take in array of accounts and return # of account objects in the array
function getTotalAccountsCount(accounts = []) {
  return accounts.length;
}

///helper function to get an array of books which are currently out
function booksNotReturned(books = []) {
  let notReturned = books.filter((book) => {
    let borrowed = book.borrows;
    let hasNotReturned = borrowed.some((currBook) => {
      return currBook.returned === false;
    });
    return hasNotReturned;
  });
  return notReturned;
}

//takes in array of books returns # of books that are currently checked out (borrows.returned = false)
function getBooksBorrowedCount(books = []) {
  let currentlyOut = booksNotReturned(books); //currentlyOut is an array of book currently being borrowed
  let total = currentlyOut.length;
  return total;
}

//takes in array of books returns array of 5 objects or less that represent the most common genres from greatest to least
// each object returned has 2 keys 'name':name of genre, 'count':#of times genre occurs
function getMostCommonGenres(books = []) {
  let result = {};
  // for each book if it's genre does not exist in the result create a new object with {genre:count}
  //if it already exists in the result object increase the value for that genre(count)++
  for (let i = 0; i < books.length; i++) {
    if (result[books[i].genre]) {
      result[books[i].genre]++;
    } else {
      result[books[i].genre] = 1;
    }
  }
  //get the keys from the result object and put into an array
  let resultsArray = Object.keys(result);
  // get the count value from the objects array and assign it it's key
  let finalResult = resultsArray.map((genre) => {
    return { name: genre, count: result[genre] };
  });
  // sort by count
  finalResult.sort((a, b) => {
    return b.count - a.count;
  });
  // return only the top 5
  return finalResult.slice(0, 5);
}

// takes in array of books returns array of 5 objects or less that represent how many times a book has been borrowed
//each object returned has 2 keys 'name':title of book, 'count':# of times book has been borrowed
function getMostPopularBooks(books = []) {
  let output = [];
  // create an array which contains each book object with name:title and count: borrows.length
  for (let idx = 0; idx < books.length; idx++) {
    let newObject = {
      name: books[idx].title,
      count: books[idx].borrows.length,
    };
    output.push(newObject);
  }
  // sort the results from greatest to least by # of borrows (count)
  let result = output.sort((a, b) => {
    return b.count - a.count;
  });
  return result.slice(0, 5); // only return the top 5 results
}

//takes in array of books and array of authors, returns an array of 5 or less objects that represent which authors have been checked out the most
//each object returned has 2 keys 'name':first&last name of author, 'count':#of times book has been borrowed
function getMostPopularAuthors(books = [], authors = []) {
  let result = [];
  // create an object for each author with name:authorName and count:0
  authors.forEach((authorObj) => {
    let author = {
      name: `${authorObj.name.first} ${authorObj.name.last}`,
      count: 0,
    };
    // for each book match it's author id to the authors id from the authors array  & assign it's count the # of times it's been borrowed
    books.forEach((book) =>
      book.authorId == authorObj.id
        ? (author.count += book.borrows.length)
        : (count = 0)
    );
    result.push(author);
  });
  // sort the results from greatest #of Borrows(count) to least and return the top 5
  result = result.sort((a, b) => (a.count < b.count ? 1 : -1)).slice(0, 5);
  return result;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

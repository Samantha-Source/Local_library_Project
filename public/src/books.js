// takes in array of authors and an author id, returns the author whose id matches
function findAuthorById(authors, id) {
  let result = authors.find((author)=>{
    return author.id === id;
  })
  return result;
}

// takes in array of books and book id, returns book object whose id matches
function findBookById(books, id) {
let result = books.find((book) => {
return book.id === id;
  })
  return result;  
}

//takes in array of books, returns an array with 2 arrays inside of it [curently checked out books] & [books that have been returned]
function partitionBooksByBorrowedStatus(books=[]) {
  // find the books who have not been returned (borrows.returned==false)
  let notReturned = books.filter((book)=>{
      let borrowed = book.borrows;
      let hasNotReturned = borrowed.some((currBook)=>{
          return currBook.returned === false
      })
      return hasNotReturned;
  })
  // find the books which have been returned (borrows.returned==true)
  let hasReturned = books.filter((book)=>{
      let borrowed = book.borrows;
      let isReturned = borrowed.every((currBook)=>{
          return currBook.returned === true
      })
      return isReturned;
  })
  //join the 2 arrays of notReturned and returned together
  return [notReturned, hasReturned]
}

//takes in a book object and an array of accounts, returns an array of 10 or less objects that represent the accounts given by the borrows ids
//include the returned entry from the borrows in the output
function getBorrowersForBook(book={}, accounts=[]) {
  // Iterate through each object in the books array for the borrows.id
  // If the borrows.id matches an object in the accounts array with the same id 
  // Put that account object into an array for output
  // Add the returned entry from the book object alongwith the account object
  const {borrows} = book; // borrows = book.borrows
  let result = borrows.map((borrowerObj)=>{
    let foundBorrower = accounts.find((account)=>{
      return account.id === borrowerObj.id;
    })
    foundBorrower.returned = borrowerObj.returned;
    return foundBorrower;
  })
  return result.slice(0,10) // only return the first 10 results
}


module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

// take in array of accounts and id string, return the account object with the matching id
function findAccountById(accounts=[], id = "") {
  let result = accounts.find((account) => {
    return account.id === id;
  });
  return result;
}

//takes in array of accounts and return it sorted alphabetically by last name
function sortAccountsByLastName(accounts=[]) {
  return accounts.sort((accountA, accountB)=>{
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase() ? -1 : 1
  })
}


//takes in an account object and array of books;returns number of times the accounts id appears in any book's borrows array
function getTotalNumberOfBorrows(account={}, books=[]){
  const {id} = account; //id number to match to
  let total = books.reduce((total, bookObj)=>{
    // check if the id is listed in the borrows of each book
    let isAccountInList = bookObj.borrows.some((borrowsObj)=>{
      return borrowsObj.id === id;
    });
    // if the id is found increase the total borrows by 1
    if (isAccountInList) {
      total++
    }
    return total;
  }, 0)  // start reduce counter at 0
  return total;
}



//takes in an account object, an array of books, an array authors; returns array of book objects (incl. author info) that represents the books currently checked out by the account
function getBooksPossessedByAccount(account={}, books=[], authors=[]) {
  const {id} = account; // account id that we need to match to
  // loop through each book object in the books array and return the ones which have a mathing borrows.id
  let booksOut = books.filter((bookObj)=>{
     //if the booksObj has a borrows.id === id return it to bookObj
     let bookHasId = bookObj.borrows.some((borrowsObj)=>{
      return borrowsObj.id === id && borrowsObj.returned === false
     })
     // if the id is found in the book find the author whose id matches the book's authorId
     if (bookHasId === true) {
      const {authorId} = bookObj; 
      let foundAuthorObj = authors.find((authorObj)=>{
          return authorObj.id === authorId;
      })
      bookObj.author = foundAuthorObj;
      return bookObj;
     }
  })
  return booksOut;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

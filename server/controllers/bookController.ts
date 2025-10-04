export const getAllBooks = (req, res) => {
  res.send("Book are received");
};

export const addNewBook = (req, res) => {
  res.send("Adding a new book");
};

export const updateStatus = (req, res) => {
  res.send("updating availability status");
};

export const deleteBook = (req, res) => {
  res.send("Deleting the book");
};

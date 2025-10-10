import type { Request, Response } from "express";
import client from "../db/db.js";

export const getAllBooks =async (req: Request ,res: Response) => {
  
  try{

  const query = `SELECT * FROM books;`;

  const books = await client.query(query);

  if(books.rowCount! > 0) return res.status(200).json({data: books.rows, message:"Fetched all books"});

  else return res.status(400).json({message:"No Books found in DB"});

  
  }catch(err){
    console.error(err);
    return res.status(500).json({message:"Internal Server Error"});
  }

}

export const addNewBook = (req, res) => {
  res.send("Adding a new book");
};

export const updateStatus = (req, res) => {
  res.send("updating availability status");
};

export const deleteBook = (req, res) => {
  res.send("Deleting the book");
};

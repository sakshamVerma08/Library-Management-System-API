| Functionality                    | Why it’s valuable                                             | Implementation notes                                       |
| -------------------------------- | ------------------------------------------------------------- | ---------------------------------------------------------- |
| **Book search**                  | Find books by title, author, or publisher.                    | Use `ILIKE '%query%'` or `tsvector` (for later full-text). |
| **Borrow history for each user** | Track which books each user borrowed and when.                | Simple `JOIN` + `borrow_date` and `return_date` columns.   |
| **Available copies check**       | Prevent multiple users from borrowing the same physical copy. | Add `available_copies` or a `status` flag to `books`.      |
| **Return a book**                | Update `status` and set `return_date`.                        | Just an `UPDATE` query.                                    |
| **Overdue check**                | Flag borrowed books not returned after X days.                | Simple `WHERE current_date - borrow_date > X`.             |

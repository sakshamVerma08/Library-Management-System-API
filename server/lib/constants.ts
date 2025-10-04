export enum Role {
    USER = "user",
    ADMIN = "admin",
}

// Type that represents the structure for a single 'User'

export type User = {
    id: number,
    name: string,
    email: string,
    password: string,
    role: Role,
    borrowedBooks: string[]

}

// Type representing structure of Userdata , a list of 'User' objects.
export type UserData = [User];


// Type representing single book
export type Book = {
    id: number,
    title: string,
    author: string,
    ISBN: number,
    available: boolean

};

// Type representing Books DB, a list of 'Book' type objects.
export type BookData = [Book];
declare global {

  type User = {

    id: number,
    name: string,
    email: string,
    password: string,
    role: string,
  }

  namespace Express{

    type userId = number | undefined | string

    interface Request{
      userId: userId
    }

    
  }
}



export {};
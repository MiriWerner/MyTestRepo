export interface Response {
  token: string;
  user: {
    userId:string;
    email: string;
    password: string;
  };
}
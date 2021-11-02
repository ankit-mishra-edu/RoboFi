// import { IUser } from './User';

// interface IToken {
//   user: IUser;
//   key: string;
// }

interface IToken {
  user: IUser;
  key: string;
  access: string;
  refresh: string;
}

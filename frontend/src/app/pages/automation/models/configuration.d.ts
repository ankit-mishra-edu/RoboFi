interface IConfiguration {
  id: number;
  gitRemoteRepo: string;
  gitRemoteToken: string;
  specificationReadmeFileName: string;
  specificationDetailsFileName: string;
  microbotReadmeFileName: string;
  microbotDetailsFileName: string;
  user: IUser;
}

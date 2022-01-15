interface IAutomationConfiguration {
  id: number;
  user: IUser;
  entries: IAutomationConfigurationEntry[];
}

interface IAutomationConfigurationEntry {
  id: number;
  user: IUser;
  name: string;
  value: string;
}

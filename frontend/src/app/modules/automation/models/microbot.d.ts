interface IMicrobot {
  id: number;
  Name: string;
  Technology: string;
  Description: string;
  Version: string;
  specification: ISpecification;
}

type AutoMicrobotFilterType = 'Name' | 'Technology' | 'Version';

interface ISpecificationInput {
  id: number;
  Name: string;
  Type: string;
  DefaultValue: string;
  Description: string;
}

interface ISpecificationOutput {
  id: number;
  Name: string;
  Type: string;
  Description: string;
}

interface ISpecificationError {
  id: number;
  Message: string;
  Code: string;
  Description: string;
}

interface ISpecificationDependency {
  id: number;
  Name: string;
  Type: string;
  Description: string;
}

interface ISpecificationAuthor {
  id: number;
  Name: string;
  Email: string;
  Contact: string;
}

interface ISpecification {
  id: number;
  Name: string;
  Description: string;
  Category: string;
  Version: string;
  Inputs: ISpecificationInput[];
  Outputs: ISpecificationOutput[];
  Errors: ISpecificationError[];
  Dependencies: ISpecificationDependency[];
  Authors: ISpecificationAuthor[];
}

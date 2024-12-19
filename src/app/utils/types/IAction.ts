export interface IAction{
  color: string;
  title: string;
  icon: string;
  Method: (args: any) => void;
  disable: boolean | ((event: any) => boolean); // Allow both boolean and function
};

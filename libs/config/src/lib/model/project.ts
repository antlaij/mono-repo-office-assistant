
export type TodoStatus = "Holding" | "Prioritized" | "Started" | "Finished";
export type ContactType = 'PHONE' | 'OFFICE PHONE' | 'EMAIL' | 'WEB';
export type ApplicationType = 'DESKTOP' | 'WEB' | 'ANDROID' | 'IOS';
export type EnvironmentType = 'DEV' | 'TST' | 'SIT' | 'UAT' | 'PROD';

export type OfficeAssistant = {
  Accounts: AccountManager[];
  Contacts: contact[];
  Projects: Projects;
  Applications: Applications;
  Todos: Todo[];
  Timesheets: Timesheet[];
};

export type AccountManager = {
  name: string;
  system: string;
  user: string;
  login: string;
  links?: link[];
};

export type link = {
  urlLabel: string;
  url: string;
};

export type contact = {
  name: string;
  title: string;
  method: contactMedia[];
};

export type contactMedia = {
  contactType: ContactType;
  value: string;
  addition?: string;
};

export type Applications = {
  [key: string]: Application;
};

type WebApplication = {
  applicationType: 'WEB';
  environment: EnvironmentType;
  url: string;
  Documentations: Documentation[];
  Repositorie: Repository;
};

type DesktopApplication = {
  applicationType: 'DESKTOP';
  environment: EnvironmentType;
  applicationpath: string;
  Documentations: Documentation[];
  Repositorie: Repository;
};

type MobiletopApplication = {
  applicationType: "ANDROID" | "IOS";
  environment: EnvironmentType;
  Documentations: Documentation[];
  Repositorie: Repository;
};

export type Application = WebApplication | DesktopApplication | MobiletopApplication;

export type Projects = {
  [key: string]: Project;
};

export type Project = {
  Documentations: Documentation[];
  Repositories: Repository[];
};

export type Documentation = {
  name: string;
  link: string;
};

export type Repository = {
  name: string;
  repositoryURL: string;
  localPath: string;
  production: string;
};

export type Timesheet = {
  project: string;
  task: string;
  notes: string;
  assignee: string;
  timeStart: Date;
  timespent: number;
};

export type Todo = {
  name: string;
  description: string;
  priority: number;
  link: string;
  status: string;
};


export type TodoStatus = "Holding" | "Prioritized" | "Started" | "Finished";
export type ContactType = 'PHONE' | 'OFFICE PHONE' | 'EMAIL' | 'WEB';

export type OfficeAssistant = {
  Accounts: AccountManager[];
  Contacts: contact[];
  Projects: Projects;
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

export type Projects = {
  [key: string]: Project;
};

export type Project = {
  Documentations: Documentation[];
  Repositories: ProjectRepository[];
};

export type Documentation = {
  name: string;
  link: string;
};

export type ProjectRepository = {
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

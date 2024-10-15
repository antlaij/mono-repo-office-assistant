

const DEV_PROJECT = [
  'Backup/Server',
  'Backup/Database',
  'Backup/Source_Code/Back_End',
  'Backup/Source_Code/Front_End',
  'Document',
  'Document/Tech_Spec',
  'Document/Tech_Spec/Back_End',
  'Document/Tech_Spec/Front_End',
  'Document/Meeting',
  'Document/Image',
  'Document/Reference',
  'Development',
  'Development/Back_End/',
  'Development/Back_End/Diagram',
  'Development/Back_End/Document',
  'Development/Back_End/Source_Code/Development',
  'Development/Back_End/Source_Code/History',
  'Development/Front_End',
  'Development/Front_End/Diagram',
  'Development/Front_End/Document',
  'Development/Front_End/Source_Code/Development',
  'Development/Front_End/Source_Code/History',
  'Deployment/Back_End',
  'Deployment/Front_End',
  'Quality_Control',
  'Quality_Control/UnitTesting',
  'Quality_Control/Case',
  'Quality_Control/QA',
  'Quality_Control/Testing_Data',
  'Support'
];

const OFFICE = {
  Development: {
    Default: {
      Project: {
        Template: {
          document: {},
          Local: {},
          VersionControl: {
            Git: {},
          },
        }
      }
    }
  },
  GreenApps: {
    Batch: {
      Log: {},
    },
    Desktop: {},
  },
  ['General-Information']: {
    Documentation: {
      Contact: {},
    },
    HR: {},
    Training: {},
    Timesheet: {},
  },
  ls: {
    me: {
      development: {
        lab: {},
        testing: {},
      },
    },
    office: {
      projects: {
        ['office-assistant']: {
          development: {},
        },
      },
      settings: {
        Chrome: {},
        Edge: {},
        Shortcut: {},
        VSCode: {},
      },
    },
  },
  Support: {},
};

const EXTENSION_TYPE = {
  photos: ['bmp', 'gif', 'jpg', 'jpeg', 'png', 'svg'],
  videos: ['avi', 'mov', 'mp4', 'ogg', 'wmv'],
  music: ['mp3', 'webm'],
};


export const FOLDER_STRUCTURE = {
  DEV_PROJECT,
  OFFICE,
};

export const FILE_CONFIG = {
  EXTENSION_TYPE,
};

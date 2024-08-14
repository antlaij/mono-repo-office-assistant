
const OFFICE_ROOT = ``;

const OFFICE = /** @type {const} */ ({
  FOLDER: {
    get ROOT() { return `${OFFICE_ROOT}` },
    get PROJECTS() { return `${OFFICE_ROOT}\\projects` },
  },
  FILE: {
    get OFFICE_JSON() { return `${OFFICE.FOLDER.PROJECTS}\\Office.json` },
  },
});



export const PATH = {
  OFFICE,
};

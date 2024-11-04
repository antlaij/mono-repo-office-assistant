"use client"

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { HiHome, } from "react-icons/hi";
import { FaRegCircleCheck } from "react-icons/fa6";
import { MdDoNotDisturb } from "react-icons/md";
import { IoInformationCircleOutline } from "react-icons/io5";

import { useThemeContext } from '../contexts/ThemeContext';
import { GlobalConifg } from '../app.config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { Application, OfficeAssistant, Project } from '@mono-repo-office/config';


const ApplicationPage: FC<PropsWithChildren> = ({ children }) => {

  const { isDarkTheme } = useThemeContext();

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<ColDef[]>([
      { field: "title", width: 600 },
      { field: "start", width: 200 },
      { field: "end", width: 200 },
      { field: "classNames", width: 120 },
      { field: "description", width: 500 },
    ]);
  let dataGrid;

  const [data, setData] = useState<Array<Application & {applicationKey: string}> | null>(null);
  const [error, setError] = useState<string>();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchOfficeData = async () => {
      setLoading(true);
      const response = await fetch(`${GlobalConifg.apiBaseUrl}/api/info`);

      if(!response.ok){
        setError('Failed to fetch data!');
        setLoading(false);
      }

      const OffData = await response.json() as OfficeAssistant;
      setLoading(false);
      setData(Object.keys(OffData.Applications).map(applicationKey => {
        return {...OffData.Applications[applicationKey], applicationKey: applicationKey }
      }));
    }
    fetchOfficeData();
  }, []);

  if(isLoading) {
    return <div>Loading ...</div>;
  }

  if(error) {
    return <div>{error}</div>;
  }

  if(data) {
    // dataGrid = <AgGridReact rowData={Object.keys(data)} columnDefs={colDefs} />;
  }

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className="max-h-screen flex flex-col grow">
        <div className="grid grid-cols-3 gap-3">
        {
          data?.map(application => (
            <div key={application.applicationKey} className="block rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-900">
              <a href={`./site/${application.siteId}`} rel="noreferrer" className="block text-blue-500">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{application.applicationKey} - {application.environment}</h5>
              </a>
              <a href={application.url} target="_blank" rel="noreferrer" className="block truncate text-blue-500">{application.url}</a>
              <section className="my-6 rounded-lg border-2 border-cyan-700 p-3">
                <div className="py-3 text-cyan-500">Documentations</div>
                {
                  application.Documentations.map(documentation => (
                    <a key={documentation.name} href={documentation.link} target="_blank" rel="noreferrer" className="block truncate text-blue-500">{documentation.name}</a>
                  ))
                }
              </section>
              {
                (application.HostingPlatform === 'WP ENGINE')?
                <a href={`https://my.wpengine.com/installs/${application.siteId}`} target="_blank" rel="noreferrer" className="block text-blue-500">{`WP Engine - ${application.siteId}`}</a>
                :
                <div className="block  text-gray-700 dark:text-gray-400">{`Site ID: ${application.siteId}`}</div>
              }
              {/* <p className="font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
              <div className="grid h-36 grid-cols-2 gap-1 py-6">
                <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Excel Tab Name:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.scanExcelTabName}</div>
                <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Status:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.status}</div>
                <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Local Scan:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {application.nodejsScan
                    ? <FaRegCircleCheck className="inline text-green-400" />
                    : <MdDoNotDisturb className="inline text-red-400" />
                }
                </div>
                <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Tenable Export Json:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {application.tenableScan?.scanReportFilepath
                    ? <FaRegCircleCheck className="inline text-green-400" />
                    : <MdDoNotDisturb className="inline text-red-400" />
                }
                </div>
                <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Tenable Excel Json:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">
                {application.tenableScan?.excelResult
                    ? <FaRegCircleCheck className="inline text-green-400" />
                    : <MdDoNotDisturb className="inline text-red-400" />
                }
                </div>
              </div>
              <section className="h-16-rem my-6 rounded-lg border-2 border-cyan-700 p-3">
                <div className="py-3 text-cyan-500">Repository</div>
                <div className="grid-cols-3_2 grid gap-1 p-3">
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">scan Time:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.tenableScan?.scanTime}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">No of Issues from Excel:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.tenableScan?.excelResult?.length}</div>
                </div>
                {application.tenableScan?.scanReportFilepath
                  ? <a href={`./tenablerpt/${encodeURI(application.tenableScan?.scanReportFilepath)}`} rel="noreferrer" className="block text-blue-500">
                      <Button outline gradientDuoTone="cyanToBlue">Go to Tenable scan report</Button>
                    </a>
                  : ''
                }
                {application.tenableScan?.scanComparisonFilepath
                  ? <a href={`./tenablecomprpt/${encodeURI(application.tenableScan?.scanComparisonFilepath)}`} rel="noreferrer" className="block text-blue-500">
                      <Button outline gradientDuoTone="cyanToBlue">Go to Tenable scan comparison</Button>
                    </a>
                  : ''
                }
              </section>
              <section className="my-6 rounded-lg border-2 border-cyan-700 p-3">
                <div className="py-3 text-cyan-500">Information</div>
                <div className="grid-cols-3_2 grid gap-1 p-3">
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">scan Time:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.scanTime?.split('T')[0]}<br/>{application.nodejsScan?.scanTime?.split('T')[1]}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Doc Size:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.contentLength}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Number of Cookies:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.numberOfCookies}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Number of Unsecure Cookies:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.numberOfUnsecureCookies}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Number of inline script:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.numberOfInlineScript}</div>
                  <div className="text-sm font-extrabold text-gray-700 dark:text-gray-400">Number of inline style:</div><div className="text-sm font-normal text-gray-700 dark:text-gray-400">{application.nodejsScan?.numberOfInlineStyle}</div>
                </div>
                <ul>
                {application.nodejsScan?.hasContentSecurityPolicyHeader
                    ? <li className="text-green-500"><FaRegCircleCheck className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Has Content Security Policy header - ( CSP )</span></li>
                    : <li className="text-red-500"><MdDoNotDisturb className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Has Content Security Policy header - ( CSP )</span></li>
                }
                {application.nodejsScan?.hasContentSecurityPolicyMeta
                    ? <li className="text-green-500"><FaRegCircleCheck className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Has Content Security Policy meta - ( CSP )</span></li>
                    : <li className="text-yellow-400"><IoInformationCircleOutline className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">Has Content Security Policy meta - ( CSP )</span></li>
                }
                {!application.nodejsScan?.isScriptSrcContainsUnsafe
                    ? <li className="text-green-500"><FaRegCircleCheck className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">content-security-policy has no unsafe-inline</span></li>
                    : <li className="text-red-500"><MdDoNotDisturb className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">content-security-policy has no unsafe-inline</span></li>
                }
                {!application.nodejsScan?.isStyleSrcContainsUnsafe
                    ? <li className="text-green-500"><FaRegCircleCheck className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">content-security-policy has no unsafe-inline</span></li>
                    : <li className="text-red-500"><MdDoNotDisturb className="inline" /> <span className="text-sm font-normal text-gray-700 dark:text-gray-400">content-security-policy has no unsafe-inline</span></li>
                }
                </ul>
              </section>
              {/* <a href={`./site/${project.siteId}`} rel="noreferrer" className="block text-blue-500">
                <Button outline gradientDuoTone="purpleToBlue">{project.site} {project.environment} Details</Button>
              </a> */}
            </div>
          ))
        }
        </div>
      <div
        className={(isDarkTheme())?"ag-theme-quartz-dark":"ag-theme-quartz"} // applying the Data Grid theme
        style={{ height: 850 }} // the Data Grid will fill the size of the parent container
      >
        {dataGrid}
      </div>
    </div>
  );
}

export default ApplicationPage;

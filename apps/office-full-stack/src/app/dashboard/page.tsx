"use client"

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { useThemeContext } from '../contexts/ThemeContext';
import { GlobalConifg } from '../app.config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OfficeAssistant } from '@mono-repo-office/config';
import layoutStyles from '../layout.module.scss';


const DashboardPage: FC<PropsWithChildren> = ({ children }) => {

  const { isDarkTheme } = useThemeContext();

    // Column Definitions: Defines the columns to be displayed.
    const [colDefs] = useState<ColDef[]>([
      { field: "name", width: 500 },
      { field: "description", width: 200 },
      { field: "priority", width: 100 },
      { field: "link", width: 400 },
      { field: "status", width: 100 },
    ]);

  let cards;
  let dataGrid;

  const [data, setData] = useState<OfficeAssistant | null>(null);
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

      const OffData = await response.json();
      setLoading(false);
      setData(OffData);
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
    cards = (
      <>
      <div className={`${layoutStyles.flexCol}`}>
        <div className={`${layoutStyles.header} bg-slate-700`}>
          <span>Contacts</span>
        </div>
        <div className={`${layoutStyles.content}`}>
          <pre>There are {data?.Contacts.length} contact(s) in file.</pre>
        </div>
      </div>
      <div className={`${layoutStyles.flexCol}`}>
        <div className={`${layoutStyles.header} bg-slate-700`}>
          <span>Accounts</span>
        </div>
        <div className={`${layoutStyles.content}`}>
          <pre>There are {data?.Accounts.length} Account(s) in file.</pre>
        </div>
      </div>
      <div className={`${layoutStyles.flexCol}`}>
        <div className={`${layoutStyles.header} bg-slate-700`}>
          <span>Projects</span>
        </div>
        <div className={`${layoutStyles.content}`}>
          <pre>There are {Object.keys(data?.Projects || {}).length} Project(s) in file.</pre>
        </div>
      </div>
      <div className={`${layoutStyles.flexCol}`}>
        <div className={`${layoutStyles.header} bg-slate-700`}>
          <span>Todos</span>
        </div>
        <div className={`${layoutStyles.content}`}>
        <pre>There are {data?.Todos.length} Todo(s) in file.</pre>
        </div>
      </div>
      <div className={`${layoutStyles.flexCol}`}>
        <div className={`${layoutStyles.header} bg-slate-700`}>
          <span>Timesheets</span>
        </div>
        <div className={`${layoutStyles.content}`}>
        <pre>There are {data?.Timesheets.length} Timesheet(s) in file.</pre>
        </div>
      </div>
      </>
      );
    dataGrid = <AgGridReact rowData={data.Todos.sort((a,b) => (a.priority - b.priority))} columnDefs={colDefs} />;
  }

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className="max-h-screen flex flex-col grow">
      <div className='grid grid-cols-4 gap-4'>
        {cards}
      </div>
      <div
        className={(isDarkTheme())?"ag-theme-quartz-dark":"ag-theme-quartz"} // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        {dataGrid}
      </div>
    </div>
  );
}

export default DashboardPage;

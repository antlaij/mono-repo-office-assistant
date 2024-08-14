"use client"

import { FC, PropsWithChildren, useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import { ColDef } from 'ag-grid-community'; // Column Definition Type Interface
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { useThemeContext } from '../contexts/ThemeContext';
import { GlobalConifg } from '../app.config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OfficeAssistant, Timesheet } from '@mono-repo-office/config';


const DashboardPage: FC<PropsWithChildren> = ({ children }) => {

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

  const [data, setData] = useState<Array<Timesheet> | null>(null);
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
      setData(OffData.Timesheets);
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
    dataGrid = <AgGridReact rowData={data} columnDefs={colDefs} />;
  }

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <div className="max-h-screen flex flex-col grow">
      <div
        className={(isDarkTheme())?"ag-theme-quartz-dark":"ag-theme-quartz"} // applying the Data Grid theme
        style={{ height: 850 }} // the Data Grid will fill the size of the parent container
      >
        {dataGrid}
      </div>
    </div>
  );
}

export default DashboardPage;

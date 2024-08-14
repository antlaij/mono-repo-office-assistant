import { FC, PropsWithChildren } from 'react';

import { GlobalConifg } from '../app.config';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { OfficeAssistant } from '@mono-repo-office/config';

const DashboardPage: FC<PropsWithChildren> = async ({ children }) => {
  const response = await fetch(`${GlobalConifg.apiBaseUrl}/api/info`);

  if(!response.ok){
    throw new Error('Failed to fetch data!');
  }

  const OffData = await response.json() as OfficeAssistant;

  /*
   * Fetch data on server side because this is a server component
   */
  return (
    <div className="max-h-screen flex flex-col">
      <div>Server side renderring component (SSR)</div>
      <table>
        <thead>
        <tr className="bg-white dark:border-gray-700 dark:bg-gray-800" >
          <th className="whitespace-nowrap font-medium text-gray-900 dark:text-white">Name</th>
          <th>User</th>
          <th>Login</th>
          <th>System</th>
        </tr>
        </thead>
        <tbody>
        {OffData.Accounts
          .map((account) => (
            <tr key={account.name} className="bg-white dark:border-gray-700 dark:bg-gray-800" >
              <td>
                {account.name}
              </td>
              <td>{account.user}</td>
              <td>{account.login}</td>
              {/* <div>
                <a href={account.} className="font-medium text-blue-600 hover:underline dark:text-blue-500" target="top" >Click</a>
              </div> */}
              <td>{account.system}</td>
            </tr>
        ))}
        </tbody>
        </table>
    </div>
  );
}

export default DashboardPage;

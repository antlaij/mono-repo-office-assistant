import { FC, PropsWithChildren } from 'react';
import DashboardPage from './dashboard/page';

const IndexLayout: FC<PropsWithChildren> = ({ children }) => {
  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.scss file.
   */
  return (
    <DashboardPage />
  );
}

export default IndexLayout;

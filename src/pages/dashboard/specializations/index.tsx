import { useState } from 'react';
import { Button } from '@mui/material';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import {
  CreateSpecializationModal,
  SpecializationsList,
} from 'src/modules/specializations';

export default function SpecializationsListPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DashboardPageContainer
      title="Specializations List"
      sideButton={
        <Button variant="outlined" onClick={handleToggle}>
          New Specialization
        </Button>
      }
    >
      <SpecializationsList />
      <CreateSpecializationModal open={isOpen} handleToggle={handleToggle} />
    </DashboardPageContainer>
  );
}

SpecializationsListPage.getLayout = function getLayout(
  page: React.ReactElement
) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

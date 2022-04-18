import { useState } from 'react';
import { DashboardLayout } from '../../../layouts/dashboard.layout';
import { DashboardPageContainer } from '../../../components/dashboard-page-container';
import {
  CreateSpecializationModal,
  SpecializationsList,
} from '../../../modules/specializations';
import { Button } from '@mui/material';

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

import { Button } from '@mui/material';
import { useState } from 'react';
import { DashboardPageContainer } from 'src/containers/dashboard-page.container';
import { DashboardLayout } from 'src/layouts/dashboard.layout';
import { CreateFieldModal, FieldsList } from 'src/modules/fields';

export default function FieldsListPage() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <DashboardPageContainer
      title="Fields List"
      sideButton={
        <Button variant="outlined" onClick={handleToggle}>
          New Field
        </Button>
      }
    >
      <FieldsList />
      <CreateFieldModal open={isOpen} handleToggle={handleToggle} />
    </DashboardPageContainer>
  );
}

FieldsListPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

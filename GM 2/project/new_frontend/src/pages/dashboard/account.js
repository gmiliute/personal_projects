import { useCallback, useState } from 'react';
import Head from 'next/head';
import { Box, Container, Divider, Stack, Tab, Tabs, Typography } from '@mui/material';
import { useMockedUser } from '../../sections/temp-auth';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { AccountGeneral } from '../../layouts/dashboard/account-general';
import { AccountNotifications } from '../../layouts/dashboard/account-notifications';

const now = new Date();

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Notifications', value: 'notifications' },
];

const Page = () => {
  const user = useMockedUser();
  const [currentTab, setCurrentTab] = useState('general');


  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Head>
        <title>
          ETHERDER
        </title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="xl">
          <Stack
            spacing={3}
            sx={{ mb: 3 }}
          >
            <Typography variant="h4">
              Account
            </Typography>
            <div>
              <Tabs
                indicatorColor="primary"
                onChange={handleTabsChange}
                scrollButtons="auto"
                textColor="primary"
                value={currentTab}
                variant="scrollable"
              >
                {
                  tabs.map((tab) => (
                    <Tab
                      key={tab.value}
                      label={tab.label}
                      value={tab.value}
                    />
                    )
                  )
                }
              </Tabs>
              <Divider />
            </div>
          </Stack>
          {currentTab === 'general' && (
            <AccountGeneral
              avatar={user.avatar || ''}
              email={user.email || ''}
              name={user.name || ''}
            />
          )}
          {currentTab === 'notifications' && <AccountNotifications />}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;

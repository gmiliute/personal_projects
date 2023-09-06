import Head from 'next/head';
import React from 'react';
import { addDays, subDays, subHours, subMinutes } from 'date-fns';
import {
  Box,
  Button,
  Container,
  Stack,
  SvgIcon,
  Typography,
  Unstable_Grid2 as Grid
} from '@mui/material';
import { useSettings } from '../../sections/temp-auth';
import { Layout as DashboardLayout } from '../../layouts/dashboard';
import { Inbox } from '../../layouts/dashboard/inbox';
import  WrappedTraderView  from '../../layouts/dashboard/trader-view';
import { TipDashboard } from '../../layouts/dashboard/tip-dashboard';
import { VolatilityScanner } from '../../layouts/dashboard/volatility-scanner';
import { QuickTrade } from '../../layouts/dashboard/quick-trade';

const now = new Date();

const Page = () => {
  const settings = useSettings();

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
        <Container maxWidth={settings.stretch ? false : 'xl'}>
          <Grid
            container
            disableEqualOverflow
            spacing={{
              xs: 3,
              lg: 4
            }}
          >
            <Grid xs={12}>
              <Stack
                direction="row"
                justifyContent="space-between"
                spacing={4}
              >
                <div>
                  <Stack
                    direction="row"
                    spacing={4}
                  >
                  </Stack>
                </div>
              </Stack>
            </Grid>
            <Grid
              xs={12}
              md={7}
            >
              <QuickTrade/>
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
              <TipDashboard
                sx={{ height: '100%' }}
                tips={[
                  {
                    title: 'Black Scholes at your fingertips',
                    content: 'Your favorite Quick Trade function is ready to calculate, whether or not according to the golden standard in the industry it is worth to consider the instrument.'
                  },
                  {
                    title: 'Machine Learning Scanner but for ETH call options.',
                    content: 'It was never that easy to just take a look and see what 96.4% accuracy (super)model is thinking (or calculating!) today.'
                  },
                  {
                    title: 'Tell your friends about your Trader View findings.',
                    content: 'Saw that delta change??!! Let your friends to know first about it and plan study session together!'
                  }
                ]}
              />
            </Grid>
            <Grid
              xs={14}
              md={7}
            >
              <VolatilityScanner
                chartSeries={[
                    {
                    name: 'Realized Volatility',
                    data: [0.0364462653, 0.036349939, 0.0363584401, 0.0341188769, 0.0307199206, 0.0279415887, 0.0279398413, 0.0278800523, 0.0278323532, 0.0278678373, 0.0279079867, 0.0278504028]
                    },
                    {
                    name: 'Forecast',
                    data: [0.0364614762, 0.03606892, 0.0360860154, 0.0359582603, 0.036617253, 0.0364422984, 0.0365149379, 0.0360033177, 0.0357120335, 0.0355633572, 0.0349628665, 0.0339113213]
                    }
                    ]}
                />
            </Grid>
            <Grid
              xs={12}
              md={5}
            >
              <Inbox
                messages={[

                  {
                    id: 'xdzgw0hg3ud8vepjdxpf',
                    content: 'I cannot believe how accurate the calculator is!!',
                    createdAt: subMinutes(now, 56),
                    senderAvatar: '/assets/denisa-day.png',
                    senderName: 'Denisa Day',
                    senderOnline: false
                  },
                  {
                    id: 'rang8azms3kp9gmg72yo',
                    content: 'Wanna study in library later tomorrow?',
                    createdAt: subHours(subMinutes(now, 23), 3),
                    senderAvatar: '/assets/alfonso-aloy.png',
                    senderName: 'Alfonso Aloy',
                    senderOnline: true
                  },
                  {
                    id: '2qhlsrds2v6bbv48c1ea',
                    content: 'GARCH vs LSTM????',
                    createdAt: subHours(subMinutes(now, 6), 8),
                    senderAvatar: '/assets/charlie-cirtoin.png',
                    senderName: 'Charlie Cirtoin',
                    senderOnline: true
                  },
                  {
                    id: '426pjns9ofbt5qh7qjkw',
                    content: 'They will close the ITL in June :(',
                    createdAt: subHours(subMinutes(now, 18), 10),
                    senderAvatar: '/assets/beata-bay.png',
                    senderName: 'Beata Bay',
                    senderOnline: false
                  }
                ]}
              />
            </Grid>
            <Grid
              xs={12}
              md={12}
            >
               <WrappedTraderView />

            </Grid>
            <Grid
              xs={12}
              md={8}
            >

            </Grid>
            <Grid xs={6}>

            </Grid>
            <Grid xs={6}>

            </Grid>
          </Grid>
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

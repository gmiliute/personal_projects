import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import Menu01Icon from '@untitled-ui/icons-react/build/esm/Menu01';
import { Box, IconButton, Stack, SvgIcon, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Scrollbar } from '../../../sections/scrollbar';
import { paths } from '../../../paths';
import { AccountButton } from '../button';
import { ContactsButton } from '../friends-button';
import { TopNavSection } from './top-nav-section';

const useCssVars = (color) => {
  const theme = useTheme();

  return useMemo(() => {
    switch (color) {

      case 'evident':
        if (theme.palette.mode === 'dark') {
          return {
            '--nav-bg': theme.palette.neutral[800],
            '--nav-color': theme.palette.common.white,
            '--nav-divider-color': theme.palette.neutral[700],
            '--nav-border-color': 'transparent',
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.common.white,
            '--nav-item-disabled-color': theme.palette.neutral[500],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[500],
            '--nav-item-chevron-color': theme.palette.neutral[600],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          };
        } else {
          return {
            '--nav-bg': theme.palette.neutral[800],
            '--nav-color': theme.palette.common.white,
            '--nav-divider-color': theme.palette.neutral[700],
            '--nav-border-color': 'transparent',
            '--nav-logo-border': theme.palette.neutral[700],
            '--nav-item-color': theme.palette.neutral[400],
            '--nav-item-hover-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-bg': 'rgba(255, 255, 255, 0.04)',
            '--nav-item-active-color': theme.palette.common.white,
            '--nav-item-disabled-color': theme.palette.neutral[500],
            '--nav-item-icon-color': theme.palette.neutral[400],
            '--nav-item-icon-active-color': theme.palette.primary.main,
            '--nav-item-icon-disabled-color': theme.palette.neutral[500],
            '--nav-item-chevron-color': theme.palette.neutral[600],
            '--nav-scrollbar-color': theme.palette.neutral[400]
          };
        }

      default:
        return {};
    }
  }, [theme, color]);
};

export const TopNav = (props) => {
  const { color = 'evident', onMobileNav, sections = [] } = props;
  const pathname = usePathname();
  const mdUp = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const cssVars = useCssVars(color);

  return (
    <Box
      component="header"
      sx={{
        ...cssVars,
        backgroundColor: 'var(--nav-bg)',
        borderBottomColor: 'var(--nav-border-color)',
        borderBottomStyle: 'solid',
        borderBottomWidth: 1,
        color: 'var(--nav-color)',
        left: 0,
        position: 'sticky',
        top: 0,
        zIndex: (theme) => theme.zIndex.appBar
      }}
    >
      <Stack
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        spacing={2}
        sx={{
          px: 3,
          py: 1
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          {!mdUp && (
            <IconButton onClick={onMobileNav}>
              <SvgIcon>
                <Menu01Icon />
              </SvgIcon>
            </IconButton>
          )}

        </Stack>
        <Stack
          alignItems="center"
          direction="row"
          spacing={2}
        >
          <ContactsButton />
          <AccountButton />
        </Stack>
      </Stack>
      {mdUp && (
        <Box
          sx={{
            borderTopWidth: 1,
            borderTopStyle: 'solid',
            borderTopColor: 'var(--nav-divider-color)'
          }}
        >
          <Scrollbar
            sx={{
              '& .simplebar-scrollbar:before': {
                background: 'var(--nav-scrollbar-color)'
              }
            }}
          >
            <Stack
              alignItems="center"
              component="nav"
              direction="row"
              spacing={1}
              sx={{
                px: 2,
                py: 1.5
              }}
            >
              {sections.map((section, index) => (
                <TopNavSection
                  items={section.items}
                  key={index}
                  pathname={pathname}
                  subheader={section.subheader}
                />
              ))}
            </Stack>
          </Scrollbar>
        </Box>
      )}
    </Box>
  );
};

TopNav.propTypes = {
  color: PropTypes.oneOf(['evident']),
  onMobileNav: PropTypes.func,
  sections: PropTypes.array
};

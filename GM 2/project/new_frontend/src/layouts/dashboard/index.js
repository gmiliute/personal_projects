import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import PropTypes from 'prop-types';
import { useSettings, withAuthGuard } from '../../sections/temp-auth';
import { HorizontalLayout } from './main-layout';
import { getSections } from './config';

const useTranslatedSections = () => {
  const { t } = useTranslation();

  return useMemo(() => getSections(t), [t]);
};

export const Layout = withAuthGuard((props) => {
  const settings = useSettings();
  const sections = useTranslatedSections();


    return (
      <HorizontalLayout
        sections={sections}
        navColor={settings.navColor}
        {...props} />
    );
});

Layout.propTypes = {
  children: PropTypes.node
};

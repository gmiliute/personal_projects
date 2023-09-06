import { Drawer } from '@mui/material';
import PropTypes from 'prop-types';

export const SettingsDrawer = (props) => {
  const { onClose, open, ...other } = props;

  return (
    <Drawer
      disableScrollLock
      anchor="right"
      onClose={onClose}
      open={open}
      ModalProps={{ BackdropProps: { invisible: true }, sx: { zIndex: 1400 } }}
      PaperProps={{ elevation: 24, sx: { maxWidth: '100%', width: 440 } }}
      {...other}>
      {/* Content */}
    </Drawer>
  );
};

SettingsDrawer.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  values: PropTypes.object
};

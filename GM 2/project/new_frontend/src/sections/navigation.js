import {cloneElement, createContext, useCallback, useContext, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {Popover} from '@mui/material';

const DropdownContext = createContext({
    anchorEl: null,
    onMenuEnter: () => {
    },
    onMenuLeave: () => {
    },
    onTriggerEnter: () => {
    },
    onTriggerLeave: () => {
    },
    open: false,
});

export const DropdownTrigger = ({children}) => {
    const {onTriggerEnter, onTriggerLeave} = useContext(DropdownContext);

    return cloneElement(children, {
        onMouseEnter: (event) => {
            children.props.onMouseEnter?.(event);
            onTriggerEnter(event);
        },
        onMouseLeave: (event) => {
            children.props.onMouseLeave?.(event);
            onTriggerLeave(event);
        },
    });
};

DropdownTrigger.propTypes = {
    children: PropTypes.element.isRequired,
};

export const DropdownMenu = ({anchorEl, children, PaperProps, ...other}) => {
    const ctx = useContext(DropdownContext);

    return (
        <Popover
            anchorEl={anchorEl || ctx.anchorEl}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            open={ctx.open}
            PaperProps={{
                ...PaperProps,
                onMouseEnter: ctx.onMenuEnter,
                onMouseLeave: ctx.onMenuLeave,
                sx: {...PaperProps?.sx, pointerEvents: 'auto'},
            }}
            sx={{pointerEvents: 'none'}}
            transformOrigin={{horizontal: 'left', vertical: 'top'}}
            {...other}
        >
            {children}
        </Popover>
    );
};

DropdownMenu.propTypes = {
    anchorEl: PropTypes.any,
    anchorOrigin: PropTypes.object,
    children: PropTypes.any,
    disableScrollLock: PropTypes.bool,
    PaperProps: PropTypes.object,
    transformOrigin: PropTypes.object,
};

export const Navigation = ({children, delay = 50}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const cleanupRef = useRef(null);

    const handleTriggerEnter = useCallback((event) => {
        clearTimeout(cleanupRef.current);
        setAnchorEl(event.currentTarget);
    }, []);

    const handleTriggerLeave = useCallback(() => {
        cleanupRef.current = setTimeout(() => setAnchorEl(null), delay);
    }, [delay]);

    const handleMenuEnter = useCallback(() => clearTimeout(cleanupRef.current), []);

    const handleMenuLeave = useCallback(() => {
        cleanupRef.current = setTimeout(() => setAnchorEl(null), delay);
    }, [delay]);

    return (
        <DropdownContext.Provider
            value={{
                anchorEl,
                onMenuEnter: handleMenuEnter,
                onMenuLeave: handleMenuLeave,
                onTriggerEnter: handleTriggerEnter,
                onTriggerLeave: handleTriggerLeave,
                open: !!anchorEl,
            }}
        >
            {children}
        </DropdownContext.Provider>
    );
};

Navigation.propTypes = {
    children: PropTypes.arrayOf(PropTypes.any).isRequired,
    delay: PropTypes.number,
};
import {useCallback, useRef, useState} from 'react';
import {subHours} from 'date-fns';
import Users03Icon from '@untitled-ui/icons-react/build/esm/Users03';
import {IconButton, SvgIcon, Tooltip} from '@mui/material';
import {FriendButton} from './friend-button';

const now = new Date();

const useContacts = () => {
    return [
        {
            id: 'xdzgw0hg3ud8vepjdxpf',
            avatar: '/assets/denisa-day.png',
            isActive: true,
            lastActivity: now.getTime(),
            name: 'Denisa Day'
        },
        {
            id: 'rang8azms3kp9gmg72yo',
            avatar: '/assets/alfonso-aloy.png',
            isActive: false,
            lastActivity: subHours(now, 1).getTime(),
            name: 'Alfonso Aloy'
        },
        {
            id: '2qhlsrds2v6bbv48c1ea',
            avatar: '/assets/charlie-cirtoin.png',
            isActive: true,
            lastActivity: now.getTime(),
            name: 'Charlie Cirtoin'
        },
        {
            id: '426pjns9ofbt5qh7qjkw',
            avatar: '/assets/beata-bay.png',
            isActive: true,
            lastActivity: now.getTime(),
            name: 'Beata Bay'
        }
    ];
};

export const ContactsButton = () => {
    const anchorRef = useRef(null);
    const [openPopover, setOpenPopover] = useState(false);
    const contacts = useContacts();

    const handlePopoverOpen = useCallback(() => {
        setOpenPopover(true);
    }, []);

    const handlePopoverClose = useCallback(() => {
        setOpenPopover(false);
    }, []);

    return (
        <>
            <Tooltip title="Contacts">
                <IconButton
                    onClick={handlePopoverOpen}
                    ref={anchorRef}
                >
                    <SvgIcon>
                        <Users03Icon/>
                    </SvgIcon>
                </IconButton>
            </Tooltip>
            <FriendButton
                anchorEl={anchorRef.current}
                contacts={contacts}
                onClose={handlePopoverClose}
                open={openPopover}
            />
        </>
    );
};

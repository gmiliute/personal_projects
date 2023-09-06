import SearchMdIcon from '@untitled-ui/icons-react/build/esm/SearchMd';
import {Box, Button, Card, CardHeader, Stack, SvgIcon, TextField} from '@mui/material';
import React, {useState, useEffect} from 'react';

const platformOptions = ['Web', 'Node.js', 'Python', 'C#'];

export const QuickTrade = () => {
    const [S, setS] = useState('');
    const [K, setK] = useState('');
    const [r, setR] = useState('3.69');
    const [sigma, setSigma] = useState('18.5');
    const [callPrice, setCallPrice] = useState('');

    const TimeUntilJune2023 = () => {
        const today = new Date();
        const june2023 = new Date('2023-06-30');
        const timeDifference = june2023 - today;
        const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        const yearsDifference = daysDifference / 365;
        return yearsDifference.toFixed(2);
    };

    const [T, setT] = useState('');

    useEffect(() => {
        setT(TimeUntilJune2023());
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/api/calc', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({S, K, T, r, sigma}),
        });
        const data = await response.json();
        console.log(data);
        setCallPrice(data.call_price);
    };

    return (
        <Card>
            <CardHeader title="Quick Trade!"/>
            <Stack alignItems="center" direction="row" flexWrap="wrap" gap={2} sx={{p: 3}}>
                <Box sx={{flexGrow: 1}}>
                    <TextField
                        type="number"
                        defaultValue=""
                        fullWidth
                        label="Underlying Price"
                        placeholder="ETH Underlying Price"
                        onChange={(e) => setS(e.target.value)}
                        value={S}
                    />
                </Box>
                <Box sx={{flexGrow: 1}}>
                    <TextField
                        type="number"
                        defaultValue=""
                        fullWidth
                        label="Exercise Price"
                        placeholder="ETH Exercise Price"
                        onChange={(e) => setK(e.target.value)}
                        value={K}
                    />
                </Box>
                <Button
                    size="large"
                    type="button"
                    align="center"
                    startIcon={
                        <SvgIcon>
                            <SearchMdIcon/>
                        </SvgIcon>
                    }
                    variant="contained"
                    onClick={handleSubmit}
                >
                    Calculate possible returns!
                </Button>
            </Stack>
        </Card>
    );
};
import PropTypes from 'prop-types';
import React, {useState, useEffect} from 'react';
import {
    Card,
    CardHeader,
    Divider,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography
} from '@mui/material';
import {Scrollbar} from '../../sections/scrollbar';

export default function WrappedTraderView() {
    const [transactionsData, setTransactionsData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost/api/test');
                const data = await response.json();

                const dataArray = Object.values(data);

                setTransactionsData(dataArray);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return <TraderView transactions={transactionsData}/>;
}

export const TraderView = (props) => {
    const {transactions} = props;

    return (
        <Card>
            <CardHeader
                title="Trader View"
                subheader="Based on 2023-JUN-30 ETH CALL OPTIONS"
                sx={{pb: 0}}
            />
            <Divider/>
            <Tabs
                value="options"
                sx={{px: 3}}
            >
                <Tab
                    label="Top Options"
                    value="options"
                />
                <Tab
                    label="Price"
                    value="price"
                />
            </Tabs>
            <Scrollbar>
                <Table sx={{minWidth: 600}}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography variant="subtitle2">Instrument Name</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">Open Interest</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">Delta</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="subtitle2">Mark Price</Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {transactions.map((transaction) => {
                            // transaction.mark_price = undefined;
                            // transaction.open_interest = undefined;
                            // transaction.instrument_name = undefined;
                            // transaction.delta = undefined;
                            return (
                                <TableRow
                                    key={transaction.id}
                                    hover
                                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                                >
                                    <TableCell>
                                        <Typography variant="Name">
                                            {transaction.instrument_name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {transaction.open_interest}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography
                                            variant="subtitle2"
                                            sx={{
                                                color:
                                                    transaction.delta > 0.5 ? 'green' : transaction.delta < 0.5 ? 'red' : 'inherit',
                                            }}
                                        >
                                            {transaction.delta}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="subtitle2">
                                            {transaction.mark_price}
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </Scrollbar>
        </Card>
    );
};

TraderView.propTypes = {
    transactions: PropTypes.array.isRequired
};

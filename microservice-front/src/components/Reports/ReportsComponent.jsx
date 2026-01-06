import { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Typography, Box, Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const ReportsComponent = () => {
    const [value, setValue] = useState(0);
    const [activeLoans, setActiveLoans] = useState([]);
    const [delinquentClients, setDelinquentClients] = useState([]);
    const [ranking, setRanking] = useState([]);
    const apiBase = import.meta.env.VITE_API_BASE_URL;

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    useEffect(() => {
        // const token = localStorage.getItem('token');
        // const config = { headers: { Authorization: `Bearer ${token}` } };
        // Assuming backend is open now, or we use keycloak token if we had access to it here.
        // For now, removing auth header as backend security is disabled.

        axios.get(`${apiBase}/report/active`).then(res => setActiveLoans(res.data));
        axios.get(`${apiBase}/report/delayed-clients`).then(res => setDelinquentClients(res.data));
        axios.get(`${apiBase}/report/ranking`).then(res => setRanking(res.data));
    }, [apiBase]);

    return (
        <Container>
            <Typography variant="h4" sx={{ mt: 4, mb: 2 }}>Reports</Typography>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="report tabs">
                    <Tab label="Active Loans" />
                    <Tab label="Delinquent Clients" />
                    <Tab label="Tool Ranking" />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Loan ID</TableCell>
                                <TableCell>Client</TableCell>
                                <TableCell>Tool</TableCell>
                                <TableCell>Return Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {activeLoans.map((loan) => (
                                <TableRow key={loan.loanId}>
                                    <TableCell>{loan.loanId}</TableCell>
                                    <TableCell>{loan.client?.name}</TableCell>
                                    <TableCell>{loan.tool?.name}</TableCell>
                                    <TableCell>{loan.returnDate}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>RUT</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {delinquentClients.map((client) => (
                                <TableRow key={client.rut}>
                                    <TableCell>{client.rut}</TableCell>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.email}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
            <TabPanel value={value} index={2}>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Category</TableCell>
                                <TableCell>Fee</TableCell>
                                <TableCell>Stock</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ranking.map((tool, index) => (
                                <TableRow key={index}>
                                    <TableCell>{tool.nameTool}</TableCell>
                                    <TableCell>{tool.categoryTool}</TableCell>
                                    <TableCell>${tool.feeTool}</TableCell>
                                    <TableCell>{tool.quantityTool}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </TabPanel>
        </Container>
    );
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

export default ReportsComponent;

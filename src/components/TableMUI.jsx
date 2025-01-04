'use client'
import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TextField from '@mui/material/TextField';
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/AppContext";
import { calculateAge } from "../../utils/fun";
import axios from "axios";


const columns = [
    { id: 'Doctor ID', label: 'ID', Width: 50, align: 'left' },
    { id: 'Doctor Name', label: 'Name', Width: 100, align: 'left' },
    { id: 'speciality', label: 'Speciality', Width: 100, align: 'left' },
    { id: 'Age', label: 'Age', Width: 100, align: 'left' },
    { id: 'Status', label: 'Status', Width: 100, align: 'left' },
    { id: 'Action', label: 'Action', Width: 100, align: 'left' },
];

export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState("");
    const { doctors, getDoctosData } = useContext(AppContext);



    // Filter doctors based on the search query
    const filteredDoctors = doctors?.filter((doctor) => {
        const fullName = `${doctor.user.first_name} ${doctor.user.last_name}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const doctorBERbage = filteredDoctors?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleActive = async (id, isActive) => {
        const data = {
            is_active: !isActive,
        };
       if(doctors)
        await axios.put('http://localhost:8000/'+`api/doctors/${id}`, data);
    }

    useEffect(() => {
        getDoctosData();

    }, [handleActive()]);


    return (
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            {/* Search Input */}
            <div className={"sm:w-full  md:max-w-52"} style={{ padding: '16px' }}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <TableContainer sx={{   }}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {doctorBERbage?.map((row, _idx) => {
                            return (
                                <TableRow hover role="checkbox" tabIndex={-1} key={_idx}>
                                    <TableCell align={"left"}>
                                        {row.id}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {row.user.first_name} {row.user.last_name}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {row.speciality}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {calculateAge(row.user.dob)}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {row.user.is_active ? "Active" : "DeActive"}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        <button
                                            onClick={() => handleActive(row.id, row.user.is_active)}
                                            className={`p-2 rounded-md text-white min-w-20 ${
                                                row.user.is_active ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"
                                            }`}
                                        >
                                            {row.user.is_active ? "Active" : "DeActive"}
                                        </button>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={filteredDoctors?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

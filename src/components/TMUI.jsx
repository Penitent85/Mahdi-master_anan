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
import {useContext, useEffect, useState} from "react";
import {AppContext} from "@/context/AppContext";
import {calculateAge, dateFormate} from "../../utils/fun";
import {DashboardContext} from "@/context/DashboardContext";
import {AdminContext} from "@/context/AdminContext";
import axios from "axios";

const columns = [
    {id: 'Doctor ID', label: 'ID', Width: 50, align: 'left'},
    {id: 'Patient', label: 'Patient', Width: 50, align: 'left'},
    {id: 'Age', label: 'Age', Width: 100, align: 'left'},
    {id: 'Date & Time', label: 'Date & Time', Width: 100, align: 'left'},
    {id: 'Doctor Name', label: 'Name', Width: 100, align: 'left'},
    {id: 'Fees', label: 'Fees', Width: 100, align: 'left'},
    {id: 'Action', label: 'Action', Width: 100, align: 'left'},
];


export default function StickyHeadTable() {
    const [page, setPage] = React.useState(0)
    const [status, setStatus] = useState(null)
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searchQuery, setSearchQuery] = React.useState("");
    const {doctors, getDoctosData} = useContext(AppContext);


    const {aToken, appointments, cancelAppointment, getAllAppointments} = useContext(AdminContext)
    const {slotDateFormat, calculateAge, currency} = useContext(DashboardContext);

    const handleActive = async (id, status) => {
        const data = {
            'status': status === "pending" ? "completed" : "pending"
        };

        await axios.put('http://localhost:8000/' + `api/appointments/${id}`, data);
        getAllAppointments();
    }


    useEffect(() => {
        if (aToken) {
            getAllAppointments()
            getDoctosData();
        }
    }, [aToken])
    console.log(appointments)
    const splitTime = (time) => {
        const utcDate = new Date(time);
        return utcDate.toLocaleTimeString('en-GB', {hour12: false}); // Time in format HH:mm:ss
    }
    const splitDate = (date) => {
        const utcDate = new Date(date);
        return utcDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Date in format YYYY:MM:DD
    }




    // Filter doctors based on the search query
    const filteredDoctors = appointments;

    const doctorBERbage = appointments?.slice(page * rowsPerPage, (page + 1) * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Paper   className='h-screen' sx={{width: '100%' , overflow: 'hidden'}}>
            {/* Search Input */}
            <div className={"sm:w-full  md:max-w-52"} style={{padding: '16px'}}>
                <TextField
                    label="Search by Name"
                    variant="outlined"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>
            <TableContainer className='m-4 p-4'>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
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
                                        {_idx + 1}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {row.doctor.user.first_name} {row.doctor.user.last_name}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        {calculateAge(row?.patient.user.dob)}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                        <p className='max-sm:hidden'>{dateFormate(row.date)} : {row.time}</p>

                                        {/*{dateFormate(row?.date) } : {row?.time}*/}
                                    </TableCell>
                                    <TableCell align={"left"}>
                                    {row.doctor.user.first_name} {row.doctor.user.last_name}
                                        {/*{row.user?.is_active ? "Active" : "DeActive"}*/}
                                    </TableCell>
                                    <TableCell align={"left"}>

                                        {row.doctor.fee}
                                    </TableCell>
                                    <TableCell align={"left"}>

                                        <button

                                            onClick={() => handleActive(row.id, row.status)}
                                            className={`p-2 rounded-md text-white min-w-20 ${
                                                row.status !== "pending" ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"
                                            }`}
                                        >
                                            {row.status !== "pending" ? "Completed" : "Pending"}
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


//
// "use client";
// import React, { useEffect } from 'react'
// import { assetsDashboard } from '../../../assets/assets'
// import { useContext } from 'react'
// import { AdminContext } from '@/context/AdminContext'
// import { AppContext } from '@/context/AppContext'
// import { DashboardContext } from '@/context/DashboardContext';
// import images from '@/assets/123.jpg'
// import Image from "next/image";
// import {dateFormate} from "../../../../utils/fun";
//
// const AllAppointments = () => {
//     const {aToken, appointments, cancelAppointment, getAllAppointments} = useContext(AdminContext)
//     const {slotDateFormat, calculateAge, currency} = useContext(DashboardContext);
//     useEffect(() => {
//         if (aToken) {
//             getAllAppointments()
//         }
//     }, [aToken])
//     console.log(appointments)
//     const splitTime = (time) => {
//         const utcDate = new Date(time);
//         return   utcDate.toLocaleTimeString('en-GB', { hour12: false }); // Time in format HH:mm:ss
//     }
//     const splitDate = (date) => {
//         const utcDate = new Date(date);
//         return   utcDate.toLocaleDateString('en-GB').replace(/\//g, '-'); // Date in format YYYY:MM:DD
//     }
//

//
//                 {appointments.map((item, index) => (
//                     <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
//                         <p className='max-sm:hidden'>{index+1}</p>
//                         <div className='flex items-center gap-2'>
//                             <Image src={images} className='w-8 rounded-full' alt="" /> <p>{item.doctor.user.last_name}</p>
//                         </div>
//                         <p>18</p>
//                         <p className='max-sm:hidden'>{dateFormate(item.date) } : {item.time}</p>
//                         <p>{item.doctor.user.username}</p>
//                         {/*<p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>*/}
//                         {/*    <div className='flex items-center gap-2'>*/}
//                         {/*      /!* <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p> *!/*/}
//                         {/*      <img src={images} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>*/}
//                         {/*    </div>*/}
//                         <p>{currency}{item.amount}</p>
//                         {item.status ==="pending" ?  <p className='text-red-400 text-xs font-medium'>Pending</p> :  <p className='text-green-500 text-xs font-medium'>Completed</p>   }
//                     </div>
//                 ))}

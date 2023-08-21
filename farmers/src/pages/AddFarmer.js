import { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from './Header';
import './styles/AddFarmer.css'

const AddFarmer = async () =>{
    const location = useLocation();
    const brandId = location.state.brandId; 
    const farmerList = location.state.farmerList; 
        try {
            const token = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMyIsImlhdCI6MTY5MTkzNjM0OSwiZXhwIjo1NDI0NDE2MzQ5fQ.hk_VveWhENStASA9hIrDhoGUpAENRkOf0Ib6qKslPQs";
            const response = axios.post(`/brand/farmer/${brandId}`, 
            farmerList, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });
            if (response.data.status === 200) {
                console.log(response);
                alert(response.data.message); 
            }
        } catch (error) {
            console.log(error);
        }
}

export default AddFarmer;

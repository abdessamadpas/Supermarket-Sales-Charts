import './style.css';
import {useState, useEffect } from 'react';
import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import axios from 'axios';


function Main() {

    const [data, setData] = useState([]);
    const [datasec, setDatasec] = useState([]);
    const [datathird, setDatathird] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const result = await axios(
          'https://supermarket-sales-charts.vercel.app/api/purchases-by-customer-type',
        );
  
        setData(result.data);
      };
  
      fetchData();
    }, []);
    useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'https://supermarket-sales-charts.vercel.app/api/average-rating-by-gender',
          );
    
          setDatasec(result.data);
        };
    
        fetchData();
      }, []);
      useEffect(() => {
        const fetchData = async () => {
          const result = await axios(
            'https://supermarket-sales-charts.vercel.app/api/revenue-by-product-line',
          );
    
          setDatathird(result.data);
        };
    
        fetchData();
      }, []);
    return (


    <div className='body'>
        
    
        <div class="app">
    

            <div class="main-container">
                <div class="main-header">
                    <a class="menu-link-main" href="#">All charts for the bonus frontend Reactjs - Axios - Recharts</a>
                    
                </div>
                <div class="content-wrapper">
                    <div class="content-wrapper-header">
                        <div class="content-wrapper-context">
                            <h3 class="img-content">statistics of charts</h3>
                        </div>
                    </div>
                </div>
            </div> 

            {/* charts here      */}

        <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={100}
            height={100}
            data={data}
            margin={{
                top: 10,
                right: 100,
                left: 100,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="purchases" fill="#8884d8" />
            </BarChart>
      </ResponsiveContainer>

      <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={100}
            height={100}
            data={datasec}
            margin={{
                top: 5,
                right: 100,
                left: 100,
                bottom: 0,
            }}
            >
            <CartesianGrid strokeDasharray="1 1" />
            <XAxis dataKey="_id" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="rating" fill="#8884d8" />
            </BarChart>
      </ResponsiveContainer>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={datathird}
          margin={{
            top: 5,
            right: 100,
            left: 100,
            bottom: 0,
          }}
          barSize={20}
        >
          <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
          <YAxis />
          <Tooltip />
          <Legend />
          <CartesianGrid strokeDasharray="3 3" />
          <Bar dataKey="revenue" fill="#8884d8" background={{ fill: '#82ca9d' }} />
        </BarChart>
      </ResponsiveContainer>

        </div>
    </div>

    );
}

export default Main;
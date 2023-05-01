import React, { useEffect, useState } from 'react';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
import Castle from '../../images/castle.jpg';
import styled from 'styled-components';
import Box from "@mui/material/Box";
import { ThemeProvider, Grid } from "@material-ui/core";
import theme from '../../components/CareerCenter/theme/theme';
import Header from '../../components/CareerCenter/Header';
import Search from '../../components/CareerCenter/Search';
import JobCard from '../../components/CareerCenter/Jobs/JobCard';
import NewJob from '../../components/CareerCenter/Jobs/NewJob';
import EditJob from '../../components/CareerCenter/Jobs/EditJob/EditJob';
import InfiniteScroll from 'react-infinite-scroll-component';
import { TailSpin } from  'react-loader-spinner';
import api from '../../api/index';

const Background= styled.section`
    background-image: url(${Castle});
    height: 100%;
    width: 100%;
    display: block;
    background-size: cover;
    background-repeat: no-repeat;
    position: fixed;
    overflow: scroll;
`;

const CareerCenter = () => {
  const [newJob, setNewJob]= useState(false);
  const [editJob, setEditJob]= useState(false);
  const [job, setJobs] = useState([]);
  const [page, setPage]= useState(1);
  
  const filterJobs = async(filterSettings) => {
    if (!filterSettings || (filterSettings.type=== "" && filterSettings.location=== "")) {
      await api.getAllJobs().then((response) => {
        setJobs(response.data);
      });
    }

    else {
      await api.getAllJobs().then((response) => {
        const filteredJobs= response.data.filter(
          (job) => job.type=== filterSettings.type && job.location=== filterSettings.location
        );
          /*
        const ele= filteredJobs.map((job) => (
          <>
            <JobCard props={job} openEditJob={() => setEditJob(true)} />
            <EditJob _id={job._id} closeEditJob={() => setEditJob(false)} editJob={editJob} />
          </>
        ));*/
        setJobs(filteredJobs);
        })
      }
    }
      
      
    useEffect(() =>{
      const getJobs = async () =>{
        await api.getAllJobs().then(jobs => {
          setJobs(jobs.data)
          /*
          const ele = job.map((job)=>{
            return (<><JobCard props={job} openEditJob={() => setEditJob(true)}/>
            <EditJob _id={job._id} closeEditJob={() => setEditJob(false)} editJob={editJob}></EditJob>
            </>)
          })
        setElements(ele)*/})
        }

      getJobs()
    },[])
  
  const getNextJobs= async () => {
      const nextPage= page+1;
      await api.getAllJobs(nextPage).then((response) => {
        const nextJobs= response.data.filter((job) => !jobAlreadyPosted(job, job));
        setJobs([...job, ...nextJobs]);
        setPage(nextPage);
      });
  };
    
  const jobAlreadyPosted= (job, jobs) => {
      return jobs.some((j) => j._id=== job._id);
  };
    
  return (
    <>
      <Navbar />
      <Background>
        <ThemeProvider theme={theme}>
          <Header openNewJob={() => setNewJob(true)} />
          <NewJob closeNewJob={() => setNewJob(false)} newJob={newJob} />
          <Box mb={3}>
            <Grid container justifyContent='center'>
              <Grid item xs={10}>
                <Search filterJobs={filterJobs}/>
                <InfiniteScroll
                    dataLength={filterJobs.length} 
                    next={getNextJobs} 
                    hasMore={true}
                    loader={<TailSpin
                      height="30"
                      width="30"
                      color="#a32738"
                      ariaLabel="tail-spin-loading"
                      radius="1"
                      wrapperStyle={{}}
                      wrapperClass=""
                      visible={true}
                      alignItems="center"
                    />}
                >
                {job.map((_job, index)=>{
                    return (<><JobCard props={_job} openEditJob={() => setEditJob(true)}/>
                    <EditJob props={_job} index={index} closeEditJob={() => setEditJob(false)} editJob={editJob}></EditJob>
                    </>)})} 
                </InfiniteScroll>
              </Grid>
            </Grid>
          </Box>
        </ThemeProvider>
        <Footer />
      </Background>
    </>
  )
}

export default CareerCenter;




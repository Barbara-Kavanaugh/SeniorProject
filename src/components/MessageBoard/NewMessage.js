import React, { useState } from 'react';
import Box from "@mui/material/Box";
import { FaPaw } from 'react-icons/fa';
import CloseIcon from '@mui/icons-material/Close';
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { 
    Button,
    Typography,
    Grid,
    FilledInput,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    makeStyles
} from '@material-ui/core';
import api from '../../api/index';

const useStyles= makeStyles(theme => ({
    categoryChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 600,
        border: '.5px solid #60000d',
        cursor: 'pointer',

        '&:hover': {
            backgroundColor: theme.palette.secondary.main,
            color: '#fdfdfd'
        },
    },
    included: {
        backgroundColor: theme.palette.secondary.main,
        color: '#fdfdfd'  
    }
}));

const initState= {
    author_id: sessionStorage.getItem('user'),
    title: "",
    description: "",
    categories: [],
    comments: []   
}

export default (props) => {
    const classes= useStyles();
    const [messageDetails, setMessageDetails]= useState(initState);
    const [image, setImage]= useState('');

    function handleImage(e) {
        setImage(e.target.files[0]);
    }

    const handleChange= event => {
        event.persist();
        setMessageDetails(oldState => ({...oldState, [event.target.name] : event.target.value}));
    }

    const addRemoveCategory= category => messageDetails.categories.includes(category)
        ? setMessageDetails(oldState => ({...oldState, categories: oldState.categories.filter(c => c != category),
            }))
        : setMessageDetails(oldState => ({...oldState, categories: oldState.categories.concat(category)
        }));
    
    const handleSubmit= async() => {
        for (const field in messageDetails) {
            
            if (typeof messageDetails[field] === 'string' && !messageDetails[field])
                
             return;
        }

        if (!messageDetails.categories.length)             
        return;
        closeNewMessage();

        if(!sessionStorage.getItem('user')){
            alert('You must be logged in to post to the message board')
            return
        }
        const { author_id, dateCreated, title, categories, description, comments } = messageDetails
      
        const payload = { author_id, dateCreated, title, categories, description, comments }
            
          await api.insertMessage(payload).then(res => {
            //window.alert('Job Created')
          })
          window.location.reload(true)

    }

    const closeNewMessage= () => {
        setMessageDetails(initState);
        props.closeNewMessage();
    }

    const categories= [
        "Events",
        "Life Updates",
        "News",
        "Memories",
        "Reunions"
    ];
    
    return (
        <Dialog open={props.newMessage} fullWidth>
            <DialogTitle>
                <Box display='flex' justifyContent='space-between' alignItems='center'>
                    Share Exciting Updates
                    <IconButton onClick={closeNewMessage}>
                        <CloseIcon />
                    </IconButton>
                </Box>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                        <FilledInput onChange={handleChange} name='title' value={messageDetails.title} autoComplete='off' placeholder=' Title *' disableUnderline fullWidth/>
                    </Grid>
                    <Grid item xs={12}>
                        <FilledInput onChange={handleChange} name='description' value={messageDetails.description} autoComplete='off' placeholder='Description *' disableUnderline fullWidth multiline rows={4}/>
                    </Grid>
                    <Grid item xs={6}>
                        <FilledInput onChange={handleImage} name='media' type='file' disableUnderline fullWidth/>
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Typography>Categories *</Typography>
                    <Box display='flex'>
                        {categories.map(category => <Box onClick={() => addRemoveCategory(category)} className={`${classes.categoryChip} ${messageDetails.categories.includes(category) && classes.included}`} key={category}>{category}</Box>)}
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions>
                <Box alignItems='center' color='#60000d' width='100%' display='flex' justifyContent='space-between'>
                    <Typography variant='caption'>*Required Fields</Typography>
                    <Button variant='contained' color='primary' onClick={handleSubmit}>Submit <FaPaw /></Button>
                </Box>
            </DialogActions>
        </Dialog>
    );
}

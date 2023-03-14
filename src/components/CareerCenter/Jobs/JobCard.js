import React from 'react';
import Box from "@mui/material/Box";
import { FaPaw } from 'react-icons/fa';
import { MdOutlineEditNote } from 'react-icons/md';
import { GiTrashCan } from 'react-icons/gi';
import { 
    Button,
    Grid,
    Typography,
    IconButton,
    makeStyles
} from '@material-ui/core';

const categories= ["Medical"];

const useStyles= makeStyles((theme) => ({
    wrapper: {
        border: '1px solid #63625d',
        backgroundColor: '#fdfdfd',
        display: 'flex',
        boxShadow: '0px 1px 5px rgba(0, 0, 0, 0.1)',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: '.3s',

        '&:hover': {
            boxShadow: '0px 5px 25px rgba(0, 0, 0, 0.1)',
            borderLeft: '6px solid #a32738'
        }
    },
    companyName: {
        fontSize: '13.5px',
        backgroundColor: theme.palette.primary.main,
        color: '#fdfdfd',
        padding: theme.spacing(0.75),
        borderRadius: '5px',
        display: 'inline-block',
        fontWeight: 600
    },
    categoryChip: {
        margin: theme.spacing(0.5),
        padding: theme.spacing(0.75),
        fontSize: '14.5px',
        borderRadius: '5px',
        transition: '.3s',
        fontWeight: 600,
        backgroundColor: theme.palette.secondary.main,
        color: '#fdfdfd'
    },
    edit: {
        maxHeight: '30px',
        maxWidth: '30px'
    }
}));

export default props => {
    const classes= useStyles();

    return (
        <Box p={2} className={classes.wrapper}>
            <Grid container>
                <Grid item xs alignItems='center'>
                    <Typography variant='subtitle1'>Nurse</Typography>
                    <Typography className={classes.companyName} variant='subtitle1'>St. Joseph Medical Center</Typography>
                </Grid>
                <Grid item container xs>
                    {categories.map(category => <Grid key={category} className={classes.categoryChip} style={{height: '35px'}} item>{category}</Grid>)}
                </Grid>
                <Grid item container direction='column' alignItems='flex-end' xs>
                    <Grid item>
                        <Typography variant='caption'> Full Time | Onsite</Typography>
                    </Grid>
                    <Grid item>
                        <Box mt={2}>
                            <IconButton style={{marginRight: '-21px'}}><MdOutlineEditNote /></IconButton><IconButton><GiTrashCan /></IconButton>
                            <Button style={{backgroundColor: '#63625d', color: '#fdfdfd'}}>View Details <FaPaw /></Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
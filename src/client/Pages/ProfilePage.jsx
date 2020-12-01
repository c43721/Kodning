import React from "react";
import Layout from "../Components/Layout";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      overflow: 'hidden',
      padding: theme.spacing(0, 3),
    },
    paper: {
      maxWidth: 400,
      margin: `${theme.spacing(1)}px auto`,
      padding: theme.spacing(2),
    },
  }));

export default function ProfilePage(props){
    const classes = useStyles();

    return(
            
        <Layout>
            <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container wrap="nowrap" spacing={2}>
          <Grid item>
            <Avatar> W </Avatar>
          </Grid>
          <Grid item xs zeroMinWidth>
            <Typography noWrap>{user.name, user.email }</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
</Layout> 

    

)




}
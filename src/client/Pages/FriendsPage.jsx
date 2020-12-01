import React from "react";
import Layout from "../Components/Layout";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles({
	root: {
	  minWidth: 275,
	},
	bullet: {
	  display: 'inline-block',
	  margin: '0 2px',
	  transform: 'scale(0.8)',
	},
	title: {
	  fontSize: 14,
	},
	pos: {
	  marginBottom: 12,
	},
  });


export default function FriendsPage(props) {
  const friendArray = [
    {
      name: "1",
    },
  ];

  return (
    <Layout>
      <Grid container>
        {friendArray.length ? (
          <>
            {friendArray.map((friend) => (
              <Friend {...friend} />
            ))}
          </>
        ) : (
          <Grid item>No friends</Grid>
        )}
      </Grid>
    </Layout>
  );
}

function Friend(props) {
	const classes = useStyles();
  return (
    <Grid item>
      <Card className={classes.root}>
	  <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
		{props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          stuff
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          other stuff
        </Typography>
        <Typography variant="body2" component="p">
          even more stuff
          <br />
          {'"something needs to go here whenm styling"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">cancel friend</Button>
      </CardActions>
	</Card>
</Grid>
  );
}

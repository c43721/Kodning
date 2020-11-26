import React from "react";
import Layout from "../Components/Layout";
import Grid from "@material-ui/core/Grid";

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
  return (
    <Grid item>
      <Card>{props.name}</Card>
    </Grid>
  );
}

import React from "react";
import classes from "./Gavin.scss";
import PhenotypeSelectionContainer from "../containers/PhenotypeSelectionContainer";

export const Gavin = ({loggedIn}) => (
  <div className={classes['Gavin']}>
    <h4>Gavin</h4>
    {loggedIn &&
    <PhenotypeSelectionContainer/>}
  </div>
)

export default Gavin

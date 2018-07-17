import React from "react";
import classes from './Project.css';
import { connect } from 'react-redux';

const project = props => {
   return (
      <div>
         <h3 style={{color: props.colors[props.selected], transition: 'all .5s'}} className={classes.Name}>{props.name}</h3>
         <img src={props.img} alt='project img' />
      </div>
   );
};

const mapStateToProps = state => {
   return {
      colors: state.colors
   };
 };

export default connect(mapStateToProps)(project);

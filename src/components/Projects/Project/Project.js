import React from "react";
import { connect } from 'react-redux';

const project = props => {
   return (
      <div>
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

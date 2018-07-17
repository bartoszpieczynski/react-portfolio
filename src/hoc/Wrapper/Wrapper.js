import React, {Component} from "react";
import classes from "./Wrapper.css";
import '../../index.css';

class Wrapper extends Component {

   render() {
      return (
         <div className={classes.Container}>
            {this.props.children}
         </div>
      );
   }
};

export default Wrapper;

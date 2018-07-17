import React from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

const modal = props => {
   return (
      <div>
         <Backdrop show={props.show} close={props.modalClosed} />
         <div
            className={classes.Modal}
            style={{
               transform: props.show ? "translateY(0)" : "translateY(-100vh)",
               opacity: props.show ? "1" : "0",
               boxShadow: "2px 2px 5px " + props.color
            }}
         >
            <div className={classes.Container}>
               <div className={classes.Cross} onClick={props.modalClosed} />
               <h2
                  style={{
                     color: props.color,
                     borderBottom: "3px solid " + props.color
                  }}
               >
                  {props.id}
               </h2>
               <p className={classes.modalText} style={{ color: props.color }}>
                  {props.text.replace(/[\^]+/g, '\n')}
               </p>
            </div>
         </div>
      </div>
   );
};

export default modal;

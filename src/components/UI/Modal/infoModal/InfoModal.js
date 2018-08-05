import React from "react";

import classes from "./InfoModal.css";
import Backdrop from "../../Backdrop/Backdrop";

const InfoModal = props => {
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
               <p className={classes.modalText}>
                  You can click on the skill icon to toggle a window with informations.
               </p>
            </div>
         </div>
      </div>
   );
};

export default InfoModal;
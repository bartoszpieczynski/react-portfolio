import React from 'react';

import classes from './Backdrop.css';

const backdrop = (props) => {
   const onClose = () => {
      props.close();
      props.resetText();
   }
   return (
      props.show ? <div className={classes.Backdrop} onClick={props.modal ? onClose : props.close}></div> : null
   );
};
  


export default backdrop;
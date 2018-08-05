import React, { Component } from "react";

import classes from "./Modal.css";
import Backdrop from "../Backdrop/Backdrop";

class Modal extends Component {

   state = {
      currentText: 0
   }

   textHandler = (e) => {
      this.setState({currentText: e.target.id})
   }
   
   resetText = () => {
      this.setState({currentText: 0});
   }

   crossReset = () => {
      this.resetText();
      this.props.modalClosed();
   }

   render() {
      let pagination = null;
      if (this.props.textArr.length > 1) {
         pagination = this.props.textArr.map((el, index) => {
            return <span style={{border: '2px inset ' + this.props.color}} key={index} id={index} onClick={this.textHandler}>{index + 1}</span>;
         });
      }
      let finalText = this.props.textArr[this.state.currentText].replace(/\^/g, '\n')
      return (
         <div>
            <Backdrop modal={true} show={this.props.show} resetText={this.resetText} close={this.props.modalClosed} />
            <div
               className={classes.Modal}
               style={{
                  transform: this.props.show
                     ? "translateY(0)"
                     : "translateY(-100vh)",
                  opacity: this.props.show ? "1" : "0",
                  boxShadow: "2px 2px 5px " + this.props.color
               }}
            >
               <div className={classes.Container}>
                  <div className={classes.Cross} onClick={this.crossReset} />
                  <h2
                     style={{
                        color: this.props.color,
                        borderBottom: "3px solid " + this.props.color
                     }}
                  >
                     {this.props.id}
                  </h2>
                  <p
                     className={classes.modalText}
                     style={{ color: this.props.color }}
                  >
                     {finalText}
                  </p>
                  <div className={classes.Pagination}>
                  {pagination}
                  </div>
               </div>
            </div>
         </div>
      );
   }
}

export default Modal;

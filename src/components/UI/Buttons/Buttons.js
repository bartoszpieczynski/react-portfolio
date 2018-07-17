import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Buttons.css";

class Buttons extends Component {
   state = {
      clickedNext: false,
      clickedPrev: false
   };

   onClick = () => {
      this.props.click();
      if (window.location.pathname === "/projects") {
         if (!this.props.prev) {
            if (this.props.selectedColor < 4) {
               this.props.onSelectedChange(this.props.select + 1);
            } else {
               this.props.onSelectedChange(0);
            }
         } else {
            if (this.props.selectedColor > 0) {
               this.props.onSelectedChange(this.props.select - 1);
            } else {
               this.props.onSelectedChange(4);
            }
         }
      }
   };

   render() {
      return (
         <button
            style={{
               fontSize: this.props.fontSize
            }}
            className={classes.Button}
            onClick={() => this.onClick()}
         >
            {this.props.children}
         </button>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSelectedChange: selected =>
         dispatch({ type: "CHANGE_SELECTED", value: selected })
   };
};

const mapStateToProps = state => {
   return {
      colors: state.colors,
      selectedColor: state.selected
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Buttons);

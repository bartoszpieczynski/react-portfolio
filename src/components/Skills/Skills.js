import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import axios from "../../axios";
import ReactSVG from "react-svg";
import ReactTouchEvents from "react-touch-events";
import { connect } from "react-redux";

import classes from "./Skills.css";

import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";
import InfoModal from "../UI/Modal/infoModal/InfoModal";

class Skills extends Component {
   state = {
      showModal: false,
      lang: null,
      skills: null,
      loaded: false,
      currentSkill: null,
      color: "orange",
      showModalInfo: true
   };

   componentDidMount() {
      axios
         .get("/skills.json")
         .then(response => {
            this.setState({ skills: response.data, loaded: true });
         })
         .catch(error => console.log(error));
      if (localStorage.getItem("infoShown")) {
         this.setState({ showModalInfo: false });
      }
   }

   modalOpen = e => {
      this.setState({ showModal: true });
      this.setState({ currentSkill: e.currentTarget.id });
   };

   modalClosed = () => {
      this.setState({ showModal: false, color: "orange" }, () => {
         this.props.onSkillLeave();
      });
   };

   modalClosedInfo = () => {
      this.setState({ showModalInfo: false }, () => {
         localStorage.setItem("infoShown", false);
      });
   };

   newColor = e => {
      this.setState(
         {
            color: this.state.skills[e.currentTarget.id.toLowerCase()].color
         },
         () => {
            this.props.onSkillChange(this.state.color);
         }
      );
   };

   isTouchDevice = () => {
      return "ontouchstart" in document.documentElement;
   };

   oldColor = () => {
      this.setState(
         {
            color: "orange"
         },
         () => {
            this.props.onSkillLeave();
         }
      );
   };

   render() {
      let touch;
      if ("ontouchstart" in document.documentElement) {
         touch = true;
      } else {
         touch = false;
      }
      let skills = <Spinner />;
      let textArr = ["Text couldn't load."];
      if (this.state.loaded) {
         skills = Object.keys(this.state.skills).map(skill => (
            <ReactTouchEvents
               key={this.state.skills[skill].name}
               onTap={this.newColor}
            >
               <ReactSVG
                  id={this.state.skills[skill].name}
                  key={this.state.skills[skill].name}
                  className={classes.svgWrapper}
                  svgClassName={classes.Svg}
                  path={this.state.skills[skill].svg}
                  onClick={this.modalOpen}
                  onMouseEnter={touch ? null : this.newColor}
                  onMouseLeave={this.oldColor}
               />
            </ReactTouchEvents>
         ));
      }
      if (this.state.currentSkill !== null) {
         textArr = [
            this.state.skills[this.state.currentSkill.toLowerCase()].text,
            this.state.skills[this.state.currentSkill.toLowerCase()].secondText
         ].filter(el => {
            return el !== undefined;
         });
      }
      return (
         <Wrapper>
            <div className={classes.Card}>
               <h2
                  style={{
                     color: this.state.color,
                     borderBottom: "3px solid " + this.state.color
                  }}
               >
                  My Skills
               </h2>
               <div
                  className={classes.SkillsContainer}
                  style={{
                     boxShadow: "0px 5px 20px " + this.state.color
                  }}
               >
                  {skills}
               </div>
            </div>
            <Modal
               show={this.state.showModal}
               id={this.state.currentSkill}
               modalClosed={this.modalClosed}
               textArr={textArr}
               color={this.state.color}
            />
            <InfoModal
               show={this.state.showModalInfo}
               modalClosed={this.modalClosedInfo}
            />
         </Wrapper>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onSkillChange: color => dispatch({ type: "CHANGE_COLOR", value: color }),
      onSkillLeave: () => dispatch({ type: "RESET" })
   };
};

export default connect(
   null,
   mapDispatchToProps
)(Skills);

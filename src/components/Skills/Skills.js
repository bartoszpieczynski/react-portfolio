import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import axios from "../../axios";
import ReactSVG from "react-svg";

import classes from "./Skills.css";

import Modal from "../UI/Modal/Modal";
import Spinner from "../UI/Spinner/Spinner";

class Skills extends Component {
   state = {
      showModal: false,
      lang: null,
      skills: null,
      loaded: false,
      currentSkill: null,
      color: "orange"
   };

   componentDidMount() {
      axios
         .get("/skills.json")
         .then(response => {
            this.setState({ skills: response.data, loaded: true });
         })
         .catch(error => console.log(error));
   }

   modalOpen = e => {
      this.setState({ showModal: true });
      this.setState({ currentSkill: e.currentTarget.id });
   };

   modalClosed = () => {
      this.setState({ showModal: false, color: 'orange' });
   };

   newColor = e => {
      this.setState({
         color: this.state.skills[e.currentTarget.id.toLowerCase()].color
      });
   };

   oldColor = () => {
      this.setState({
         color: "orange"
      });
   };

   render() {
      let skills = <Spinner />;
      let modalText = "Text couldn't load.";
      if (this.state.loaded) {
         skills = Object.keys(this.state.skills).map(skill => (
            <ReactSVG
               id={this.state.skills[skill].name}
               key={this.state.skills[skill].name}
               className={classes.svgWrapper}
               svgClassName={classes.Svg}
               path={this.state.skills[skill].svg}
               onClick={this.modalOpen}
               onMouseEnter={this.newColor}
               onMouseLeave={this.oldColor}
            />
         ));
      }
      if (this.state.currentSkill !== null) {
         modalText = this.state.skills[this.state.currentSkill.toLowerCase()]
            .text;
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
               text={modalText}
               color={this.state.color}
            />
         </Wrapper>
      );
   }
}

export default Skills;

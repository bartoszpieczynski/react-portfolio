import React, { Component } from "react";
import classes from "./Projects.css";
import axios from "../../axios";
import { connect } from "react-redux";

import Wrapper from "../../hoc/Wrapper/Wrapper";
import Project from "./Project/Project";
import Spinner from "../UI/Spinner/Spinner";
import Modal from "../UI/Modal/Modal";

class Projects extends Component {
   state = {
      loaded: false,
      projects: null,
      prevActive: true,
      nextActive: false,
      selected: 0,
      showModal: false
   };

   componentDidMount() {
      axios
         .get("/projects.json")
         .then(response => {
            this.setState({ projects: response.data, loaded: true });
         })
         .catch(error => console.log(error));
   }

   nextProject = () => {
      this.setState(
         prevState => {
            return prevState.selected < 4
               ? {
                    selected: prevState.selected + 1
                 }
               : { selected: 0 };
         },
         () => {
            this.props.onProjectChange(this.state.selected);
         }
      );
   };

   prevProject = () => {
      this.setState(
         prevState => {
            return prevState.selected > 0
               ? {
                    selected: prevState.selected - 1
                 }
               : { selected: 4 };
         },
         () => {
            this.props.onProjectChange(this.state.selected);
         }
      );
   };

   modalClosed = () => {
      this.setState({ showModal: false });
   };

   modalOpen = e => {
      this.setState({ showModal: true });
   };

   render() {
      let projects = <Spinner />;
      let textArr = ["Loading..."];
      let name = "My Projects";
      let codeLink = "#";
      let siteLink = "#";
      if (this.state.loaded) {
         let projArr = Object.keys(this.state.projects);
         textArr = [
            this.state.projects[projArr[this.state.selected]].text,
            this.state.projects[projArr[this.state.selected]].secondText
         ].filter(el => {
            return el !== undefined;
         });
         name = this.state.projects[projArr[this.state.selected]].name;
         codeLink = this.state.projects[projArr[this.state.selected]].code;
         siteLink = this.state.projects[projArr[this.state.selected]].site;
         projects = (
            <Project
               selected={this.state.selected}
               img={
                  window.location.origin +
                  this.state.projects[projArr[this.state.selected]].img
               }
               codeUrl={
                  this.state.projects[projArr[this.state.selected]].codeUrl
               }
               siteUrl={
                  this.state.projects[projArr[this.state.selected]].siteUrl
               }
            />
         );
      }

      return (
         <Wrapper>
            <div className={classes.projectsContainer}>
               <h2
                  style={{
                     borderColor: this.props.colors[this.state.selected],
                     color: this.props.colors[this.state.selected],
                     transition: "all .5s"
                  }}
               >
                  {name}
               </h2>

               <div className={classes.projectShowcase}>
                  <button
                     className={classes.arrowPrev}
                     style={{
                        borderColor: this.props.colors[this.state.selected],
                        color: this.props.colors[this.state.selected],
                        transition: "all .5s"
                     }}
                     onClick={this.prevProject}
                  >
                     <i className="fas fa-angle-left" />
                  </button>
                  {projects}
                  <button
                     className={classes.arrowNext}
                     style={{
                        borderColor: this.props.colors[this.state.selected],
                        color: this.props.colors[this.state.selected],
                        transition: "all .5s"
                     }}
                     onClick={this.nextProject}
                  >
                     <i className="fas fa-angle-right" />
                  </button>
               </div>
               <div className={classes.mobileArrows}>
                  <button
                     className={classes.arrowPrevMobile}
                     style={{
                        borderColor: this.props.colors[this.state.selected],
                        color: this.props.colors[this.state.selected],
                        transition: "all .5s"
                     }}
                     onClick={this.prevProject}
                  >
                     <i className="fas fa-angle-left" />
                  </button>
                  <button
                     className={classes.arrowNextMobile}
                     style={{
                        borderColor: this.props.colors[this.state.selected],
                        color: this.props.colors[this.state.selected],
                        transition: "all .5s"
                     }}
                     onClick={this.nextProject}
                  >
                     <i className="fas fa-angle-right" />
                  </button>
               </div>
               <div className={classes.buttonsContainer}>
                  <a href={codeLink}>
                     <button
                        style={{
                           borderColor: this.props.colors[this.state.selected],
                           transition: "all .5s",
                           color: this.props.colors[this.state.selected],
                           boxShadow:
                              "1px 1px 5px " +
                              this.props.colors[this.state.selected]
                        }}
                        className={classes.modalButton}
                     >
                        Code
                     </button>
                  </a>
                  <button
                     onClick={this.modalOpen}
                     style={{
                        borderColor: this.props.colors[this.state.selected],
                        color: this.props.colors[this.state.selected],
                        transition: "all .5s",
                        boxShadow:
                           "1px 1px 5px " +
                           this.props.colors[this.state.selected]
                     }}
                     className={classes.modalButton}
                  >
                     Info
                  </button>
                  <a href={siteLink}>
                     <button
                        style={
                           siteLink === "#" || siteLink === undefined
                              ? { display: "none" }
                              : {
                                   borderColor: this.props.colors[
                                      this.state.selected
                                   ],
                                   color: this.props.colors[
                                      this.state.selected
                                   ],
                                   transition: "all .5s",
                                   boxShadow:
                                      "1px 1px 5px " +
                                      this.props.colors[this.state.selected]
                                }
                        }
                        className={classes.modalButton}
                     >
                        Site
                     </button>
                  </a>
               </div>
            </div>
            <Modal
               show={this.state.showModal}
               id={name}
               modalClosed={this.modalClosed}
               color={this.props.colors[this.state.selected]}
               textArr={textArr}
            />
         </Wrapper>
      );
   }
}

const mapStateToProps = state => {
   return {
      colors: state.colors,
      selectedColor: state.selected
   };
};

const mapDispatchToProps = dispatch => {
   return {
      onProjectChange: selected =>
         dispatch({ type: "CHANGE_SELECTED", value: selected })
   };
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(Projects);

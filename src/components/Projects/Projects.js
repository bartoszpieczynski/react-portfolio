import React, { Component } from "react";
import classes from "./Projects.css";
import axios from "../../axios";
import { connect } from "react-redux";

import Wrapper from "../../hoc/Wrapper/Wrapper";
import Project from "./Project/Project";
import Buttons from "../UI/Buttons/Buttons";
import Spinner from "../UI/Spinner/Spinner";

class Projects extends Component {
   state = {
      loaded: false,
      projects: null,
      prevActive: true,
      nextActive: false,
      selected: 0
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
      this.setState(prevState => {
         return prevState.selected < 4
            ? {
                 selected: prevState.selected + 1
              }
            : { selected: 0 };
      });
   };

   prevProject = () => {
      this.setState(prevState => {
         return prevState.selected > 0
            ? {
                 selected: prevState.selected - 1
              }
            : { selected: 4 };
      });
   };

   render() {
      let projects = <Spinner />;
      let projectText = "Loading...";
      if (this.state.loaded) {
         let projArr = Object.keys(this.state.projects);
         projectText = this.state.projects[projArr[this.state.selected]].text;
         projects = (
            <Project
               selected={this.state.selected}
               name={this.state.projects[projArr[this.state.selected]].name}
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
            <h2
               style={{
                  borderColor: this.props.colors[this.state.selected],
                  color: this.props.colors[this.state.selected],
                  transition: "all .5s"
               }}
            >
               My Projects
            </h2>
            <div className={classes.projectShowcase}>
               {projects}
               <div className={classes.buttonContainer}>
                  <Buttons
                     prev={true}
                     click={this.prevProject}
                     fontSize={"2rem"}
                     select={this.state.selected}
                  >
                     Previous
                  </Buttons>
                  <Buttons
                     prev={false}
                     click={this.nextProject}
                     fontSize={"2rem"}
                     select={this.state.selected}
                  >
                     Next
                  </Buttons>
               </div>
            </div>
            <div
               className={classes.midLine}
               style={{
                  borderColor: this.props.colors[this.state.selected],
                  transition: "all .5s"
               }}
            />
            <div className={classes.textContainer}>
               <p
                  className={classes.Text}
                  style={{
                     color: this.props.colors[this.state.selected],
                     transition: "all .5s"
                  }}
               >
                  {projectText}
               </p>
               <div className={classes.buttonContainerText}>
                  <a className={classes.URLButton} href="#">
                     Code
                  </a>
                  <a className={classes.URLButton} href="#">
                     Site
                  </a>
               </div>
            </div>
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

export default connect(mapStateToProps)(Projects);

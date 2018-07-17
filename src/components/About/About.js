import React, { Component } from "react";
import Wrapper from "../../hoc/Wrapper/Wrapper";
import Buttons from "../UI/Buttons/Buttons";
import MediaQuery from "react-responsive";

import classes from "./About.css";
import myPhoto from "../../components/assets/images/ja.jpg";

class About extends Component {
   state = {
      textParts: [
         `Hi! My name is Bartosz and I'm self-taught web developer.
         In 2015 I was lucky enough to get accepted as an intern at LepszyProjekt.
         There I learned basics of PHP and Symfony 1.4.
         During that time I was studying automation and robotics at the West Pomeranian University of Technology.`,
         `Two years later I got hired in General Informatics LTD as junior backend developer. There I learned how to use CSS3 and basics of JavaScript and jQuery.
         After a few months, I was working on the backend as well as on the frontend.
         I also have been entrusted with communicating with clients.
         I stayed there for almost a year. While working in General Informatics I have become more and more intrested in JavaScript.`,
         `At the end of 2017 I bought some books and online courses and began studying hard.
         Right now I feel confident enough to start my new adventure - React!
         But based on my experience I know that the best way to learn programming is by doing it in real projects, that's why I have sent you my CV.
         I hope you will give me a chance to prove myself :)`
      ],
      activeText: 0
   };

   nextText = () => {
      this.setState((prevState, props) => {
         return prevState.activeText === this.state.textParts.length - 1
            ? { activeText: 0 }
            : { activeText: prevState.activeText + 1 };
      });
   };

   prevText = () => {
      this.setState((prevState, props) => {
         return prevState.activeText === 0
            ? { activeText: this.state.textParts.length - 1 }
            : { activeText: prevState.activeText - 1 };
      });
   };

   render() {
      return (
         <Wrapper>
            <div className={classes.PhotoContainer}>
               <img src={myPhoto} alt="Profile pic" />
            </div>
            <div className={classes.Text}>
               <h2>About me</h2>
               <p>{this.state.textParts[this.state.activeText]}</p>
               <MediaQuery minWidth={700}>
                  <div className={classes.buttonContainer}>
                     <Buttons fontSize={"3rem"} click={this.prevText}>
                        &#8678;
                     </Buttons>
                     <Buttons fontSize={"3rem"} click={this.nextText}>
                        &#8680;
                     </Buttons>
                  </div>
               </MediaQuery>
            </div>
            <MediaQuery maxWidth={699}>
            <div className={classes.buttonContainerMobile}>
               <Buttons fontSize={"3rem"} click={this.prevText}>
                  &#8678;
               </Buttons>
               <Buttons fontSize={"3rem"} click={this.nextText}>
                  &#8680;
               </Buttons>
            </div>
            </MediaQuery>
         </Wrapper>
      );
   }
}

export default About;

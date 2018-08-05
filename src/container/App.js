import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import classes from "./App.css";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

import Navigation from "../components/Navigation/Navigation";
import MobileNav from "../components/Navigation/MobileNav/MobileNav";
import About from "../components/About/About";
import Skills from "../components/Skills/Skills";
import Projects from "../components/Projects/Projects";
import Main from "../components/Main/Main";
import Contact from "../components/Contact/Contact";

import Background from "../components/assets/images/funky-lines.png";

class App extends Component {
   
   render() {
      let path = "Portfolio";
      if (this.props.location.pathname !== "/") {
         path = this.props.location.pathname.slice(1);
         path = path.charAt(0).toUpperCase() + path.slice(1);
      }
      return (
         <Route
            render={({ location }) => (
               <div style={{ backgroundImage: `url(${Background})`, width: '100%', minHeight: '100vh' }}>
                  <Helmet>
                     <title>Bartosz Pieczynski - {`${path}`} </title>
                     <meta name="skills" content="Skills" />
                  </Helmet>
                  <Navigation/>
                  <MobileNav/>
                  <div className={classes.Hamburger}>
                     <input onClick={this.props.onHamburgerChange} type="checkbox" id='hamburger'/>
                     <span />
                     <span />
                     <span />
                     <ul id="menu">                        
                     </ul>
                  </div>
                  <TransitionGroup className={classes.AppBody}>
                     <CSSTransition
                        classNames={{
                           enter: classes.enter,
                           enterActive: classes.enterActive,
                           leave: classes.leave,
                           leaveActive: classes.leaveActive
                        }}
                        key={location.key}
                        exit={false}
                        timeout={450}
                     >
                        <Switch location={location}>
                           <Route path="/about" exact component={About} />
                           <Route path="/skills" exact component={Skills} />
                           <Route path="/projects" exact component={Projects} />
                           <Route path="/contact" exact component={Contact} />
                           <Route path="/" exact component={Main} />
                           <Route component={() => <div>404 Not found </div>} />
                        </Switch>
                     </CSSTransition>
                  </TransitionGroup>
               </div>
            )}
         />
      );
   }
}


const mapDispatchToProps = dispatch => {
   return {
      onHamburgerChange: () =>
         dispatch({ type: "CHECKED"})
   };
};

export default withRouter(connect(null, mapDispatchToProps)(App));

import React, { Component } from "react";
import classes from "./MobileNav.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import { connect } from "react-redux";
import { NavLink, withRouter } from "react-router-dom";

class MobileNav extends Component {
   state = {
      checked: false,
      navItems: ["about", "skills", "projects", "contact"]
   };

   close = () => {
      this.props.onHamburgerChange();
      document.getElementById("hamburger").checked = false;
   };

   componentDidUpdate(prevProps) {
      if (this.props.checked !== prevProps.checked) {
         this.setState(prevState => {
            return { checked: !prevState.checked };
         });
      }
   }

   render() {
      let displayStyle = "";
      if (this.state.checked) {
         displayStyle = "0";
      } else {
         displayStyle = "-47%";
      }

      const navItems = this.state.navItems.map(item => {
         return (
            <li key={item} className={classes.NavLink}>
               <NavLink
                  to={"/" + item}
                  onClick={this.close}
                  activeStyle={{
                     color: this.props.colors[this.props.selected],
                     borderBottom:
                        "2px solid " + this.props.colors[this.props.selected]
                  }}
               >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
               </NavLink>
            </li>
         );
      });

      return (
         <div>
            <Backdrop
               modal={false}
               show={this.props.checked}
               close={this.close}
            />
            <div style={{ left: displayStyle }} className={classes.MobileNav}>
               <NavLink
                  className={classes.Home}
                  exact
                  to={"/"}
                  activeStyle={{
                     color: "orange",
                     borderBottom: "2px solid orange"
                  }}
               >
                  <i className="fas fa-home" />
               </NavLink>
               <ul className={classes.navMenu}>{navItems}</ul>
               <div className={classes.socialMedia}>
                  <a href="https://www.facebook.com/Pieczyn">
                     <i className="fab fa-facebook-f" />
                  </a>
                  <a href="https://www.linkedin.com/in/bpieczynski/">
                     <i className="fab fa-linkedin-in" />
                  </a>
                  <a href="https://github.com/bartoszpieczynski">
                     <i className="fab fa-github" />
                  </a>
               </div>
            </div>
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onHamburgerChange: () => dispatch({ type: "CHECKED" })
   };
};

const mapStateToProps = state => {
   return {
      checked: state.checked,
      colors: state.colors,
      selected: state.selected
   };
};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(MobileNav)
);

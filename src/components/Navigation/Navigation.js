import React, { Component } from "react";
import classes from "./Navigation.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from "react-redux";

class Navigation extends Component {
   state = {
      navItems: ["about", "skills", "projects", "contact"]
   };
   render() {
      const navItems = this.state.navItems.map(item => {
         return (
            <li key={item} className={classes.NavLink}>
               <NavLink
                  to={"/" + item}
                  onClick={this.props.onLinkChange}
                  activeStyle={{
                     color: this.props.color,
                     borderBottom: "2px solid " + this.props.color
                  }}
               >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
               </NavLink>
            </li>
         );
      });
      return (
         <div className={classes.Navbar} style={{boxShadow: '3px 0 5px ' + this.props.shadowColor}}>
            <div className={classes.Social}>
               <i className="far fa-comments" />
               <div className={classes.SocialBar}>
                  <a href='https://www.facebook.com/Pieczyn'><i className="fab fa-facebook-f" /></a>
                  <a href='https://www.linkedin.com/in/bpieczynski/'><i className="fab fa-linkedin-in" /></a>
                  <a href='https://github.com/bartoszpieczynski'><i className="fab fa-github" /></a>
               </div>
            </div>
            <ul>{navItems}</ul>
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
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
   return {
      onLinkChange: () => dispatch({ type: "RESET" })
   };
};

const mapStateToProps = state => {
   return {
      colors: state.colors,
      color: state.color,
      selected: state.selected,
      shadowColor: state.shadowColor
   };
};

export default withRouter(
   connect(
      mapStateToProps,
      mapDispatchToProps
   )(Navigation)
);

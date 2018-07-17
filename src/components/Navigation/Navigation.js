import React, { Component } from "react";
import classes from "./Navigation.css";
import { NavLink, withRouter } from "react-router-dom";
import { connect } from 'react-redux';

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
                     color: this.props.colors[this.props.selected],
                     borderBottom: "2px solid " + this.props.colors[this.props.selected]
                  }}
               >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
               </NavLink>
            </li>
         );
      });

      return (
         <div className={classes.Navbar}>
            <div className={classes.Social}>
               <i className="far fa-comments" />
               <div className={classes.SocialBar}>
                  <i className="fab fa-facebook-f" />
                  <i className="fab fa-linkedin-in" />
               </div>
            </div>
            <ul>{navItems}</ul>
            <NavLink 
                  className={classes.Home}
                  exact
                  to={'/'}
                  activeStyle={{
                        color: 'orange',
                        borderBottom: "2px solid orange",
                     }}>
               <i className="fas fa-home" />
            </NavLink>
         </div>
      );
   }
}

const mapDispatchToProps = dispatch => {
      return {
         onLinkChange: () =>
            dispatch({ type: "RESET"})
      };
    };

const mapStateToProps = state => {
      return {
         colors: state.colors,
         selected: state.selected
      };
   };


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));


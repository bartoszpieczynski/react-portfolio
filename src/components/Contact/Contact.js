import React from "react";
import classes from "./Contact.css";
import Wrapper from "../../hoc/Wrapper/Wrapper";

const contact = () => {
   return (
      <Wrapper>
         <h2>Contact</h2>
         <form className={classes.Form}>
            <div className={classes.formGroup}>
               <label className={classes.Label}>Name</label>
               <input className={classes.Input} required name="name" type="text" />
            </div>
            <div className={classes.formGroup}>
               <label className={classes.Label}>E-mail</label>
               <input className={classes.Input} required name="email" type="email" />
            </div>
            <div className={classes.formGroup}>
               <label className={classes.Label}>Company</label>
               <input className={classes.Input} name="company" type="text" />
            </div>
            <div className={classes.formGroupTextArea}>
               <label className={classes.Label}>Message</label>
               <div>
                  <textarea required />
               </div>
            </div>
            <button type="submit" className={classes.Submit}>
               Submit
            </button>
         </form>
         <div className={classes.contactInfo}>
            <div className={classes.contactInfoRow}>
               <a href="tel:+48606114405">
                  <i className="fas fa-phone" />
               </a>
               <p>
                  <a href="tel:+48606114405">+48 606 114 405</a>
               </p>
            </div>
            <div className={classes.contactInfoRow}>
               <a href="mailto: b.w.pieczynski@gmail.com">
                  <i className="fas fa-envelope-open" />
               </a>
               <p>
                  <a href="mailto: b.w.pieczynski@gmail.com">
                     b.w.pieczynski@gmail.com
                  </a>
               </p>
            </div>
            <div className={classes.contactInfoRow}>
               <a href="https://www.linkedin.com/in/bpieczynski/">
                  <i className="fab fa-linkedin" />
               </a>
               <p>
                  <a href="https://www.linkedin.com/in/bpieczynski/">
                     linkedin.com/in/bpieczynski
                  </a>
               </p>
            </div>
         </div>
      </Wrapper>
   );
};

export default contact;

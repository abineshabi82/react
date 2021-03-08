import React from 'react';
import { OktaAuth } from '@okta/okta-auth-js';
import { withOktaAuth, useOktaAuth } from '@okta/okta-react';

import { oktaAuthConfig, oktaSignInConfig } from '../../config';
import { oktaClient } from '@okta/okta-sdk-nodejs';
// import { from } from 'webpack-sources/lib/CompatSource';

// export const oktaClient = require('../lib/oktaClient');
import "./Register.scss";

export default withOktaAuth(
  class RegistrationForm extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        repassword:'',
        sessionToken: null
      };
      console.log(oktaAuthConfig);
      // this.oktaAuth = useOktaAuth().oktaAuth;
      this.oktaAuth = new OktaAuth(oktaAuthConfig);
      this.checkAuthentication = this.checkAuthentication.bind(this);
      this.checkAuthentication();

      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
      this.handleLastNameChange = this.handleLastNameChange.bind(this);
      this.handleEmailChange = this.handleEmailChange.bind(this);
      this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    async checkAuthentication() {
      const sessionToken = await this.props?.auth?.getIdToken();
      if (sessionToken) {
        this.setState({ sessionToken });
      }
    }

    componentDidUpdate() {
      this.checkAuthentication();
    }

    handleFirstNameChange(e) {
      this.setState({ firstName: e.target.value });
      this.validate(e.target.id,"name",e.target.value);
    }
    handleLastNameChange(e) {
      this.setState({ lastName: e.target.value });
      this.validate(e.target.id,"name",e.target.value);
    }
    handleEmailChange(e) {
      this.setState({ email: e.target.value });
      this.validate(e.target.id,"email",e.target.value);
    }
    handlePasswordChange(e) {
      if(e.target.id!="repassword"){
        this.setState({ password: e.target.value },()=>{
          this.validate(e.target.id,"password",e.target.value);
          this.validateRetypePassword("repassword");
        });
      }else{
        this.setState({ repassword: e.target.value },()=>{
          this.validate(e.target.id,"password",e.target.value);
          this.validateRetypePassword(e.target.id);
        });
        
      }
    }

    handleSubmit(e) {
      e.preventDefault();

      const newUser = {
        profile: {
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          login: this.state.email
        },
        credentials: {
          password: {
            value: this.state.password
          }
        }
      };

      // oktaClient.createUser(newUser).then(user => {
      //   res.status(201);
      //   res.send(user);
      // })
      //   .catch(err => {
      //     res.status(400);
      //     res.send(err);
      //   });
      fetch(oktaSignInConfig.baseUrl + "/api/v1/users?activate=true", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'SSWS 00Je15c2Z2LyYY8_mnQKj-zw4gb3ru_4Bafo0gzT8F'
        },
        body: JSON.stringify(newUser)
      }).then(user => {
        // debugger;
        if (user.status == "200")
          alert("registation completed");
        this.oktaAuth.signIn({
          username: this.state.email,
          password: this.state.password
        }).then(res => {
          console.log("res", res);
          this.setState({
            sessionToken: res.sessionToken
          })
        }
        );
      })
        .catch(err => console.log);
    }

    validate(elementId,type,str){
      let patt1;
      if(type=="email")
        patt1 = new RegExp(/[\w\d]+\@\w+\.\w+/m);
      else if(type=="name"){
        patt1 = new RegExp(/\w+/m);
      }else if(type=="password"){
        patt1 = new RegExp(/[\w\d\W]+/m);
      }
      let result = patt1.test(str);
      if(result)
      document.getElementById(elementId).style.border = "none";
      else
      document.getElementById(elementId).style.border = "solid red";
    }

    validateRetypePassword(elementId){
      if(this.state.password==this.state.repassword)
      document.getElementById(elementId).style.border = "none";
      else
      document.getElementById(elementId).style.border = "solid red";
    }

    render() {
      if (this.state.sessionToken) {
        window.location.href = '/login';
        this.props?.auth?.redirect({ sessionToken: this.state.sessionToken });
        return null;
      }

      return (
        <div className="registerDiv">
          <form onSubmit={this.handleSubmit}>
            <div className="form-element">
              <h4>Sign Up</h4>
            </div>
            <div className="form-element">
              <label>Email:</label>
              <input
                type="email"
                id="email"
                value={this.state.email}
                onChange={this.handleEmailChange}
              />
            </div>
            <div className="form-element">
              <label>First Name:</label>
              <input
                type="text"
                id="firstName"
                value={this.state.firstName}
                onChange={this.handleFirstNameChange}
              />
            </div>
            <div className="form-element">
              <label>Last Name:</label>
              <input
                type="text"
                id="lastName"
                value={this.state.lastName}
                onChange={this.handleLastNameChange}
              />
            </div>
            <div className="form-element">
              <label>Password:</label>
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.handlePasswordChange}
              />
            </div>
            <div className="form-element">
              <label>Retype Password:</label>
              <input
                type="password"
                id="repassword"
                value={this.state.repassword}
                onChange={this.handlePasswordChange}
              />
            </div>
            <input className="btn btn-primary" type="submit" id="submit" value="Register" />
          </form>
        </div>
      );
    }
  }
);
// one component for signup and login
import React, { Component } from 'react';

export default class AuthForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      profileImageUrl: ''
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const authType = this.props.signUp ? 'signup' : 'signin';
    this.props
      .onAuth(authType, this.state)
      .then(() => {
        // render homepage
        this.props.history.push('/');
      })
      .catch(() => {
        return;
      });
  };

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  renderSignupFields() {
    const { username, profileImageUrl } = this.state;
    if (this.props.signUp) {
      return (
        <div>
          <label htmlFor="username">Username:</label>
          <input
            className="form-control"
            id="username"
            name="username"
            onChange={this.handleChange}
            value={username}
            type="text"
          />
          <label htmlFor="image-url">Image URL:</label>
          <input
            className="form-control"
            id="image-url"
            name="profileImageUrl"
            onChange={this.handleChange}
            value={profileImageUrl}
            type="text"
          />
        </div>
      );
    } else {
      return null;
    }
  }

  renderError() {
    if (this.props.errors.message) {
      return (
        <div className="alert alert-danger">{this.props.errors.message}</div>
      );
    } else {
      return null;
    }
  }

  render() {
    const { email, password } = this.state;
    const { heading, buttonText, history, removeError } = this.props;

    history.listen(() => {
      removeError();
    });

    return (
      <div>
        <div className="row justify-content-md-center text-center">
          <div className="col-md-6">
            <form onSubmit={this.handleSubmit}>
              <h2>{heading}</h2>
              {this.renderError()}
              <label htmlFor="email">Email:</label>
              <input
                className="form-control"
                id="email"
                name="email"
                onChange={this.handleChange}
                value={email}
                type="text"
              />
              <label htmlFor="password">Password:</label>
              <input
                className="form-control"
                id="password"
                name="password"
                onChange={this.handleChange}
                type="password"
              />
              {this.renderSignupFields()}
              <button className="btn btn-primary btn-blk btn-lg" type="submit">
                {buttonText}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

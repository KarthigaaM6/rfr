import React from 'react';
import { Button, Card, Grid, Form } from 'semantic-ui-react';
const {hashHistory} = require('react-router');
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import './login.css';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {username : "",password : "",};
    this.handleUserName = this.handleUserName.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkForUpdateDescriptionAlert = this.checkForUpdateDescriptionAlert.bind(this);
  }
  handleUserName(e) {
    this.setState({username : e.target.value});
  }
  handlePassword(e) {
    this.setState({password : e.target.value})
  }
  handleSubmit() {
    if(this.state.username.length == 0 || this.state.password.length == 0) {
      this.checkForUpdateDescriptionAlert();
      // alert("fields cannot be empty")
    } else {
      hashHistory.push('/dashboard')
    }
  }
  checkForUpdateDescriptionAlert() {

      let context = this;
      this.refs.asd.error(
        'Username or password cannot be empty',
        '', {
        timeOut: 3000,
        extendedTimeOut: 3000
      }
    );
    }
  render() {
    return (
      <div>
        <nav className='navbar navbar-default navbar-fixed-top ' id='headerfixed'>
            <div className='container-fluid'>
              <div className='navbar-header'>
                <button type='button' className='navbar-toggle' data-toggle='collapse' data-target='#myNavbar'>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                  <span className='icon-bar'/>
                </button>
                <div>
                  <a className='navbar-brand' href='#'>
                    <img src='./../../assets/images/wipro_digital.png' id='logoSize'/></a>
                </div>
              </div>
            </div>
          </nav>
          <Grid centered columns={2}>
            <Grid.Row>{/*to make login card center empty grid rows are created*/}
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row>
            </Grid.Row>
            <Grid.Row centered columns={3}>
              <Grid.Column>
              </Grid.Column>
              <Grid.Column>
                <Card centered>
                  <Card.Content>
                    <center>
                      <Card.Header >
                        <label>Login to HuBot</label>
                      </Card.Header>
                    </center>
                    <Card.Description>
                      <Form onSubmit = {this.handleSubmit}>
                        <Form.Field>
                          <label>User Name</label>
                          <input placeholder='username' name = "username" onChange = {this.handleUserName} value = {this.state.username}/>
                        </Form.Field>
                        <Form.Field>
                          <label>password</label>
                          <input placeholder='Password' name = "password" onChange = {this.handlePassword} value = {this.state.password}/>
                        </Form.Field>
                        <center>
                          <Button  primary type='submit'>Submit</Button>
                        </center>
                      </Form>
                    </Card.Description>
                  </Card.Content>
                </Card>
              </Grid.Column>
              <Grid.Column>
              </Grid.Column>
            </Grid.Row>
              <Grid.Row centered columns={4}>
              </Grid.Row>
          </Grid>
          <ToastContainer ref='asd'
           toastMessageFactory={ToastMessageFactory}
           className='toast-top-center' style={{marginTop:'8%'}}/>
      </div>
    );
  }
}

module.exports = Login;

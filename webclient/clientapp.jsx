const React = require('react');
const ReactDOM = require('react-dom');
const {browserHistory, hashHistory, Route, Router} = require('react-router');
const Login = require('./components/Login/Login.jsx');
const Dashboard = require('./components/dnd/dashboard.jsx');
const MainComp = React.createClass({
  render: function() {
    return (
      <div>
                  <NavBar/>
                  <br/>
                  <br/>

                  {this.props.children}
              </div>
    );
  }
});
ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Login}/>
    <Route path="/dashboard" component={Dashboard}/>
</Router>, document.getElementById('app'));

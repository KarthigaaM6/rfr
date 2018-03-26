import React from 'react';
const {hashHistory} = require('react-router');
import { Button, Card, Grid, Form, Divider,Label, Dimmer, Segment,Icon, Header, Modal, Input } from 'semantic-ui-react';
import {Scrollbars} from 'react-custom-scrollbars';
import {DragDropContextProvider} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
const ReactDOM = require('react-dom');
const ReactToastr = require('react-toastr');
const {ToastContainer} = ReactToastr;
const ToastMessageFactory = React.createFactory(ReactToastr.ToastMessage.animation);
import Dustbin from './dustbin.jsx';
import Box from './box.jsx';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      allCards : [],
      tools_array : [],
      workspaceName : "",
      slackToken : "",
      toolnames : [],
      All_tools_array : [{
        name : 'Jenkins',
        image : './../../assets/tools_logo/jenkins.png',
      },{
        name : 'GitHub',
        image : './../../assets/tools_logo/github.png',
      },{
        name : 'GitLab',
        image : './../../assets/tools_logo/gitlab.png',
      },{
        name : 'Jira',
        image : './../../assets/tools_logo/jira.png',
      },{
        name : 'Nagios',
        image : './../../assets/tools_logo/nagios.png',
      },{
        name : 'PCF',
        image : './../../assets/tools_logo/pcf.png',
      },{
        name : 'Mongo',
        image : './../../assets/tools_logo/mongo.png',
      },{
        name : 'Gerrit',
        image : './../../assets/tools_logo/gerrit.png',
      },{
        name : 'npm',
        image : './../../assets/tools_logo/npm.png',
      },{
        name: 'nexus',
        image: './../../assets/tools_logo/nexus.png',
      },{
        name: 'selenium',
        image: './../../assets/tools_logo/selenium.png',
      }],
      pipeLine: [
        {
          name:'Code CheckIn',
          server: 'QA server'
        },
        {
          name:'Artifacts_Nexus',
          server: 'QA server'
        },
        {
          name:'Unit Testing',
          server: 'QA server'
        },
        {
          name:'Functional Testing',
          server: 'QA server'
        },
        {
          name:'Sonar',
          server: 'QA server'
        },
        {
          name:'Deployed to QA server',
          server: 'QA server'
        },
        {
          name:'Code CheckIn',
          server: 'Production server'
        },
        {
          name:'Deployed to production server',
          server:'Production server'
        }
      ],
      active : false,
      nagiosURL : "",
      nagiosUsername : "",
      nagiosPassword : "",
      jenkinsURL : "",
      jenkinsUsername : "",
      jenkinsPassword : "",
      gitlabURL : "",
      gitlabAccessKey : "",
    }
    this.logOut = this.logOut.bind(this);
    this.addCard = this.addCard.bind(this);
    this.checkForUpdateDescriptionAlert = this.checkForUpdateDescriptionAlert.bind(this);
    this.functiontofindIndexByKeyValue = this.functiontofindIndexByKeyValue.bind(this);
    this.handledimmer = this.handledimmer.bind(this);
    this.handleHide = this.handleHide.bind(this);
    this.handleworkSpaceName = this.handleworkSpaceName.bind(this);
    this.handleSlackToken = this.handleSlackToken.bind(this);
    this.handleJenkinsURL = this.handleJenkinsURL.bind(this);
    this.handleNagiosURL = this.handleNagiosURL.bind(this);
    this.handlegitLabURL = this.handlegitLabURL.bind(this);
    this.handleJenkinsUsername = this.handleJenkinsUsername.bind(this);
    this.handleNagiosUsername = this.handleNagiosUsername.bind(this);
    this.handleJenkinsPassword = this.handleJenkinsPassword.bind(this);
    this.handleNagiosPassword = this.handleNagiosPassword.bind(this);
    this.handleGitlabURL = this.handleGitlabURL.bind(this);
    this.handleGitlabAccessKey = this.handleGitlabAccessKey.bind(this);
    this.getTools = this.getTools.bind(this);
    this.clickAlert = this.clickAlert.bind(this);
  }
  componentWillMount() {
    //this.getTools();
  }

  getTools() {
    let context = this;
    $.ajax({
      url:'/getTools/'+ 'rig' + '/' + 'new',
      type: 'GET',
      success:function(data){
        context.setState({tools_array : data});
      },
      error:function(err) {
        console.log("error",err);
      }
    })
  }

  handleGitlabURL(e) {
    this.setState({gitlabURL : e.target.value})
  }
  handleGitlabAccessKey(e) {
    this.setState({gitlabAccessKey : e.target.value})
  }
 logOut() {
   hashHistory.push('/')
 }
 handleJenkinsUsername(e) {
   this.setState({jenkinsUsername : e.target.value})
 }
 handleNagiosUsername(e) {
   this.setState({nagiosUsername : e.target.value});
 }
 handleJenkinsPassword(e) {
   this.setState({jenkinsPassword : e.target.value})
 }
 handleNagiosPassword(e) {
   this.setState({nagiosPassword : e.target.value});
 }
 handleJenkinsURL(e) {
   this.setState({jenkinsURL : e.target.value})
 }
 handleNagiosURL(e) {
   this.setState({nagiosURL : e.target.value});
 }
  handleworkSpaceName(e) {
    this.setState({workspaceName : e.target.value})
  }
  handleSlackToken(e) {
    this.setState({slackToken : e.target.value})
  }
  handlegitLabURL(e) {

  }
   scrollToBottom() {
  const node = ReactDOM.findDOMNode(this.messagesEnd);
  node.scrollIntoView({ behavior: "smooth" });
  }
  functiontofindIndexByKeyValue(toolArr,key,value) {
    toolArr.map((item,index) => {
      if(item[key] == value) {
        return index;
      } else {
        return null;
      }
    })
  }

addCard(id,name,image) {
  // console.log("entered add",id,name,image);
  let obj = {
    id: id,
    name: name,
    image: image,
  }
  let flag;
  let position;
  var cardArray = this.state.allCards;
  // var toolArr = this.state.tools_array;
  if(!(cardArray.length == 0)) {
    if(cardArray.some(item => item.name == name)) {
      this.checkForUpdateDescriptionAlert();
    } else {
      cardArray.push(obj);
      this.setState({allCards: cardArray});
    }
  } else {
    cardArray.push(obj)

    this.setState({allCards: cardArray});
  }
}
checkForUpdateDescriptionAlert() {

    let context = this;
    this.refs.asd.success(
      'Tool already added',
      '', {
      timeOut: 2000,
      extendedTimeOut: 2000
    }
  );
  }

  clickAlert() {
      this.refs.asd.success(
        'Pipeline created succesfully',
        '', {
        timeOut: 2000,
        extendedTimeOut: 2000
      }
    );
  }

  changeCard(position) {
    let arr = this.state.allCards;
    console.log(position,"dffffffffffffffffff",arr);
    arr.splice(position, 1)
    this.setState({allCards: arr})
  }
  handledimmer() {
    this.setState({active : true})
  }
  handleHide() {
    this.setState({active : false})
  }

  render() {
    let QAServer = "";
    let ProductionServer = "";
    QAServer =   this.state.pipeLine.map((item,index) => {
        if(item.server === 'QA server') {
          return (<div style = {{'padding':'1%'}}>
                    {/* <Box addCard = {this.addCard} id = {index} image = {item.logo} name = {item.toolName} place="left"/> */}
                    <Box addCard = {this.addCard} id = {index} name = {item.name} place="left"/>
                </div>)
        }
      })

      ProductionServer =   this.state.pipeLine.map((item,index) => {
            if(item.server === 'Production server') {
              return (<div style = {{'padding':'1%'}}>
                        {/*} <Box addCard = {this.addCard} id = {index} image = {item.logo} name = {item.toolName} place="left"/> */}
                        <Box addCard = {this.addCard} id = {index} name = {item.name} place="left"/>
                    </div>)
            }
        })
    return(
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
              <div className='nav navbar-nav navbar-right' style = {{'padding' : '1%'}} id='position'>
              <Button  size = "mini"  primary type='logout' onClick={this.logOut}>Logout</Button>
          </div>
            </div>
          </nav><br/><br/><br/><br/>
          <Dimmer.Dimmable dimmed={this.state.active}>
          <Label color = {this.state.allCards.length == 0 ? " " : "green"} style={{'float':'right','marginRight':'2%','marginBottom':'0.3%'}}>
            No. of items :
            <Label.Detail>{this.state.allCards.length}</Label.Detail>
          </Label>
            <DragDropContextProvider backend={HTML5Backend}>
              <div>
                <Grid celled>
                  <Grid.Row >
                    <Grid.Column width={4} style={{'marginLeft':'3%'}} >
                      <Scrollbars
                        renderThumbVertical={props => <div {...props} ></div>}
                        renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                          display: 'none',
                          position: 'right'
                        }}></div>}
                        autoHeight autoHeightMin={460}>
                          <h3> QA server </h3>
                          <Card.Group style={{'marginLeft':'1%',marginTop : '1%'}} itemsPerRow={2} >
                            {QAServer}
                          </Card.Group>
                          <h3> Production server </h3>
                          <Card.Group style={{'marginLeft':'1%',marginTop : '1%'}} itemsPerRow={2} >
                            {ProductionServer}
                          </Card.Group>
                        </Scrollbars>
                    </Grid.Column>
                    <Grid.Column width={6}>
                      <Scrollbars style = {{'width':'295px',height:'104%'}}
                        renderThumbVertical={props => <div {...props} ></div>}
                        renderTrackHorizontal={props => <div {...props} className="track-horizontal" style={{
                         display: 'none',
                         position: 'right',
                       }}/>}   autoHeightMin={450}>
                      <Dustbin  style={{ backgroundColor: 'black' }} allCards = {this.state.allCards} changeCard={this.changeCard.bind(this)}/>
                    </Scrollbars>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </div>
            </DragDropContextProvider>
            {
              this.state.allCards.length > 0 ?
              <Button  size = "mini" type = "submit" style = {{'float' : 'right','marginRight' : '2%',cursor:'pointer'}} primary
                onClick = {() => {
                  // this.handledimmer
                  this.clickAlert()
                }}
              >
                Click to proceed
              </Button> : ""
            }
            <Dimmer active={this.state.active} onClickOutside={this.handleHide}>
              <Grid centered>
                <Segment  style ={{width:'50%'}}>
                  <center>
                  <Form onSubmit = {this.handleSubmit}>
                    <table >
                      <tr>
                      <td style = {{color : 'black'}}><label>workspace name</label></td>
                      <td><Input style = {{margin : '2%'}} placeholder='workspace name' name = "workspace" onChange = {this.handleworkSpaceName} value = {this.state.workspaceName}/>
                    </td>
                  </tr>
                  <tr>
                      <td style = {{color : 'black'}}><label>Slack Token</label></td>
                      <td><Input style = {{margin : '2%'}} placeholder='slack token' name = "slacktoken" onChange = {this.handleSlackToken} value = {this.state.slackToken}/>
                    </td>
                  </tr>
                </table>
                    {this.state.allCards.some(item => item.name == "Jenkins") ? <div><table>
                      <tr style = {{pading : '2%'}}>
                        <td style = {{color : 'black'}}><label>Jenkins url</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='url' name = "jenkins_url" onChange = {this.handleJenkinsURL} value = {this.state.jenkinsURL}/></td>
                      </tr>
                      <tr>
                        <td style = {{color : 'black'}}><label>Jenkins username</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='jenkins username' name = "jenkins_username" onChange = {this.handleJenkinsUsername} value = {this.state.jenkinsUsername}/>
                      </td></tr>
                      <tr>
                        <td style = {{color : 'black'}}><label>Jenkins Password</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='jenkins password' name = "jenkins_password" onChange = {this.handleJenkinsPassword} value = {this.state.jenkinsPassword}/>
                      </td></tr></table>
                    </div> : ""}
                    {this.state.allCards.some(item => item.name == "Nagios") ? <div><table>
                      <tr style = {{pading : '2%'}}>
                        <td style = {{color : 'black'}}><label>Nagios url</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='url' name = "nagios_url" onChange = {this.handleNagiosURL} value = {this.state.nagiosURL}/></td>
                      </tr>
                      <tr>
                        <td style = {{color : 'black'}}><label>Nagios username</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='nagois username' name = "nagios_username" onChange = {this.handleNagiosUsername} value = {this.state.nagiosUsername}/>
                      </td></tr>
                      <tr>
                        <td style = {{color : 'black'}}><label>Nagios Password</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='nagios password' name = "Nagios_password" onChange = {this.handlenagiosPassword} value = {this.state.nagiosPassword}/>
                      </td></tr></table>
                    </div> : ""}
                    {this.state.allCards.some(item => item.name == "GitLab") ? <div><table>
                      <tr style = {{pading : '2%'}}>
                        <td style = {{color : 'black'}}><label>Gitlab url</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='url' name = "gitlab_url" onChange = {this.handleGitlabURL} value = {this.state.gitlabURL}/></td>
                      </tr>
                      <tr>
                        <td style = {{color : 'black'}}><label>Gitlab Access Key</label></td>
                        <td><Input style = {{margin : '2%'}} placeholder='Access key' name = "gitlab_accesskey" onChange = {this.handleGitlabAccessKey} value = {this.state.gitlabAccessKey}/>
                      </td></tr>
                      </table>
                    </div>: ""}

                    <center>
                      <Button  primary type='submit'>Submit</Button>
                    </center>

                  </Form>
                  </center>
                </Segment>
              </Grid>

            </Dimmer>
          </Dimmer.Dimmable>

          <nav className="navbar" className="footer" style = {{"position": "fixed",'bottom':'0','width':'100%','backgroundColor':'white'}} >
           <div id = "ribbon" className="row footer-brand-colour">
                 <div className="fbc-elem fbc-pink col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
                 <div className="fbc-elem fbc-yellow col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
                 <div className="fbc-elem fbc-blue col-xs-4 col-sm-4 col-md-4 col-lg-4"/>
             </div>
            <p id="footerTextAllignment" >All Rights Reserved. &copy; Wipro Digital</p>
        </nav>
        <ToastContainer ref='asd'
         toastMessageFactory={ToastMessageFactory}
         className='toast-top-center' style={{marginTop:'8%'}}/>
      </div>
    );
  }
}
module.exports = Dashboard;

import React from 'react';
import {Card, Icon, Button, Popup, Segment,Grid} from 'semantic-ui-react';

class DustbinCard extends React.Component {
  constructor() {
    super();
    this.state = {
      bColor: 'white'
    }
    this.remove = this.remove.bind(this);
  }
  remove() {
    console.log('remove.................', this.props.position);
    this.props.remove(this.props.position);
  }
  render() {
    // console.log("entered card.jsx");
    const {id} = this.props;
    // const {name} = this.props;
    const {image} = this.props;


    var name = <span>
      <b style={{
        padding: '2px'
      }}>{this.props.name}</b>
    </span>
    var card;

      card = <div style={{'marginRight':'5%'}}>
                {/*<Card style = {{ margin:'auto',border:'2px', textDecoration:'none',}} >
                  <Card.Content style={{color: 'black'}}>
                    <Icon floated='right' name="close" onClick = {this.remove}/>
                  <img src = {image} style = {{'width':'70%','height':'100px'}}/>
                </Card.Content>
                < /Card> */}
                <Card style = {{ margin:'auto',border:'2px', textDecoration:'none',}} >
                  <Card.Content style={{color: 'black',textAlign:'center'}}>
                    <Icon floated='right' name="close" onClick = {this.remove}/>
                    {name}
                </Card.Content>
                < /Card>
            </div>
    return (
      <div>
        {card}
      </div>
    );
  }
}
module.exports = DustbinCard;

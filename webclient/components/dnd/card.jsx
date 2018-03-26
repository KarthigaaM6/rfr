import React from 'react';
import {Card, Icon, Button, Popup, Segment,Grid} from 'semantic-ui-react';

class MyCard extends React.Component {
  constructor() {
    super();
    this.state = {
      bColor: 'white'
    }
    this.remove = this.remove.bind(this);
  }
  remove() {
    //console.log('remove', this.props.position);
    this.props.remove(this.props.position);
  }

  componentWillMount() {
    console.log("props",this.props.name);
  }

  render() {
    // console.log("entered card.jsx");
    const {id} = this.props;
    //const {toolname} = this.props.name;
    // const {image} = this.props;


    var name = <span>
      <b style={{
        padding: '2px',
        textAlign: 'center'
      }}>{this.props.name}</b>
    </span>
    var card;

      card = <div >
              {/*}  <Card style = {{ margin:'auto',border:'2px', textDecoration:'none',boxShadow:'black'}} >
                  <Card.Content>
                  <img src = {image} style = {{'width':'70%','height':'100px'}}/>
                </Card.Content>
                < /Card> */}
                <Card style = {{ margin:'auto',border:'2px', textDecoration:'none',boxShadow:'black',textAlign: 'center'}} >
                    <Card.Content style={{ textAlign: 'center' }}>
                      {name}
                    </Card.Content>
                </Card>
            </div>
    return (
      <div>
        {card}
      </div>
    );
  }
}
module.exports = MyCard;

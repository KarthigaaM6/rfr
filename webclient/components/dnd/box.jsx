import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { Button, Card, Grid, Form } from 'semantic-ui-react';
import ItemTypes from './ItemTypes.jsx';
import Cards from './card.jsx';

const style = {
  border: '1px dashed black',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const boxSource = {
  beginDrag(props) {
    return {
      id: props.id,
      name: props.name,
      image : props.image
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    // console.log("props",props);
    if (dropResult) {
      props.addCard(item.id,item.name,item.image);
      // props.scrollToBottom();
    }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,

};

class Box extends Component {

  render() {
    // console.log('box',this.props.image);

    const { isDragging, connectDragSource } = this.props;
    const { name } = this.props;
    const {image} = this.props;
    const {id} = this.props;
    // const {cardColor} = this.props;
    // const {category} = this.props;
    // const {checked} = this.props;

    return (
      connectDragSource(
        <div>
            {/* }<Cards name={name} image={image} id={id} /> */}
            <Cards name={name} id={id} />
        </div>
        )
    );
  }
}

export default DragSource(ItemTypes.BOX, boxSource, collect)(Box);

import React, {Component} from 'react';
import {render} from 'react-dom';

// Components
// import DragSortableList from 'react-drag-sortable';
import DustbinCards from './dustbinCard.jsx';

var listGrid = [];

export default class SortableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allCards: props.allCards
    };
  }

  remove(position) {
    var cards = this.props.allCards;
    this.props.changeCard(position);
    this.setState({allCards: this.props.allCards},function() {

    });
  }

  // onSort(sortedList) {
  //   let allCards = [];
  //   //console.log("sortedList", sortedList);
  //   sortedList.map((item, index) => {
  //     var x = item.content.props.children.props;
  //     allCards.push({
  //       cardColor: x.cardColor,
  //       category: x.category,
  //       checked: x.checked,
  //       description: x.description,
  //       id: x.id,
  //       name: x.name
  //     })
  //   })
  //   this.setState({
  //     allCards: allCards
  //   }, function() {
  //     this.props.changeCard(this.state.allCards);
  //   })
  // }

  render() {
    var listGrid = [];
    // console.log('allCards in reorder file',this.props.allCards);
    this.props.allCards.map((item, index) => {

      listGrid.push(
          <div style={{
            padding: '5px'
          }}>
            <DustbinCards id={item.id} name={item.name} position={index} image={item.image} remove={this.remove.bind(this)} />
          </div>
        )
    })
    return (
      <div style={{margin:'auto'}}>
        {listGrid}
        {/* <DragSortableList items={listGrid} dropBackTransitionDuration={0.3} onSort={this.onSort.bind(this)} type="grid"/> */}
      </div>
    )
  }
}

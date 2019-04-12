import React from 'react';
import withDragDropContext from './DraggableProvider';

class FieldBlockDraggableContext extends React.Component {
    
    render () {
        return this.props.children;
    }
};

export default withDragDropContext(FieldBlockDraggableContext);
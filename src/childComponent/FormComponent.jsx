import { useDrag, useDrop } from 'react-dnd'; 
import PropTypes from 'prop-types'; 

// FormComponent represents an individual form field that can be dragged and rearranged
const FormComponent = ({ component, index, moveComponent }) => {
  // useDrop hook to handle the hovering and dropping logic for rearranging components
  const [, ref] = useDrop({
    accept: 'FORM_COMPONENT', // Accept items of type 'FORM_COMPONENT'
    hover(item) { // Function triggered when a component hovers over another component
      if (item.index !== index) { // Check if the hovered component is not in the same position
        moveComponent(item.index, index); // Move the component to the new position
        item.index = index; // Update the item's index to reflect its new position
      }
    },
  });

  // useDrag hook to handle the dragging logic for moving components
  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT', // Specify the type of item being dragged
    item: { ...component, index }, // Pass the component data and its current index
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Track whether the item is being dragged
    }),
  });

  // Function to render the appropriate form input based on the component's type
  const renderFormElement = () => {
    switch (component.type) {
      case 'text':
        return <input type="text" placeholder={component.label} required={component.required} />;
      case 'email':
        return <input type="email" placeholder={component.label} required={component.required} />;
      case 'password':
        return <input type="password" placeholder={component.label} required={component.required} />;
      case 'checkbox':
        return <input type="checkbox" required={component.required} />;
      case 'radio':
        return <input type="radio" name={component.label} required={component.required} />;
      case 'textarea':
        return <textarea placeholder={component.label} required={component.required}></textarea>;
      case 'number':
        return <input type="number" placeholder={component.label} required={component.required} />;
      default:
        return <input type="text" placeholder={component.label} required={component.required} />;
    }
  };

  return (
    // Attach both the drag and drop refs to the component div
    <div
      ref={(node) => drag(ref(node))} // Combine refs from both useDrag and useDrop for drag-and-drop behavior
      className="form-item" // Class for styling the form component
      style={{ opacity: isDragging ? 0.5 : 1 }} // Reduce opacity when dragging
    >
      <label>
        {component.label} {/* Display the label of the form component */}
        {component.required && <span>*</span>} {/* Display asterisk if the component is marked as required */}
      </label>
      {renderFormElement()} {/* Render the appropriate input field */}
    </div>
  );
};

// PropTypes validation for FormComponent to ensure correct data types are passed as props
FormComponent.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.string.isRequired, 
    label: PropTypes.string.isRequired, 
    type: PropTypes.string.isRequired, 
    required: PropTypes.bool, 
  }),
  index: PropTypes.number.isRequired, // index is required and should be a number
  moveComponent: PropTypes.func.isRequired, // moveComponent is a required function to handle rearranging
};

export default FormComponent;

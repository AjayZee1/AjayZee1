import { useDrop } from 'react-dnd'; // Importing useDrop hook from react-dnd to make the FormPanel droppable
import FormComponent from '../childComponent/FormComponent'; // Importing the FormComponent that represents individual form elements
import PropTypes from 'prop-types'; // Importing PropTypes for prop validation

// FormPanel component: represents the area where form components will be dropped and arranged
const FormPanel = ({ formComponents, moveComponent }) => {
  // Setting up the drop functionality using useDrop hook
  const [, drop] = useDrop({
    accept: 'FORM_COMPONENT', // Accept only components of type 'FORM_COMPONENT'
    drop: () => ({ name: 'FormPanel' }), // Function to handle the drop action and return the drop result
  });

  return (
    // The div representing the form layout panel where components are dropped
    <div className="form-panel" ref={drop}>
      <h3>Form Layout</h3>
      {formComponents.map((component, index) => (
        <FormComponent
          key={component.id} // Unique key for each form component
          component={component} // Pass the component's details to the child component
          index={index} // Pass the current index of the component
          moveComponent={moveComponent} // Function to handle rearranging of components
        />
      ))}
    </div>
  );
};

// PropTypes validation for FormPanel to ensure correct data types are passed as props
FormPanel.propTypes = {
  formComponents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // id should be a string and is required
      label: PropTypes.string.isRequired, // label should be a string and is required
      type: PropTypes.string.isRequired, // type should be a string and is required
      required: PropTypes.bool, // required should be a boolean (optional)
    })
  ),
  moveComponent: PropTypes.func.isRequired, // moveComponent must be a function and is required
};

export default FormPanel;

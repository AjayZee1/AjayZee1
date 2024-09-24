import { useDrop } from 'react-dnd';
import FormComponent from './FormComponent';
import PropTypes from 'prop-types';

const FormPanel = ({ formComponents, moveComponent }) => {
  const [, drop] = useDrop({
    accept: 'FORM_COMPONENT',
    drop: () => ({ name: 'FormPanel' }),
  });

  return (
    <div className="form-panel" ref={drop}>
      <h3>Form Layout</h3>
      {formComponents.map((component, index) => (
        <FormComponent
          key={component.id}
          component={component}
          index={index}
          moveComponent={moveComponent}
        />
      ))}
    </div>
  );
};

FormPanel.propTypes = {
  formComponents: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
      required: PropTypes.bool,
    })
  ),
  moveComponent: PropTypes.func.isRequired,
};

export default FormPanel;

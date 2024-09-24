import { useDrag, useDrop } from 'react-dnd';
import PropTypes from 'prop-types';

const FormComponent = ({ component, index, moveComponent }) => {
  const [, ref] = useDrop({
    accept: 'FORM_COMPONENT',
    hover(item) {
      if (item.index !== index) {
        moveComponent(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT',
    item: { ...component, index },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={(node) => drag(ref(node))}
      className="form-item"
      style={{ opacity: isDragging ? 0.5 : 1 }}
    >
      {component.label} {component.required && <span>*</span>}
    </div>
  );
};

FormComponent.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
  }),
  index: PropTypes.number.isRequired,
  moveComponent: PropTypes.func.isRequired,
};

export default FormComponent;

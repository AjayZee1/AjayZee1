import { useDrag } from 'react-dnd';
import PropTypes from 'prop-types';

const SidebarItem = ({ component, addComponent }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT',
    item: { component },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();
      if (dropResult) {
        addComponent(item.component);
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className="sidebar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {component.label}
    </div>
  );
};

SidebarItem.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }),
  addComponent: PropTypes.func.isRequired,
};

const Sidebar = ({ components, addComponent }) => {
  return (
    <div className="sidebar">
      <h3>Form Components</h3>
      {components.map((component) => (
        <SidebarItem key={component.id} component={component} addComponent={addComponent} />
      ))}
    </div>
  );
};

Sidebar.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ),
  addComponent: PropTypes.func.isRequired,
};

export default Sidebar;

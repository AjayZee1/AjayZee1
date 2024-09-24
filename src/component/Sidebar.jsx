import { useDrag } from 'react-dnd'; // Importing useDrag hook from react-dnd to make components draggable
import PropTypes from 'prop-types'; // Importing PropTypes to validate props

// SidebarItem component represents each draggable form component in the sidebar
const SidebarItem = ({ component, addComponent }) => {
  // Setting up the drag functionality using useDrag hook
  const [{ isDragging }, drag] = useDrag({
    type: 'FORM_COMPONENT', // Unique identifier for the drag type, differentiates the kind of draggable item
    item: { component }, // Data passed along when the component is dragged
    end: (item, monitor) => { // Callback when dragging ends
      const dropResult = monitor.getDropResult(); // Get the result of the drop
      if (dropResult) {
        addComponent(item.component); // If dropped in the right place, add the component to the form
      }
    },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(), // Track if the component is being dragged
    }),
  });

  return (
    // The div representing the sidebar item, ref is attached to enable drag functionality
    <div ref={drag} className="sidebar-item" style={{ opacity: isDragging ? 0.5 : 1 }}>
      {component.label} {/* Display the label of the form component */}
    </div>
  );
};

// PropTypes validation for SidebarItem to ensure the right prop types are passed
SidebarItem.propTypes = {
  component: PropTypes.shape({
    id: PropTypes.string.isRequired, // id should be a string and is required
    label: PropTypes.string.isRequired, // label should be a string and is required
    type: PropTypes.string.isRequired, // type should be a string and is required
  }),
  addComponent: PropTypes.func.isRequired, // addComponent must be a function and is required
};

// Sidebar component which renders all the draggable components
const Sidebar = ({ components, addComponent }) => {
  return (
    <div className="sidebar">
      <h3>Form Components</h3>
      {/* Mapping through components and rendering SidebarItem for each */}
      {components.map((component) => (
        <SidebarItem key={component.id} component={component} addComponent={addComponent} />
      ))}
    </div>
  );
};

// PropTypes validation for Sidebar to ensure correct data structure for the list of components
Sidebar.propTypes = {
  components: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired, // id should be a string and is required
      label: PropTypes.string.isRequired, // label should be a string and is required
      type: PropTypes.string.isRequired, // type should be a string and is required
    })
  ),
  addComponent: PropTypes.func.isRequired, // addComponent must be a function and is required
};

export default Sidebar;

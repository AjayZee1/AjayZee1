import { useState } from 'react'; 
import { DndProvider } from 'react-dnd'; 
import { HTML5Backend } from 'react-dnd-html5-backend'; 
import Sidebar from './component/Sidebar'; 
import FormPanel from './component/FormPanel'; 
import './App.css'; 

const initialComponents = [
  { id: '1', label: 'Name', type: 'text' },
  { id: '2', label: 'Number Input', type: 'number' },
  { id: '3', label: 'Email Field', type: 'email' },
  { id: '4', label: 'Address', type: 'text' },
  { id: '5', label: 'Checkbox', type: 'checkbox' },
  { id: '6', label: 'Password Field', type: 'password' },
  { id: '7', label: 'Textarea', type: 'textarea' },
  { id: '8', label: 'Radio Button', type: 'radio' },
  { id: '9', label: 'Input Field', type: 'input' },
];

function App() {
  const [formComponents, setFormComponents] = useState([]); // State to keep track of components added to the form

  // Function to add a component to the form when dragged from the sidebar
  const addComponent = (component) => {
    // Check if the component is already in the form
    if (!formComponents.some(comp => comp.id === component.id)) {
      // Add the component to the form, marking it required if it is within the first 3 components
      const updatedForm = [...formComponents, { ...component, required: formComponents.length < 3 }];
      setFormComponents(updatedForm); // Update the state with the new form components
    }
  };

  // Function to handle rearranging components within the form
  const moveComponent = (dragIndex, hoverIndex) => {
    const updatedForm = Array.from(formComponents); // Create a copy of the current form state
    const [movedComponent] = updatedForm.splice(dragIndex, 1); // Remove the dragged component from its current position

    // Check if the component already exists at the hover index before moving
    if (!updatedForm.some(comp => comp.id === movedComponent.id)) {
      updatedForm.splice(hoverIndex, 0, movedComponent); // Insert the component into the new position
    }

    // Ensure the first 3 components in the updated form are marked as required
    updatedForm.forEach((item, index) => item.required = index < 3);
    setFormComponents(updatedForm); // Update the state with the reordered components
  };

  return (
    // DndProvider provides the drag-and-drop context for the entire application
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        {/* Sidebar displays available components to be added to the form */}
        <Sidebar components={initialComponents} addComponent={addComponent} />

        {/* FormPanel shows the current form layout and allows rearranging components */}
        <FormPanel formComponents={formComponents} moveComponent={moveComponent} />
      </div>
    </DndProvider>
  );
}

export default App;

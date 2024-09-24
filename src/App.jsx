import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import FormPanel from './FormPanel';
import './App.css';

const initialComponents = [
  { id: '1', label: 'Input Field', type: 'input' },
  { id: '2', label: 'Textarea', type: 'textarea' },
  { id: '3', label: 'Checkbox', type: 'checkbox' },
  { id: '4', label: 'Radio Button', type: 'radio' },
  { id: '5', label: 'Email Field', type: 'email' },
  { id: '6', label: 'Password Field', type: 'password' },
  { id: '7', label: 'Number Input', type: 'number' },
  { id: '8', label: 'Address', type: 'text' },
];

function App() {
  const [formComponents, setFormComponents] = useState([]);

  const addComponent = (component) => {
    if (!formComponents.some(comp => comp.id === component.id)) {
      const updatedForm = [...formComponents, { ...component, required: formComponents.length < 3 }];
      setFormComponents(updatedForm);
    }
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const updatedForm = Array.from(formComponents);
    const [movedComponent] = updatedForm.splice(dragIndex, 1);

    // Check if movedComponent already exists at hoverIndex
    if (!updatedForm.some(comp => comp.id === movedComponent.id)) {
      updatedForm.splice(hoverIndex, 0, movedComponent);
    }

    // Ensure top 3 are required
    updatedForm.forEach((item, index) => item.required = index < 3);
    setFormComponents(updatedForm);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <Sidebar components={initialComponents} addComponent={addComponent} />
        <FormPanel formComponents={formComponents} moveComponent={moveComponent} />
      </div>
    </DndProvider>
  );
}

export default App;

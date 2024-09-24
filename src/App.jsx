import  { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Sidebar from './Sidebar';
import FormPanel from './FormPanel';
import './App.css';

const initialComponents = [
  { id: '1', label: 'Input Field', type: 'input' },
  { id: '2', label: 'Textarea', type: 'textarea' },
  { id: '3', label: 'Select Dropdown', type: 'select' },
  { id: '4', label: 'Checkbox', type: 'checkbox' },
  { id: '5', label: 'Radio Button', type: 'radio' },
  { id: '6', label: 'Email Field', type: 'email' },
  { id: '7', label: 'Password Field', type: 'password' },
  { id: '8', label: 'Number Input', type: 'number' },
];

function App() {
  const [formComponents, setFormComponents] = useState([]);

  const addComponent = (component) => {
    const updatedForm = [...formComponents, { ...component, required: formComponents.length < 3 }];
    setFormComponents(updatedForm);
  };

  const moveComponent = (dragIndex, hoverIndex) => {
    const updatedForm = Array.from(formComponents);
    const [movedComponent] = updatedForm.splice(dragIndex, 1);
    updatedForm.splice(hoverIndex, 0, movedComponent);

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

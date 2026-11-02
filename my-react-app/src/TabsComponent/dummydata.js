import React from 'react';
import { DropDownWrapper } from './DropdownWrapper';
import GridData from './gridData';

export default function DummyData() {
  const menuData = [
    { 
      label: 'File', 
      submenu: [
        { label: 'New Project', onClick: () => console.log('New Project Created') },
        { label: 'Open Recent' },
        { 
          label: 'Export As...', 
          submenu: [
            { label: 'PDF (.pdf)', onClick: () => console.log('Exporting PDF...') },
            { label: 'Image (.png)', onClick: () => console.log('Exporting PNG...') },
            { 
              label: 'Advanced Formats',
              submenu: [
                { label: 'SVG向量 graph', onClick: () => console.log('Exporting SVG...') },
                { label: 'Raw Data (.json)', onClick: () => console.log('Exporting JSON...') }
              ]
            }
          ]
        }
      ]
    },
    { 
      label: 'Edit', 
      submenu: [
        { label: 'Undo', onClick: () => console.log('Undo action') },
        { label: 'Redo', onClick: () => console.log('Redo action') }
      ]
    },
    { label: 'Settings', onClick: () => console.log('Settings Opened') }
  ];
  const [selectedItems, setSelectedItems] = React.useState([]);

  return (
    <div>
       <DropDownWrapper
        title="Options Menu"
        items={menuData}
        onSelectionChange={setSelectedItems}
      />
      {selectedItems.length > 0 && (
        <GridData selectedItems={selectedItems} />
      )}
    </div>
  );
}
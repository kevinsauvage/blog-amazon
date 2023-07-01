'use client';

import React, { useEffect, useRef, useState } from 'react';

const MasonryGrid = ({ children }) => {
  const [columns, setColumns] = useState(4);
  const gridReference = useRef(null);
  const itemReferences = useRef([]);

  useEffect(() => {
    const calculateColumns = () => {
      const containerWidth = gridReference.current.offsetWidth;
      const newColumns = Math.floor(containerWidth / 360); // Adjust the width of each column as needed
      setColumns(newColumns);
    };

    calculateColumns();
    window.addEventListener('resize', calculateColumns);
    return () => window.removeEventListener('resize', calculateColumns);
  }, []);

  const getItemHeight = (index) => {
    const itemReference = itemReferences.current[index];

    console.log('🚀 ~  file: Masonry.js:25 ~  getItemHeight ~  itemReferences:', itemReferences);

    return itemReference ? itemReference.getBoundingClientRect().height : 0;
  };

  const getColumnHeight = () => {
    const columnHeights = new Array(columns).fill(0);

    React.Children.forEach(children, (child, index) => {
      const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
      const itemHeight = getItemHeight(index); // Get the height using index
      columnHeights[columnIndex] += itemHeight; // Adjust the height calculation as needed
    });

    return columnHeights;
  };

  const columnHeights = getColumnHeight();

  return (
    <div
      ref={gridReference}
      style={{ display: 'grid', gap: '10px', gridTemplateColumns: `repeat(${columns}, 1fr)` }}
    >
      {React.Children.map(children, (child, index) => {
        const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        const itemHeight = getItemHeight(index); // Get the height dynamically

        const gridColumn = `span ${child.props.width || 1} / span ${child.props.width || 1}`; // Use the "width" prop from the item component if available

        columnHeights[columnIndex] += itemHeight; // Update column height

        return (
          <div key={index} style={{ gridColumn }}>
            <div
              ref={(reference) => {
                itemReferences.current[index] = reference;
              }}
              style={{
                backgroundColor: '#e0e0e0',
                borderRadius: '5px',
                height: '100%', // Get the item height dynamically
                padding: '10px',
              }}
            >
              {child} {/* Render the item component */}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MasonryGrid;

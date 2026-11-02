import React, { useState, useRef, useEffect } from 'react';
import './Dropdown.css';

const defaultGetLabel = (item) => {
  if (typeof item === 'string' || typeof item === 'number') {
    return String(item);
  }

  return item?.label ?? item?.title ?? item?.name ?? item?.text ?? '';
};

const defaultGetChildren = (item) => {
  const children = item?.submenu ?? item?.children ?? item?.items;
  return Array.isArray(children) ? children : [];
};

const MenuItem = ({
  item,
  getLabel,
  getChildren,
  onItemClick,
  onSelectionChange,
  itemKey,
  isSelected,
  onSelectionToggle,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const children = getChildren(item);
  const hasSubmenu = children.length > 0;

  const handleClick = (e) => {
    if (hasSubmenu) {
      e.stopPropagation();
      setIsOpen((open) => !open);
    } else {
      const action = typeof item === 'object' ? item.onClick : undefined;
      if (typeof action === 'function') {
        action(item);
      }
      onItemClick?.(item);
    }
  };

  const handleSelectionChange = (event) => {
    event.stopPropagation();
    onSelectionToggle(itemKey, item, event.target.checked);
  };

  return (
    <li
      ref={containerRef}
      className={`menu-item ${hasSubmenu ? 'has-submenu' : ''}`}
    >
      <div className="menu-item-controls">
           <input
          className="menu-checkbox"
          type="checkbox"
          checked={isSelected(itemKey)}
          onChange={handleSelectionChange}
          aria-label={`Select ${getLabel(item)}`}
          onClick={(event) => event.stopPropagation()}
        />
        <button type="button" onClick={handleClick} className="menu-button">
          {getLabel(item)}
          {hasSubmenu && <span className="arrow"> &raquo;</span>}
        </button>
     
      </div>

      {hasSubmenu && isOpen && (
        <ul className="submenu">
          {children.map((subItem, index) => (
            <MenuItem
              key={subItem?.id ?? subItem?.key ?? `${itemKey}-${index}`}
              item={subItem}
              itemKey={`${itemKey}-${index}`}
              getLabel={getLabel}
              getChildren={getChildren}
              onItemClick={onItemClick}
              onSelectionChange={onSelectionChange}
              isSelected={isSelected}
              onSelectionToggle={onSelectionToggle}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export const DropDownWrapper = ({
  title,
  items = [],
  getLabel = defaultGetLabel,
  getChildren = defaultGetChildren,
  onItemClick,
  onSelectionChange,
  onOpenChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);
  const dropdownRef = useRef(null);

  const isSelected = (itemKey) =>
    selectedItems.some((selected) => selected.key === itemKey);

  const handleSelectionToggle = (itemKey, item, checked) => {
    const updatedItems = checked
      ? [...selectedItems, { key: itemKey, item }]
      : selectedItems.filter((selected) => selected.key !== itemKey);

    setSelectedItems(updatedItems);
    onSelectionChange?.(updatedItems.map((selected) => selected.item));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
        onOpenChange?.(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onOpenChange]);

  const toggleDropdown = () => {
    const nextOpen = !isOpen;
    setIsOpen(nextOpen);
    onOpenChange?.(nextOpen);
  };

  return (
    <div ref={dropdownRef} className="dropdown-container">
      <button
        type="button"
        className="dropdown-trigger"
        onClick={toggleDropdown}
      >
        {title}
      </button>

      {isOpen && (
        <ul className="dropdown-menu">
          {items.map((item, index) => (
            <MenuItem
              key={item?.id ?? item?.key ?? index}
              item={item}
              itemKey={String(index)}
              getLabel={getLabel}
              getChildren={getChildren}
              onItemClick={onItemClick}
              onSelectionChange={onSelectionChange}
              isSelected={isSelected}
              onSelectionToggle={handleSelectionToggle}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

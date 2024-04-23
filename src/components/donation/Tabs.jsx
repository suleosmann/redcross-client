import React from 'react';

const Tabs = ({ activeTab, setActiveTab, children }) => {
  const handleClick = (e, newActiveTab) => {
    e.preventDefault();
    setActiveTab(newActiveTab);
  };

  return (
    <div>
      <ul className="flex divide-x divide-red-500">
        {children.map((tab) => (
          <li
            key={tab.props.label}
            className={`flex-1 text-center py-4 cursor-pointer ${activeTab === tab.props.label ? 'text-red-600 font-semibold border-b-4 border-red-600' : 'text-gray-500'}`}
            onClick={(e) => handleClick(e, tab.props.label)}
          >
            {tab.props.icon}
            <span className="ml-2">{tab.props.label}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        {children.map((one) => {
          if (one.props.label === activeTab) return <div key={one.props.label}>{one.props.children}</div>;
          return null;
        })}
      </div>
    </div>
  );
};

export default Tabs;

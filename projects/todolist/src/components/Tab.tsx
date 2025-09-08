import { useState } from 'react';

type TabType = 'All' | 'Active' | 'Completed';

export default function Tab() {
  const tabItems: TabType[] = ['All', 'Active', 'Completed'];

  const [tab, setTab] = useState<TabType>('All');

  const handleChangeTab = (status: TabType) => {
    console.log(status);
    setTab(status);
  };

  return (
    <ul className="flex gap-3 justify-center">
      {tabItems.map(tabItem => (
        <button
          key={tabItem}
          onClick={() => handleChangeTab(tabItem)}
          className={`${tabItem == tab ? 'font-bold bg-blue-500 text-white' : ''}`}
        >
          {tabItem}
        </button>
      ))}
    </ul>
  );
}

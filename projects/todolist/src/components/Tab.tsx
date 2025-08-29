export type TabType = 'All' | 'Active' | 'Completed'; // 타입
const tabItems: TabType[] = ['All', 'Active', 'Completed']; // 탭 상수

export default function Tab({ tab, setTab }: { tab: TabType; setTab: (status: TabType) => void }) {
  /** 탭 변경 함수 */
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

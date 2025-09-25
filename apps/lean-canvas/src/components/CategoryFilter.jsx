function CategoryFilter({ category, onChange }) {
  const categories = ['헬스케어', '물류', '여행', '신규'];
  return (
    <select
      id='category'
      className='border p-2 rounded-lg w-full sm:w-32'
      value={category === null ? 'all' : category} // null이면 'all'로 표시
      onChange={e => {
        const val = e.target.value;
        if (val === 'all') {
          onChange(null);
        } else {
          onChange(val);
        }
      }}
    >
      <option value='all'>전체</option>
      {categories.map(category => (
        <option key={category} value={category}>
          {category}
        </option>
      ))}
    </select>
  );
}

export default CategoryFilter;

import { useState } from "react";
const Search = ({ search }) => {
  const selectList = ["이름", "부서", "직책"];
  const [selected, setselected] = useState("이름");
  const [searchValue, setsearchValu] = useState("");

  const handleSelect = (e) => {
    setselected(e.target.value);
  };

  return (
    <div>
      검색:
      <select onChange={handleSelect} value={selected}>
        {selectList.map((item) => {
          return (
            <option value={item} key={item}>
              {item}
            </option>
          );
        })}
      </select>
      <input
        type="text"
        onChange={(e) => {
          setsearchValu(e.target.value);
        }}
      />
      <button
        type="button"
        onClick={() => {
          search(selected, searchValue);
        }}
      >
        검색
      </button>
    </div>
  );
};
export default Search;

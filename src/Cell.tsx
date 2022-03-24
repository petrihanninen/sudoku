import { useState } from "react";
import { SudokuCell } from "./SudokuGrid";

function useForceUpdate() {
  const [, setValue] = useState(0); // integer state
  return () => setValue((value) => value + 1); // update the state to force render
}

const Cell: React.FC<{ cell: SudokuCell }> = ({ cell }) => {
  const t = cell.x % 3 === 0;
  const b = (cell.x + 1) % 3 === 0;
  const l = cell.y % 3 === 0;
  const r = (cell.y + 1) % 3 === 0;

  cell.rerender = useForceUpdate();

  const handleClick = () => {
    if (cell.fixed) return;
    cell.selected = !cell.selected;
  };

  return (
    <div
      className={`
        cell
        ${t ? "t" : ""}
        ${b ? "b" : ""}
        ${l ? "l" : ""}
        ${r ? "r" : ""}
        ${cell.selected ? "selected" : ""}
      `}
      onClick={handleClick}
    >
      <p
        className={`
          cell-content
          ${cell.fixed ? "fixed" : ""}
        `}
      >
        {cell.value === "." ? "" : cell.value}
      </p>
      <span className="debug">
        ({cell.x}, {cell.y})
      </span>
    </div>
  );
};

export default Cell;

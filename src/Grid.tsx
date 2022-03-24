import { SudokuGrid } from "./SudokuGrid";
import Cell from "./Cell";

const Grid: React.FC<{ grid: SudokuGrid }> = ({ grid }) => {
  return (
    <div className="content">
      <div className="grid">
        {grid.grid.map((cell) => (
          <Cell cell={cell} key={`${cell.x},${cell.y}`} />
        ))}
      </div>
    </div>
  );
};

export default Grid;

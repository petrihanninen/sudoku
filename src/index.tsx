import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { SudokuGrid } from "./SudokuGrid";
import randomSudoku from "./sudokus";
import Grid from "./Grid";
import "./App.css";

const grid = new SudokuGrid(randomSudoku());

ReactDOM.render(
  <StrictMode>
    <Grid grid={grid} />
  </StrictMode>,
  document.getElementById("root")
);

const mod = (a: number, n: number) => ((a % n) + n) % n;

const inputNumber = (v: number) => {
  const cell = grid.grid.find((c) => c.selected);

  if (!cell) return;

  cell.value = v;
  cell.selected = true;
  cell.rerender();
};

const move = (dir: string) => {
  const selected = grid.grid.find((c) => c.selected) || grid.grid[0];

  let newSelected;

  switch (dir) {
    case "up":
      newSelected = grid.grid.find(
        (cell) => cell.x === mod(selected.x - 1, 9) && cell.y === selected.y
      );
      break;
    case "down":
      newSelected = grid.grid.find(
        (cell) => cell.x === mod(selected.x + 1, 9) && cell.y === selected.y
      );
      break;
    case "left":
      newSelected = grid.grid.find(
        (cell) => cell.y === mod(selected.y - 1, 9) && cell.x === selected.x
      );
      break;
    case "right":
      newSelected = grid.grid.find(
        (cell) => cell.y === mod(selected.y + 1, 9) && cell.x === selected.x
      );
      break;
    default:
      return;
  }

  if (!newSelected) return;
  newSelected.selected = true;
};

const handleKeyPress = (e: KeyboardEvent) => {
  if ("123456789".includes(e.key)) {
    inputNumber(parseInt(e.key));
  }
  if (e.key.includes("Arrow")) {
    const dir = e.key.split("Arrow").join("").toLowerCase();
    move(dir);
  }
};

document.addEventListener("keydown", handleKeyPress);

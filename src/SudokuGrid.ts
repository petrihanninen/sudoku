import solve from "./solve";

// const replaceCharAt = (str, c, i) => str.substr(0, i) + c + str.substr(i + 1);

export class SudokuCell {
  #sudoku: string;
  index: number;
  #value = "";
  #grid: SudokuGrid;
  x: number;
  y: number;
  box: number;
  fixed: boolean;
  _selected: boolean;
  rerender = () => {};

  constructor(x: number, y: number, sudoku: string, grid: SudokuGrid) {
    this.x = x;
    this.y = y;
    this.#sudoku = sudoku;
    this._selected = false;
    this.#grid = grid;
    this.index = x * Math.sqrt(this.#sudoku.length) + y;
    this.value = sudoku[this.index];
    this.fixed = this.value !== ".";
    this.box = Math.floor(x / 3) * 3 + Math.floor(y / 3);
  }

  set value(v: string | number) {
    if (typeof v === "number") v = v.toString();

    if (!this.#isValidValue(v)) {
      throw new Error(`Invalid value: ${v} for cell ${this.x}, ${this.y}`);
    }

    if (!this.#isValidInput(v)) {
      throw new Error(`Wrong value: ${v} for cell ${this.x}, ${this.y}`);
    }

    this.#value = v;
  }

  get value() {
    return this.#value;
  }

  #isValidValue(v: string) {
    return "123456789.".includes(v);
  }

  #isValidInput(v: string) {
    if (v === ".") return true;

    for (let cell of this.#grid.grid) {
      // Check every cell where either row, column or box is the same as current
      if (cell.x === this.x || cell.y === this.y || cell.box === this.box) {
        if (cell.value === v) {
          return false;
        }
      }
    }

    return true;
  }

  set selected(v: boolean) {
    if (v === true) {
      this.#grid.grid.forEach((cell) => {
        if (cell.index === this.index) return;
        cell.selected = false;
      });
    }
    // if (v) console.log(`selecting: ${this.x}, ${this.y}`);
    this._selected = v;
    this.rerender();
  }

  get selected() {
    return this._selected;
  }

  isValid() {
    if (this.value === ".") return false;

    for (let cell of this.#grid.grid) {
      if (cell.value === this.value) {
        if (cell.x === this.x || cell.y === this.y || cell.box === this.box) {
          return false;
        }
      }
    }
  }
}

export class SudokuGrid {
  sudoku: string;
  grid: SudokuCell[];
  sideLength: number;

  constructor(sudoku: string) {
    this.sudoku = sudoku;
    this.grid = [];
    this.sideLength = Math.sqrt(sudoku.length);

    for (let i = 0; i < sudoku.length; i++) {
      this.grid[i] = new SudokuCell(
        Math.floor(i / this.sideLength),
        i % this.sideLength,
        sudoku,
        this
      );
    }
  }

  isValidSolution() {
    for (const cell of this.grid) {
      if (!cell.isValid()) return false;
      return true;
    }
  }

  i(x: number, y: number) {
    return x * this.sideLength + y;
  }

  valueAt(x: number, y: number) {
    if (x >= this.sideLength || y >= this.sideLength) {
      throw new RangeError("Index out of bounds");
    }
    return this.grid[this.i(x, y)].value;
  }

  input(x: number, y: number, v: string) {
    try {
      this.grid[this.i(x, y)].value = v;

      return true;
    } catch (e) {
      console.error(
        `Wasn't able to put in value ${v} for cell ${x}, ${y}:\n${e}`
      );
      return false;
    }
  }

  solve() {
    solve(this);
  }
}

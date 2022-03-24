const sudokus = [
  "63.....81.2...3.......1743..964..57....762....8....6...6..2....3.9....6.........9"
];

const randomSudoku = () => sudokus[Math.floor(Math.random() * sudokus.length)];

export default randomSudoku;

const sudokus = [
  "7.4..6..9.8..1......3.2.45.........2.56...78.1.........25.3.1......4..6.9..5..3.7",
];

const randomSudoku = () => sudokus[Math.floor(Math.random() * sudokus.length)];

export default randomSudoku;

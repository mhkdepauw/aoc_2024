import { read_lines, read_lines_split_on_space_num } from "../lib.mjs";

function main() {
  const dummy_input = [
    "MMMSXXMASM",
    "MSAMXMSMSA",
    "AMXSXMAAMM",
    "MSAMASMSMX",
    "XMASAMXAMM",
    "XXAMMXXAMA",
    "SMSMSASXSS",
    "SAXAMASAAA",
    "MAMMMXMMMM",
    "MXMXAXMASX",
  ];
  const input: string[] = read_lines(4);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]) {
  let result = 0;
  for (let i = 0; i < lines.length; i++) {
    for (let j = 0; j < lines[i].length; j++) {
      if (lines[i][j] === "X") {
        if (j + 3 < lines[i].length)
          if (
            xmas_check([
              lines[i][j],
              lines[i][j + 1],
              lines[i][j + 2],
              lines[i][j + 3],
            ])
          )
            //rightcheck
            result += 1;
        if (j > 2)
          if (
            xmas_check([
              lines[i][j],
              lines[i][j - 1],
              lines[i][j - 2],
              lines[i][j - 3],
            ])
          )
            //leftcheck
            result += 1;
        if (i > 2)
          if (
            xmas_check([
              lines[i][j],
              lines[i - 1][j],
              lines[i - 2][j],
              lines[i - 3][j],
            ])
          )
            //upcheck
            result += 1;
        if (i + 3 < lines.length)
          if (
            xmas_check([
              lines[i][j],
              lines[i + 1][j],
              lines[i + 2][j],
              lines[i + 3][j],
            ])
          )
            //downcheck
            result += 1;
        // Diagonals
        if (j + 3 < lines[i].length && i > 2)
          if (
            xmas_check([
              lines[i][j],
              lines[i - 1][j + 1],
              lines[i - 2][j + 2],
              lines[i - 3][j + 3],
            ])
          )
            //rightup
            result += 1;
        if (j > 2 && i > 2)
          if (
            xmas_check([
              lines[i][j],
              lines[i - 1][j - 1],
              lines[i - 2][j - 2],
              lines[i - 3][j - 3],
            ])
          )
            //leftup
            result += 1;
        if (j + 3 < lines[i].length && i + 3 < lines.length)
          if (
            xmas_check([
              lines[i][j],
              lines[i + 1][j + 1],
              lines[i + 2][j + 2],
              lines[i + 3][j + 3],
            ])
          )
            //rightdown
            result += 1;
        if (j > 2 && i + 3 < lines.length)
          if (
            xmas_check([
              lines[i][j],
              lines[i + 1][j - 1],
              lines[i + 2][j - 2],
              lines[i + 3][j - 3],
            ])
          )
            //leftdown
            result += 1;
      }
    }
  }
  return result;
}

function part2(lines: string[]) {
  return 0;
}

function xmas_check(xmas: string[]) {
  console.log(xmas.join(""));
  if (xmas.join("") === "XMAS") {
    return true;
  }
  return false;
}

main();

import { read_lines } from "../lib.mjs";

function main() {
  const dummy_input = ["2333133121414131402"];
  const input: string[] = read_lines(9);
  console.log(`part 1: ${part1(dummy_input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]) {
  let result = 0;
  const line: string[] = lines[0].split("");
  const expanded_line: string[] = line.flatMap((char, i) =>
    Array.from({ length: +char }, () => (i % 2 === 0 ? `${i / 2}` : "."))
  );
  let mut_expanded_line = expanded_line.slice();
  for (let i = mut_expanded_line.length - 1; i >= 0; i--) {
    if (mut_expanded_line[i] !== "." && i > mut_expanded_line.indexOf(".")) {
      const pi = mut_expanded_line.indexOf(".");
      mut_expanded_line[pi] = mut_expanded_line[i];
      mut_expanded_line[i] = ".";
    }
  }
  mut_expanded_line.forEach((s, i) => (s !== "." ? (result += i * +s) : null));
  return result;
}

function part2(lines: string[]) {
  let result = 0;
  const line: string[] = lines[0].split("");
  const expanded_line: string[] = line.flatMap((char, i) =>
    Array.from({ length: +char }, () => (i % 2 === 0 ? `${i / 2}` : "."))
  );

  let mut_expanded_line = expanded_line.slice();
  for (let n = (line.length - 1) / 2; n > 0; n--) {
    const space = mut_expanded_line.reduce(
      (count, val) => (val === `${n}` ? count + 1 : count),
      0
    );
    const free_space = [];
    let current_space: number[] = [-1, 0];
    for (let i = 0; i < mut_expanded_line.length; i++) {
      if (mut_expanded_line[i] === ".") {
        if (current_space[0] === -1) current_space[0] = i;
        current_space[1] += 1;
      } else if (current_space[0] !== -1) {
        free_space.push(current_space);
        current_space = [-1, 0];
      }
    }
    if (current_space[0] !== -1) free_space.push(current_space);
    const valid_space = free_space.find(
      (s) => s[1] >= space && s[0] < mut_expanded_line.indexOf(`${n}`)
    );

    if (valid_space) {
      const move_from = mut_expanded_line.indexOf(`${n}`);
      for (let i = 0; i < space; i++) {
        mut_expanded_line[valid_space[0] + i] = `${n}`;
        mut_expanded_line[move_from + i] = ".";
      }
    }
  }
  mut_expanded_line.forEach((s, i) => {
    if (s !== ".") result += i * +s;
  });
  return result;
}

main();

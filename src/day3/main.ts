import { read_lines, read_lines_split_on_space_num } from "../lib.mjs";

function main() {
  const dummy_input = [
    "xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))",
  ];
  const input: string[] = read_lines(3);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]) {
  let result = 0;
  for (const line of lines) {
    const matches = [...line.matchAll(/mul\((\d*),(\d*)\)/gm)];
    for (const element of matches) {
      result += +element[1] * +element[2];
    }
  }
  return result;
}

function part2(lines: string[]) {
  const new_lines = lines.join();
  const line = new_lines.replaceAll(/don't\(\).+?do\(\)/gm, "");
  return part1([line]);
}

main();

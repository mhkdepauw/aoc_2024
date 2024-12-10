import { read_lines } from "../lib.mjs";

function main() {
  const dummy_input = [
    "............",
    "........0...",
    ".....0......",
    ".......0....",
    "....0.......",
    "......A.....",
    "............",
    "............",
    "........A...",
    ".........A..",
    "............",
    "............",
  ];
  const input: string[] = read_lines(8);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}
function part1(lines: string[]) {
  let result = 0;
  let mut_lines = lines.map((s) => s.split(""));
  let hashmap = new Map<string, number[][]>();
  mut_lines.forEach((l, i) =>
    l.forEach((s, j) =>
      !".#".includes(s)
        ? hashmap.has(s)
          ? hashmap.get(s)!.push([i, j])
          : hashmap.set(s, [[i, j]])
        : null
    )
  );
  let overlaps: number[][] = [];
  for (const [symbol, indexlist] of hashmap) {
    for (const [i, j] of indexlist) {
      for (const [i2, j2] of indexlist) {
        const [newi, newj] = [2 * i2 - i, 2 * j2 - j];
        if (
          !(i === i2 && j === j2) &&
          index_inbound([newi, newj], mut_lines) &&
          overlaps.every((co) => !(co[0] === newi && co[1] === newj))
        ) {
          if (mut_lines[newi][newj] === ".") {
            mut_lines[newi][newj] = "#";
          }
          overlaps.push([newi, newj]);
          result += 1;
        }
      }
    }
  }

  // mut_lines.forEach((p) => console.log(p.join("")));
  return result;
}

function index_inbound([i, j]: number[], lines: string[][]): boolean {
  return i >= 0 && i < lines.length && j >= 0 && j < lines[i].length;
}

function part2(lines: string[]) {
  let mut_lines = lines.map((s) => s.split(""));
  let hashmap = new Map<string, number[][]>();
  mut_lines.forEach((l, i) =>
    l.forEach((s, j) =>
      !".#".includes(s)
        ? hashmap.has(s)
          ? hashmap.get(s)!.push([i, j])
          : hashmap.set(s, [[i, j]])
        : null
    )
  );

  let counted_coords = new Set<string>();
  for (const [syntax, indexlist] of hashmap) {
    for (const [i, j] of indexlist) {
      for (const [i2, j2] of indexlist) {
        const [idiff, jdiff] = [i - i2, j - j2];
        if (!(i === i2 && j === j2)) {
          counted_coords.add(`${i},${j}`);
          counted_coords.add(`${i2},${j2}`);
          let [newi, newj] = [i2 - idiff, j2 - jdiff];
          while (index_inbound([newi, newj], mut_lines)) {
            if (mut_lines[newi][newj] === ".") {
              mut_lines[newi][newj] = "#";
            }
            counted_coords.add(`${newi},${newj}`);
            newi = newi - idiff;
            newj = newj - jdiff;
          }
        }
      }
    }
  }
  mut_lines.forEach((s) => console.log(s.join("")));
  return counted_coords.size;
}

main();

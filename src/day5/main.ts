import { read_lines } from "../lib.mjs";

function main() {
  /*
29|13
97,29,75,13,47
47|13
97,29,75,47,13
75|29
97,75,29,47,13
47|29
97,75,47,29,13
*/
  const dummy_input = [
    "47|53",
    "97|13",
    "97|61",
    "97|47",
    "75|29",
    "61|13",
    "75|53",
    "29|13",
    "97|29",
    "53|29",
    "61|53",
    "97|53",
    "61|29",
    "47|13",
    "75|47",
    "97|75",
    "47|61",
    "75|61",
    "47|29",
    "75|13",
    "53|13",
    "",
    "75,47,61,53,29",
    "97,61,53,29,13",
    "75,29,13",
    "75,97,47,61,53",
    "61,13,29",
    "97,13,75,29,47",
  ];
  const input: string[] = read_lines(5);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]) {
  let result = 0;
  const rules: number[][] = lines
    .slice(
      0,
      lines.findIndex((e) => e === "")
    )
    .map((s) => s.split("|").map((e) => +e));
  const updates: number[][] = lines
    .slice(lines.findIndex((e) => e === "") + 1)
    .map((s) => s.split(",").map((e) => +e));
  updates.forEach((u) =>
    rules.every((r) => check_rule(u, r))
      ? (result += u[(u.length - 1) / 2])
      : null
  );
  return result;
}

function part2(lines: string[]) {
  let result = 0;

  const rules: number[][] = lines
    .slice(
      0,
      lines.findIndex((e) => e === "")
    )
    .map((s) => s.split("|").map((e) => +e));
  const updates: number[][] = lines
    .slice(lines.findIndex((e) => e === "") + 1)
    .map((s) => s.split(",").map((e) => +e));

  const incorrect_updates = updates.filter(
    (u) => !rules.every((r) => check_rule(u, r))
  );

  const fixed_updates = incorrect_updates.map((u) => fix_update(u, rules));

  fixed_updates.forEach((u) =>
    rules.every((r) => check_rule(u, r))
      ? (result += u[(u.length - 1) / 2])
      : null
  );
  return result;
}

function fix_update(update: number[], rules: number[][]): number[] {
  let fixed_update: number[] = update.slice();
  for (const rule of rules) {
    if (!check_rule(update, rule)) {
      fixed_update = swap_elements(update, rule[0], rule[1]);
      if (rules.every((r) => check_rule(update, r))) {
        return fixed_update;
      } else {
        return fix_update(fixed_update, rules);
      }
    }
  }
  return fixed_update;
}

function check_rule(update: number[], rule: number[]) {
  return (
    !update.includes(rule[0]) ||
    !update.includes(rule[1]) ||
    update.indexOf(rule[0]) < update.indexOf(rule[1])
  );
}

function swap_elements(update: number[], e1: number, e2: number) {
  let swapped = [];
  for (const e of update) {
    if (e === e2) swapped.push(e1);
    else if (e === e1) swapped.push(e2);
    else swapped.push(e);
  }
  return swapped;
}

main();

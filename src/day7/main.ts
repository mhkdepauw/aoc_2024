import { read_lines } from "../lib.mjs";

function main() {
  const dummy_input = [
    "190: 10 19",
    "3267: 81 40 27",
    "83: 17 5",
    "156: 15 6",
    "7290: 6 8 6 15",
    "161011: 16 10 13",
    "192: 17 8 14",
    "21037: 9 7 18 13",
    "292: 11 6 16 20",
  ];
  const input: string[] = read_lines(7);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}
function part1(lines: string[]) {
  let result = 0;
  const totals: number[] = lines.map((s) => +s.split(":")[0]);
  const equations: number[][] = lines.map((s) =>
    s
      .split(": ")[1]
      .split(" ")
      .map((e) => +e)
  );
  for (let i = 0; i < equations.length; i++) {
    if (try_equation(equations[i], totals[i]) === totals[i]) {
      result += totals[i];
    }
  }
  // lines.forEach((l, i) => console.log(totals[i], equations[i]));
  // split into list of totals and list of readings
  // try all possibilities for calculations
  // store value in result if possible to get total
  return result;
}

function try_equation(equation: number[], total: number): number {
  let current_total = equation[0];
  if (equation.length > 1) {
    let plus_equation = [...equation];
    plus_equation[0] += plus_equation.splice(1, 1)[0];

    if (try_equation(plus_equation, total) === total) {
      return total;
    } else {
      let times_equation = [...equation];
      times_equation[0] *= times_equation.splice(1, 1)[0];

      if (try_equation(times_equation, total) === total) {
        return total;
      }
    }
    return -1;
  }
  return current_total;
}

function part2(lines: string[]) {
  let result = 0;
  const totals: number[] = lines.map((s) => +s.split(":")[0]);
  const equations: number[][] = lines.map((s) =>
    s
      .split(": ")[1]
      .split(" ")
      .map((e) => +e)
  );
  for (let i = 0; i < equations.length; i++) {
    if (try_equation_2(equations[i], totals[i]) === totals[i]) {
      result += totals[i];
    }
  }
  return result;
}

function try_equation_2(equation: number[], total: number): number {
  let current_total = equation[0];
  if (equation.length > 1) {
    let plus_equation = [...equation];
    plus_equation[0] += plus_equation.splice(1, 1)[0];

    if (try_equation_2(plus_equation, total) === total) {
      return total;
    } else {
      let times_equation = [...equation];
      times_equation[0] *= times_equation.splice(1, 1)[0];

      if (try_equation_2(times_equation, total) === total) {
        return total;
      } else {
        let concat_equation = [...equation];
        concat_equation[0] =
          +`${concat_equation[0]}${concat_equation.splice(1, 1)[0]}`;
        if (try_equation_2(concat_equation, total) === total) {
          return total;
        }
      }
    }
    return -1;
  }
  return current_total;
}

main();

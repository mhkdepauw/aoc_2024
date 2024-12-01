import { read_lines, read_lines_as_num, read_lines_as_num_arrays } from "../lib.mjs";

function main() {
    const input: string[] = read_lines(0);
    console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]): number{
    let result = 0;
    const line_arrays = lines.map(e => e.split('').filter(e2 => e2.replace(/(\D)*/gm,"")));
    for (const line of line_arrays.map(e => e.map(e2 => +e2))) {
        console.log(line);
        result += line[0]*10 + line[line.length - 1];
    }
    return result;
}

function part2(lines: string[]){}

main();
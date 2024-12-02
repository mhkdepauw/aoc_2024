import { read_lines, read_lines_as_num, read_lines_as_num_arrays } from "../lib.mjs";

function main() {
    const dummy_input = 
    ["two1nine",
    "eightwothree",
    "abcone2threexyz",
    "xtwone3four",
    "4nineeightseven2",
    "zoneight234",
    "7pqrstsixteen"]
    
    const input: string[] = read_lines(0);
    console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]): number{
    let result = 0;
    const line_arrays = lines.map(e => e.split('').filter(e2 => e2.replace(/(\D)*/gm,"")));
    for (const line of line_arrays.map(e => e.map(e2 => +e2))) {
        result += line[0]*10 + line[line.length - 1];
    }
    return result;
}

function part2(lines: string[]){
    let result = 0;
    let new_lines: string[] = [];
    const numbers = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
    for (const line of lines) {
        let new_line = line;
        line.matchAll(/(one|two|three|four|five|six|seven|eight|nine)/gm);
        for (const match of line.matchAll(/(one|two|three|four|five|six|seven|eight|nine)/gm)) {
            new_line = new_line.replace(match[0], numbers.indexOf(match[0]).toString());
        }
        new_lines.push(new_line);
    }
    return new_lines;
}

main();
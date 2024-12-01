import { readFileSync } from "fs";

export function read_lines(day:number):string[] {
    return readFileSync(`src/day${day}/input.txt`, 'utf-8').split('\n');
}

export function read_lines_as_num(day:number):number[] {
    return read_lines(1).map(e => +e);
}
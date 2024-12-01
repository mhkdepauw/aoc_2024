import { readFileSync } from "fs";

export function read_lines(day:number):string[] {
    return readFileSync(`src/day${day}/input.txt`, 'utf-8').split('\n');
}
import { readFileSync } from "fs";

export function read_lines(day:number):string[] {
    return readFileSync(`src/day${day}/input.txt`, 'utf-8').split('\n');
}

export function read_lines_as_num(day:number):number[] {
    let lines = read_lines(day).map(e => e.split('').filter(e2 => e2.replace(/(\D)*/gm,"")).join(''));
    return lines.map(e => +e);
}
import { readFileSync } from "fs";

export function read_lines(day:number):string[] {
    return readFileSync(`src/day${day}/input.txt`, 'utf-8').split('\n');
}

export function read_lines_split_on_space_string(day:number):string[][] {
    return read_lines(day).map(e => e.split(' '));
}

export function read_lines_split_on_space_num(day:number):number[][] {
    return read_lines(day).map(e => e.split(' ').map(e2 => +e2));
}

export function read_lines_as_num(day:number):number[] {
    let lines = read_lines(day).map(e => e.split('').filter(e2 => e2.replace(/(\D)*/gm,"")).join(''));
    return lines.map(e => +e);
}

export function read_lines_as_num_arrays(day: number):number[][] {
    let lines = read_lines(day).map(e => e.split('').filter(e2 => e2.replace(/(\D)*/gm,"")));
    return lines.map(e => e.map(e2 => +e2));
}
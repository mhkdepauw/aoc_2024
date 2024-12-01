import { Console } from 'console';
import { readFileSync } from 'fs';
import { read_lines } from '../lib.mjs';

function main() {
    const input: string[] = read_lines(1);
    console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: string[]): number {
    let result = 0;
    let left_list = [];
    let right_list = [];
    for (const line of lines){
        const line_list = line.split("   ",2).map(e => +e);
        left_list.push(line_list[0]);
        right_list.push(line_list[1]);
    }
    for (let i = 0; i < lines.length; i++){
        const left_min = Math.min(...left_list);
        const right_min = Math.min(...right_list);
        result += Math.abs(left_min - right_min);
        left_list.splice(left_list.findIndex(e => e === left_min),1);
        right_list.splice(right_list.findIndex(e => e === right_min),1);
    }
    return result;
}

function part2(lines: string[]):number {
    let result = 0;
    let left_list: number[] = [];
    let right_list: number[] = [];
    for (const line of lines){
        const line_list = line.split("   ",2).map(e => +e);
        left_list.push(line_list[0]);
        right_list.push(line_list[1]);
    }
    for (const num of left_list){
        result += num*right_list.filter(e => e===num).length
    }

    return result;
}

main()
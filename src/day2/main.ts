import { read_lines, read_lines_split_on_space, read_lines_split_on_space_num, read_lines_split_on_space_string } from "../lib.mjs";


function main() {
    const dummy_input = 
    [
    "7 6 4 2 1",
    "1 2 7 8 9",
    "9 7 6 2 1",
    "1 3 2 4 5",
    "8 6 4 4 1",
    "1 3 6 7 9"
    ]
    const input: number[][] = read_lines_split_on_space_num(2);
    console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}

function part1(lines: number[][]) {
    let result = 0;
    for (const line of lines){
        // let safe:boolean = true;
        // for (let i = 0; i<line.length -1 ;i++) {
        //     const diff = Math.abs(line[i]-line[i+1]);
        //     if (diff < 1 || diff > 3) {
        //         safe = false;
        //     }        
        // }
        const safe = line.every((_,i,arr) => i === 0 || (3>=Math.abs(arr[i]-arr[i-1]) && Math.abs(arr[i]-arr[i-1]) > 0));
        const othersafe = line.every((_,i, arr) => i === 0 || arr[i] > arr[i-1]) || line.every((_,i, arr) => i === 0 || arr[i] < arr[i-1])
        if (isSafe(line)) {
            result += 1
        }
    }
    return result;
}

function part2(lines: number[][]) {
    let result = 0;
    for (const line of lines) {
        if (isSafe(line)) result += 1
        else {
            let safe = false
            for (let i = 0;i<line.length ;i++) {
                let new_line = line.slice();
                new_line.splice(i,1);
                if (isSafe(new_line)){
                    safe = true;
                    console.log(new_line);
                    break;
                }
            }
            if (safe){
                result += 1;
            }
        }
    }
    return result;
}

function isSafe(report: number[]) {
    const safe = report.every((_,i,arr) => i === 0 || (3>=Math.abs(arr[i]-arr[i-1]) && Math.abs(arr[i]-arr[i-1]) > 0));
    const othersafe = report.every((_,i, arr) => i === 0 || arr[i] > arr[i-1]) || report.every((_,i, arr) => i === 0 || arr[i] < arr[i-1])
    return safe && othersafe;
}

main();
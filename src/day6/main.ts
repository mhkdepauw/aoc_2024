import { error } from "console";
import { read_lines } from "../lib.mjs";
import { posix } from "path";

function main() {

  const dummy_input = [
    "....#.....",
    ".........#",
    "..........",
    "..#.......",
    ".......#..",
    "..........",
    ".#..^.....",
    "........#.",
    "#.........",
    "......#...",
    
  ];
  const input: string[] = read_lines(6);
  console.log(`part 1: ${part1(input)}\npart 2: ${part2(input)}`);
}
function part1(lines: string[]) {
  let result = 0;
  let mut_lines = lines.map(s => s.split(''));
  while (!mut_lines.every(l => l.every(e => e === '.' || e === '#' || e === 'X'))){
    // mut_lines.forEach(s => console.log(s.join('')));
    // console.log("AAAAAAAAAAAAAAA")
    //console.log((mut_lines.map(l => l.join(''))));

    // let current_dir:string = mut_lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>'))!.find(e => e !== '.' && e !== '#' && e !== 'X')!;
    // let guard_i:number = mut_lines.findIndex(s => s.includes(current_dir));
    // let guard_j:number = mut_lines[guard_i].indexOf(current_dir);
    // let move_to_i = guard_i;
    // let move_to_j = guard_j;
    // switch (current_dir) {
    //   case 'v':
    //     if (move_to_i+1<mut_lines.length){
    //       move_to_i += 1;
    //     }
    //     break;

    //   case '^':
    //     if (move_to_i-1>=0){
    //       move_to_i -= 1;
    //     }
    //     break;

    //   case '<':
    //     if (move_to_j-1>=0){
    //       move_to_j -= 1;
    //     }
    //     break;

    //   case '>':
    //     if (move_to_j+1<mut_lines[move_to_i].length){
    //       move_to_j += 1;
    //     }
    //     break;

    //   default:
    //     break;
    // }
    // if (mut_lines[move_to_i][move_to_j] !== '#'){
    //   mut_lines[guard_i][guard_j] = "X";
    //   if (guard_i !== move_to_i || guard_j !== move_to_j){
    //   mut_lines[move_to_i][move_to_j] = current_dir;
    //   }
    // }
    // else{
    //   mut_lines[guard_i][guard_j] = turn_right(current_dir);
    // }
    mut_lines = walk(mut_lines);
  }
  // mut_lines.forEach(s => console.log(s.join('')));
    return mut_lines.map(l => l.filter(e => e === "X").join("")).join("").length;
}

function turn_right(current_dir:string):string{
  let new_dir = '';
  switch (current_dir) {
    case 'v':
      new_dir = '<'
      break;

    case '^':
      new_dir = '>'
      break;

    case '<':
      new_dir = '^'
      break;

    case '>':
      new_dir = 'v'
      break;
  
    default:
      throw Error;
  }
  return new_dir;
}

function part2(lines: string[]) {
  let result = 0;
  let mut_lines = lines.map(s => s.split(''));
  let possible_lines = JSON.parse(JSON.stringify(mut_lines));
  while (!possible_lines.every(l => l.every(e => e === '.' || e === '#' || e === 'X'))){
  walk(possible_lines);
  }
  const org_dir = mut_lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>'))!.find(e => e !== '.' && e !== '#' && e !== 'X')!;
  const org_i = mut_lines.findIndex(s => s.includes(org_dir));
  const org_j = mut_lines[org_i].indexOf(org_dir);
  for (let i = 0; i<mut_lines.length; i++){
    for(let j = 0; j<mut_lines[i].length; j++){
      console.log(i,j);
      if (mut_lines[i][j] === '.' && possible_lines[i][j] === 'X'){
        let new_lines = JSON.parse(JSON.stringify(mut_lines));
        new_lines[i][j] = '#';
        // console.log(i,j);
        // new_lines.forEach(s => console.log(s.join('')));
        // console.log("AAAAAAAAAAAAAAA")
        let obstacles:number[][] = [];
        new_lines.forEach((l,li) => l.forEach((e,ej) => e === '#' ? obstacles.push([li, ej]): null));
        const bounds = [mut_lines.length, mut_lines[i].length]
        let walksoffmap = false;

        // const org_dir = new_lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>'))!.find(e => e !== '.' && e !== '#' && e !== 'X')!;
        // const org_i = new_lines.findIndex(s => s.includes(org_dir));
        // const org_j = new_lines[org_i].indexOf(org_dir);

        let previous_positions:(string | number)[][] = [];
        let curr_dir = org_dir;
        let curr_i = org_i;
        let curr_j = org_j;
        while (!walksoffmap && !(previous_positions.some(l => l[0] === curr_dir && l[1] === curr_i && l[2] === curr_j))){
          previous_positions.push([curr_dir,curr_i,curr_j]);
          const walkoutput = fake_walk(curr_dir, curr_i, curr_j,obstacles,bounds);
          // console.log(walkoutput);
          curr_dir = walkoutput[0];
          curr_i = walkoutput[1];
          curr_j = walkoutput[2];
          walksoffmap = Boolean(walkoutput[3]);
          // new_lines = walk(new_lines);
          // new_lines.forEach(s => console.log(s.join('')));
          // console.log("AAAAAAAAAAAAAAA");
          // if(new_lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>')) === undefined) break;
          // curr_dir = new_lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>'))!.find(e => e !== '.' && e !== '#' && e !== 'X')!;
          // curr_i = new_lines.findIndex(s => s.includes(curr_dir));
          // curr_j = new_lines[curr_i].indexOf(curr_dir);
          // console.log(previous_positions, curr_dir, curr_i, curr_j);
        }
        // new_lines.forEach(s => console.log(s.join('')));
        // console.log("AAAAAAAAAAAAAAA");
        if (previous_positions.some(l => l[0] === curr_dir && l[1] === curr_i && l[2] === curr_j) && !walksoffmap){
          // new_lines.forEach(s => console.log(s.join('')));
          // console.log("AAAAAAAAAAAAAAA");
          result += 1;
        }
        // see if he loops and increment if he does
      }
    }
  }
  // try every empty spot to see if he loops
  // count when he does loop
  return result;
}

function walk(lines: string[][]):string[][]{
  let current_dir:string = lines.find(s => s.includes('v') || s.includes('^') || s.includes('<') || s.includes('>'))!.find(e => e !== '.' && e !== '#' && e !== 'X')!;
    let guard_i:number = lines.findIndex(s => s.includes(current_dir));
    let guard_j:number = lines[guard_i].indexOf(current_dir);
    let move_to_i = guard_i;
    let move_to_j = guard_j;
    switch (current_dir) {
      case 'v':
        if (move_to_i+1<lines.length){
          move_to_i += 1;
        }
        break;

      case '^':
        if (move_to_i-1>=0){
          move_to_i -= 1;
        }
        break;

      case '<':
        if (move_to_j-1>=0){
          move_to_j -= 1;
        }
        break;

      case '>':
        if (move_to_j+1<lines[move_to_i].length){
          move_to_j += 1;
        }
        break;

      default:
        break;
    }
    if (lines[move_to_i][move_to_j] !== '#'){
      lines[guard_i][guard_j] = "X";
      if (guard_i !== move_to_i || guard_j !== move_to_j){
      lines[move_to_i][move_to_j] = current_dir;
      }
    }
    else{
      lines[guard_i][guard_j] = turn_right(current_dir);
    }
    return lines;
}

function fake_walk(curr_dir: string, curr_i: number, curr_j: number, obstacle_co: number[][], bounds: number[]){
  let walksoffmap = false;
  let next_dir = curr_dir;
  let next_i = curr_i;
  let next_j = curr_j;
  switch (curr_dir) {
    case 'v':
      if (next_i+1<bounds[0]){
        next_i += 1;
      }
      break;

    case '^':
      if (next_i-1>=0){
        next_i -= 1;
      }
      break;

    case '<':
      if (next_j-1>=0){
        next_j -= 1;
      }
      break;

    case '>':
      if (next_j+1<bounds[1]){
        next_j += 1;
      }
      break;

    default:
      break;
  }
  if (!obstacle_co.some(l => l[0] === next_i && l[1] === next_j)){
    if (curr_i === next_i && curr_j === next_j){
    walksoffmap = true;
    }
    // what if it's gonna walk off the map
  }
  else{
    next_dir = turn_right(curr_dir);
    next_i = curr_i;
    next_j = curr_j;
  }
  return [next_dir, next_i, next_j, walksoffmap]
}

main();
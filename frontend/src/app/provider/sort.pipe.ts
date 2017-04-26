import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform {

    transform(array:Array<any>, args:string, args2:string):Array<string> {
        array.sort((a:any, b:any) => {
            if (args2) {
                if (a[args][args2] < b[args][args2]) {
                    return -1;
                } else if (a[args][args2] > b[args][args2]) {
                    return 1;
                } else {
                    return 0;
                }
            } else {
                if (a[args] < b[args]) {
                    return -1;
                } else if (a[args] > b[args]) {
                    return 1;
                } else {
                    return 0;
                }
            }
        });
        return array;
    }
}
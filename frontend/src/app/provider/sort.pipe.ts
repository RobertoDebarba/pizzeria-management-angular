import {Pipe, PipeTransform} from "@angular/core";

@Pipe({name: 'sortBy'})
export class SortByPipe implements PipeTransform {

    transform(array:Array<any>, args:string, args2:string, args3:string):Array<string> {
            console.log(args3);
        if (array == null) {
            return array;
        }

        array.sort((a:any, b:any) => {
            if(!args3){
                var aux:any = a;
                a = b;
                b = aux;
            }
            console.log(args3);

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
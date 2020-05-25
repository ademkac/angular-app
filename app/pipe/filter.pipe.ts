import { Pipe, PipeTransform } from '@angular/core';



@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

 

  transform(value: any, filterString: string ): any {
    if (value.length === 0 || filterString === ''){
      return value;
    }
    console.log(filterString);
    const resultArray = []
    for (let i=0; i<value.length; i++){
      console.log(value[i].name)
      
      if (value[i].name.includes(filterString)){
        resultArray.push(value[i]);
        
      }
    }
    return resultArray;
  }

}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
avg=0;
precents=0;
  constructor() { }
  getAvg(myData:any[]) {
    let sum = 0;
    myData.forEach(element => {
      sum+=element.score;
    });
    this.avg = sum / myData.length;
  }
  getPrecents(myData:any[]) {
    let countMade = 0;
    myData.forEach(element => {
      if (element.madeDadeline)
        countMade++;
    });
   this.precents = (countMade/myData.length)*100;
  }
}

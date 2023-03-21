import { Component, ViewChild,ChangeDetectorRef  } from '@angular/core';
import { ResponseDetails } from '../response-details';
import { GetDetailsService } from '../get-details.service';
import { loginService } from '../login.service';
import { MatSort, MatSortable } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-user-projects',
  templateUrl: './user-projects.component.html',
  styleUrls: ['./user-projects.component.css']
})
export class UserProjectsComponent { 
  apiUrl = 'https://localhost:7231/Projects/getProject';
  @ViewChild(MatSort, {static: true}) sort!: MatSort;
  public dataSource = new MatTableDataSource<ResponseDetails>();
  displayedColumns:string[]=[
    'id',
    'name',
    'score',
    'durationInDays',
    'bugsCount',
    'madeDadeline',   
];

  myData!: ResponseDetails[];
  filteredItems!: ResponseDetails[];
  searchTerm: string = '';
  selectedColumn:string='';
  filterValue:string='';
  avg: number = 0;
  precents: number = 0;
  result:boolean=false;
  constructor(private loginService: loginService,private getDetailsService: GetDetailsService,private cd :ChangeDetectorRef) {
   };
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
  sortTable() {
    let sortState: MatSortable = {
      id: this.selectedColumn,
      start: 'asc',
      disableClear: false
    };
    this.dataSource.sort?.sort(sortState);
  }
  ngOnInit(){
    this.getDetailsService.getDetails(this.apiUrl,this.loginService.getToken()).subscribe(
      data => {
        this.myData = data;
        this.filteredItems = this.myData;
        this.dataSource.data =  JSON.parse(JSON.stringify(data));
        this.result=true;
        this.avg=this.getAvg();
        this.precents=this.getPrecents();
        console.log(this.myData);
        this.cd.markForCheck();
      },
      error => {
        console.log(error);
      }
    );
   
  }
  getAvg() {
    let sum = 0;
    this.dataSource.filteredData.forEach(element => {
      sum+=element.score;
    });
    return sum / this.dataSource.filteredData.length;
  }
  getPrecents() {
    let countMade = 0;
    this.dataSource.filteredData.forEach(element => {
      if (element.madeDadeline)
        countMade++;
    });
   return (countMade/this.dataSource.filteredData.length)*100;
  }
  // applyFilter() {
  //   this.filteredItems = this.myData.filter(item => {
  //     item.name.toLowerCase().includes(this.searchTerm.toLowerCase());
  //   });
  // }
  applyFilter(event: Event) 
  {
    this.filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = this.filterValue.trim().toLowerCase();
    this.avg = this.getAvg();
    this.precents = this.getPrecents();
    this.cd.markForCheck();
  }
 
// }=> {
//     this.dataSource.filter = value.trim().toLocaleLowerCase();
//   }

}


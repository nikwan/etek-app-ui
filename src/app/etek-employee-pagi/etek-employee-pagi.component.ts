import { Component, Input, OnInit, ViewChild} from '@angular/core';
import { SearchBean } from '../services/SearchBean';
import {MatTableDataSource} from '@angular/material/table';
import { SearchWithPagiService } from '../services/search-with-pagi.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { SearchBeanWrapper } from '../services/SearchBeanWrapper';
import { Router } from '@angular/router';

@Component({
  selector: 'app-etek-employee-pagi',
  templateUrl: './etek-employee-pagi.component.html',
  styleUrls: ['./etek-employee-pagi.component.css']
})
export class EtekEmployeePagiComponent implements OnInit {

  displayedColumns = ['id', 'name', 'company', 'status', 'salary', 'email', 'phone', 'update', 'delete'];
  dataSource: MatTableDataSource<SearchBean>;
  searchInput: string;
  //searchBean: SearchBean[];
  totalRecords: number;
  searchInput1: string;
  showPages: boolean;
  
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;
  
  ngAfterViewInit() {
    //this.dataSource.paginator = this.paginator;
    
  }

  constructor(private service: SearchWithPagiService, private router: Router) { 
    const s: SearchBean[] = [];
    this.searchInput = '';
    //this.searchBean = [];
    this.totalRecords = 0;
    this.searchInput1 = '';
    this.showPages = false;
    
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(s);

    //this.paginator = this.dataSource.paginator;
  }

  ngOnInit(): void {
    //this.searchInput = 'S';
    this.totalRecords = 0;
  }

  searchWithPagi(si: string){
    
    console.log('search input:' + si);
    console.log('@inside searchWithPagi');

    this.showPages = true;
    
    //this.searchInput = si;

    this.service.searchWithPagi(this.searchInput).subscribe( (d) => {
      console.log('d:' + d);
      console.log('after search call');
      this.dataSource.data = d;

    });

    //this.paginator.length = 10;
    //console.log(this.searchBean.length)
    //this.dataSource.data = this.searchBean;

    //console.log('this.paginator.pageIndex:' + this.dataSource.paginator.pageIndex);
    //console.log('this.paginator.pageSize:' + this.dataSource.paginator.pageSize);
    //console.log('this.paginator.length:' + this.dataSource.paginator.length);

  }

  searchWithServerPagi(){
    console.log('search input:' + this.searchInput);
    console.log('@inside searchWithServerPagi');    
    //this.searchInput = si;
    this.showPages = true;
    console.log("this.paginator.pageSize :", this.paginator?.pageSize);
    console.log("this.paginator.pageIndex :", this.paginator?.pageIndex);
    let currentPage = this.paginator?.pageIndex ?? 0;
    let pageSize = this.paginator?.pageSize ?? 0;

    this.service.searchWithServerPagi(this.searchInput, pageSize, currentPage).subscribe( (d: SearchBeanWrapper) => {
      this.dataSource.data = d.searchResult;
      //this.dataSource.paginator.length = d.totalRecords;
      this.totalRecords = d.totalRecords;     

    });

   
    //this.totalRecords = 31;
    //this.dataSource.paginator.length = 31;
    console.log('this.totalRecords:' + this.totalRecords)
    //this.paginator.length = 10;
    //console.log('this.dataSource.paginator.length:' + this.dataSource.pagin)
  }

  searchBlur(){
    console.log('on blur:');
    this.paginator.pageIndex = 0;
  }

  updateEmployee(id:number){
    console.log('id:' + id);
    console.log('@inside updateEmployee');     
    this.router.navigate(['/update', id]);
   
  }

  deleteEmployee(id:number){
    console.log('id:' + id);
    console.log('@inside delete');     
    this.router.navigate(['/update', id]);
   
  }

}

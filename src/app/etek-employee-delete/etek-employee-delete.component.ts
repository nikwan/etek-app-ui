import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';

@Component({
  selector: 'app-etek-employee-delete',
  templateUrl: './etek-employee-delete.component.html',
  styleUrls: ['./etek-employee-delete.component.css']
})
export class EtekEmployeeDeleteComponent implements OnInit {

  constructor(private route: ActivatedRoute, private etekEmpService: SearchWithPagiService) { }

  id:any;
  msg:string = '';
  sts:number = -1;
  ngOnInit(): void {
  }

  onSubmit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.etekEmpService.deleteEmployee(this.id).subscribe((resp) => {
      console.log("response for delete product:" + resp.status);
      this.msg = resp.msg;
      this.sts = resp.status;
    });
  }
}

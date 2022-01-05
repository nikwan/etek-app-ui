import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EmployeeBean } from '../services/Employee';
import { SearchWithPagiService } from '../services/search-with-pagi.service';

@Component({
  selector: 'app-etek-employee-update',
  templateUrl: './etek-employee-update.component.html',
  styleUrls: ['./etek-employee-update.component.css']
})
export class EtekEmployeeUpdateComponent implements OnInit, AfterViewInit {

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private etekEmpService: SearchWithPagiService) {

   }

  id:any;
  msg:string = '';
  sts:number = -1;

  updateForm = this.fb.group({
    id: ['', Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: ['', Validators.required],
    salary: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.etekEmpService.getEmployee(this.id).subscribe((e: EmployeeBean) => {
      console.log(e.firstName);
      this.updateForm.patchValue({
        id: e.employeeId,
        firstName: e.firstName,
        lastName: e.lastName,
        companyName: e.lastName,
        salary: e.salary,
        email: e.email,
        phoneNumber: e.phoneNumber
      });
    });
  }

  ngAfterViewInit(){
    
  }

  onSubmit() {
    console.log('Thanks! ' + JSON.stringify(this.updateForm.value));
    //this.productService.updateProduct(this.updateForm.value).subscribe((resp) =>{
     // console.log("response for update product " + resp);
      //this.router.navigate(["home/products"]);
    //});

    this.etekEmpService.updateEmployee(this.updateForm.value).subscribe((resp) => {
      console.log("response for update product:" + resp.status);
      this.msg = resp.msg;
      this.sts = resp.status;
    });
  }

}

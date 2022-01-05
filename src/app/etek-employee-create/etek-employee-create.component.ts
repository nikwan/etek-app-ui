import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';

@Component({
  selector: 'app-etek-employee-create',
  templateUrl: './etek-employee-create.component.html',
  styleUrls: ['./etek-employee-create.component.css']
})
export class EtekEmployeeCreateComponent implements OnInit {
  msg:string = '';
  sts:number = -1;

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private etekEmpService: SearchWithPagiService) { }

  updateForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    companyName: ['', Validators.required],
    salary: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required]
  });

  ngOnInit(): void {
    
    
  }

  ngAfterViewInit(){
    
  }

  onSubmit() {
    console.log('Thanks! ' + JSON.stringify(this.updateForm.value));
    //this.productService.updateProduct(this.updateForm.value).subscribe((resp) =>{
     // console.log("response for update product " + resp);
      //this.router.navigate(["home/products"]);
    //});

    this.etekEmpService.addEmployee(this.updateForm.value).subscribe((resp) => {
      console.log("response addEmployee employee:" + resp.status);
      this.msg = resp.msg;
      this.sts = resp.status;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';
import { OtpService } from '../services/otp/otp.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit {

  msg:string = '';
  sts:number = -1;
  isLoading = false;

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private etekEmpService: SearchWithPagiService, private otpService: OtpService) { }

  updateForm = this.fb.group({
    adr: ['', Validators.required]
    //lastName: ['', Validators.required],
    
  });


  ngOnInit(): void {
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

  otp() {
    console.log('Thanks! ' + JSON.stringify(this.updateForm.value));
    //this.productService.updateProduct(this.updateForm.value).subscribe((resp) =>{
     // console.log("response for update product " + resp);
      //this.router.navigate(["home/products"]);
    //});

    this.otpService.otp(this.updateForm.value).subscribe((resp) => {
      console.log("otp_success:" + resp.success);
      this.isLoading = true;
      if(resp.success){
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
        this.poll('otp');
      }else{
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
      }
      
    });
  }

  poll(type: string) {
    console.log('poll! ');
    
    this.otpService.poll(type).subscribe((resp) => {
      console.log("otp_success:" + resp.success);
      if(resp.success){
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
        this.isLoading = false;
      }else{
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
      }
      
    });
  }

}

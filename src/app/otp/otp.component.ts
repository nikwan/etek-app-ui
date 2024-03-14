import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';
import { OtpService } from '../services/otp/otp.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ECCPoll } from '../models/eccpoll';
import { Subscription, interval, timer } from 'rxjs';
import { filter, repeat, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { EccResult } from '../models/ecc-result';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OtpComponent implements OnInit, OnDestroy {

  msg:string = '';
  sts:number = -1;
  isLoading = false;
  eccPoll: ECCPoll;
  timer!: Subscription;
  repeatAttemptLimit = 5;
  exceedAttemptLimit = 0;
  pollInterval = 3000;
  rid = '';

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private etekEmpService: SearchWithPagiService, private otpService: OtpService) { 
    this.eccPoll = {msg: '', rc: 0, sts: 1, ti: '', ec:'',rid: '', type: 'otp'};
  }

  updateForm = this.fb.group({
    adr: ['', Validators.required]
    //lastName: ['', Validators.required],
    
  });

    
  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    console.log('ECC POLLING SERVICE DESTROYED');
    this.timer.unsubscribe();
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
    this.exceedAttemptLimit = 0;

    this.otpService.otp(this.updateForm.value).subscribe((resp) => {
      console.log("otp_success:" + resp.success);
      this.isLoading = true;
      if(resp.success){
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
        this.rid = resp.result.rid;
        //this.poll('otp');
        this.pollWithInterval('otp', this.pollInterval, this.rid);
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
        this.eccPoll = resp.result;
        this.isLoading = false;
      }else{
        this.msg = resp.result.msg;
        this.sts = resp.result.sts;
      }
      
    });
  }

  pollWithInterval(type: string, delay: number, rid: string) {
    console.log('pollWithInterval! ');

    this.timer = timer(2000,delay)
    .pipe(
      switchMap( () => this.otpService.pollWithInterval(type, delay, rid)),
      repeat(this.repeatAttemptLimit),
      takeWhile(d => this.chkSts(d)),
      //filter( d => d.result.)
      )
      .subscribe((resp) => {
        console.log("_pollWithIntervalotp_success:" + resp.success);
        //this.chkSts(resp);
      });
      
    }

    chkSts(resp: EccResult<ECCPoll>) {
      console.log('pollWithInterval:sts' + resp.result.sts);
      this.exceedAttemptLimit++;
      if(resp.result.sts === 0){
        this.msg = resp.result.msg + ' Attempt(s) remaining for OTP is ' + resp.result.rc;
        this.sts = resp.result.sts;
        this.eccPoll = resp.result;
        this.isLoading = false;
        return false;          
      }else if(this.exceedAttemptLimit > this.repeatAttemptLimit){
        this.msg = "seems taking longer than expeceted! do you want to check the status again? please click here"
        this.sts = 1;
        this.isLoading = false;
        return false;
      }else{
        console.log('exceedAttemptLimit:' + this.exceedAttemptLimit);
        this.msg = resp.result.msg;
        return true;
      }
    }   
}

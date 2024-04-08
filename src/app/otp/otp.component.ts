import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';
import { OtpService } from '../services/otp/otp.service';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { ECCPoll } from '../models/eccpoll';
import { Subscription, interval, throwError, timer } from 'rxjs';
import { filter, repeat, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { EccResult } from '../models/ecc-result';
import { ASPDetailsModel } from '../models/otp/aspdetails-model';
import { HttpErrorResponse } from '@angular/common/http';

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
  otpResendTimeout = 5000;
  rid = 'SGGVHEMQNY1712566322359';
  stillLoading = false;
  resend = false;
  //aspDtl: ASPDetailsModel;
  aspName = '';
  aspId = '';
  longText = ``;
  errMsg = 'error ocurred while processing requests';
  lt = ``;
  txn = '';
  

  constructor(private route: ActivatedRoute, private fb:FormBuilder, private etekEmpService: SearchWithPagiService, private otpService: OtpService) { 
    this.eccPoll = {msg: '', rc: 0, sts: 1, ti: '', ec:'',rid: '', type: 'otp'};
    //this.aspDtl = {};
  }

  updateForm = this.fb.group({
    adr: ['', Validators.required],
    rid: ['', Validators.required]
    
  });

    
  ngOnInit(): void {
    this.isLoading = true;
    this.otpService.esignTest(this.rid).subscribe((resp) => {
      console.log("response esignTest");
      this.updateForm.controls['rid'].setValue(this.rid);
      if(resp.success){
        this.isLoading = false;
        this.pollInterval = resp.result.conf.pollInterval;
        this.otpResendTimeout = resp.result.conf.otpResendTimeout;
        this.repeatAttemptLimit = resp.result.conf.repeatAttemptLimit;
        this.aspName = resp.result.aspName;
        this.aspId = resp.result.aspId;
        this.lt = resp.result.lt;
        this.txn = resp.result.txn;
      }else{
        this.isLoading = false;
        //this.msg = resp.result.msg;
      }
           
    }, (err) => {this.handleError(err);}) ;
  }

  ngOnDestroy(): void {
    console.log('ECC POLLING SERVICE DESTROYED');
    //this.timer.unsubscribe();
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
    this.resend = false;
    this.timer = timer(2000,delay)
    .pipe(
      switchMap( () => this.otpService.pollWithInterval(type, delay, rid)),
      repeat(this.repeatAttemptLimit),
      takeWhile(d => this.chkSts(d)),
      //filter( d => d.result.)
      )
      .subscribe((resp) => {
        console.log("subscribe_success:" + resp.success);
        //this.chkSts(resp);
      }).add(
        () => {
          console.info('resend time ok:', this.resend);
          timer(this.otpResendTimeout).subscribe((val) => {
              console.log('timer to enable resend', val);
              this.resend = true;
          });
      }
      );
      
    }

    chkSts(resp: EccResult<ECCPoll>) {
      console.log('pollWithInterval:sts' + resp.result.sts);
      this.exceedAttemptLimit++;
      if(resp.result.sts === 1){
        this.msg = resp.result.msg + ' Attempt(s) remaining for OTP is ' + resp.result.rc;
        this.sts = resp.result.sts;
        this.eccPoll = resp.result;
        this.isLoading = false;
        return false;          
      }else if(this.exceedAttemptLimit > this.repeatAttemptLimit){
        this.msg = "seems taking longer than expeceted! do you want to check the status again? please click here"
        this.sts = 0;
        this.isLoading = false;
        return false;
      }else{
        console.log('exceedAttemptLimit:' + this.exceedAttemptLimit);
        this.msg = resp.result.msg;
        return true;
      }
    }
    
    cancel(){
      console.log('cancel:rid' + this.rid);
    }

    private handleError(error: HttpErrorResponse) {
      this.isLoading = false;
      this.msg = this.errMsg;
      this.sts = 0;
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        console.error('An error occurred:', error.error);
      } else if(error.status === 401){
        this.msg = 'unauthorised operation performed!';
      }else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong.
        console.error(
          `Backend returned code ${error.status}, body was: `, error.error);
      }
      // Return an observable with a user-facing error message.
      return throwError(() => new Error('Something bad happened; please try again later.'));
    }
}

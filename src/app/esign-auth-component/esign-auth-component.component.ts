import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchWithPagiService } from '../services/search-with-pagi.service';
import { OtpService } from '../services/otp/otp.service';
import { PollAuthService } from '../auth/poll-auth-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthModel } from '../models/auth/auth-model';
import { Subscription, interval, throwError, timer } from 'rxjs';
import { filter, repeat, switchMap, takeUntil, takeWhile } from 'rxjs/operators';
import { EccResult } from '../models/ecc-result';

@Component({
  selector: 'app-esign-auth-component',
  templateUrl: './esign-auth-component.component.html',
  styleUrls: ['./esign-auth-component.component.css']
})
export class EsignAuthComponentComponent implements OnInit, OnDestroy  {

  router: Router;
  activatedRoute: ActivatedRoute;
  rid:any;
  isLoading = false;
  auth!: AuthModel;
  timer!: Subscription;
  repeatAttemptLimit = 5;
  exceedAttemptLimit = 0;
  msg:string = 'your request is in process...';
  sts:number = 0;
  
  constructor(router: Router, private route: ActivatedRoute, private fb:FormBuilder, private authService:PollAuthService) {
    this.router = router;
    this.activatedRoute = route;
    this.rid = '';
  }

  ngOnInit(): void {
    this.rid = this.route.snapshot.paramMap.get('rid');
    console.log('routing...', this.rid);
    //this.router.navigate(["/otp", this.rid], {state: {rid: this.rid}});
    //this.isLoading = true;
    this.pollAuthWithInterval("ESAUTH", 1000, this.rid);
  }

  pollAuthWithInterval(type: string, delay: number, rid: string) {
    console.log('pollAuthWithInterval');
    this.isLoading = true;
    this.timer = timer(1000,delay)
    .pipe(
      switchMap( () => this.authService.pollAuth(rid, type)),
      repeat(3),
      takeWhile(d => this.chkSts(d)))
      .subscribe( {
        next: resp => this.update(resp),
        error: err => {console.error('Observable emitted an error: ' + err)},
        complete: () => this.redirectOtp()
      });
  }
      
    update(resp: EccResult<AuthModel>){
      this.msg = resp.result.msg;
      this.sts = resp.result.sts;
      console.log('update:sts:', this.sts);
    }

    redirectOtp(){
      console.log('complete');
      console.log('redirectOtp:sts:', this.sts);
      if(this.sts === 3){
        setTimeout(() => {
          this.router.navigate(["/otp"], {state: {rid: this.rid}});
      }, 1000);  //5s
        //this.router.navigate(["/otp"], {state: {rid: this.rid}});
      }
    }

    chkSts(resp: EccResult<AuthModel>) {
      console.log('chkSts:sts:', resp.result.sts);
      this.exceedAttemptLimit++;
      this.msg = resp.result.msg;
      this.sts = resp.result.sts;

      if(resp.result.sts === 3){
        this.isLoading = false;
        //this.router.navigate(["/otp"], {state: {rid: this.rid}});
        return false;          
      }else if(this.exceedAttemptLimit > this.repeatAttemptLimit){
        return false;
      }else{
        console.log('exceedAttemptLimit:', this.exceedAttemptLimit);
        return true;
      }
    }

  private handleError(error: HttpErrorResponse) {
    this.isLoading = false;
    console.error('An error occurred:', error.error);
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
    console.log('ECC AUTH COMP DESTROYED');
  }

}

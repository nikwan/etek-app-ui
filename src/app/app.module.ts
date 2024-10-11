import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EtekEmployeePagiComponent } from './etek-employee-pagi/etek-employee-pagi.component';
import { EtekEmployeeUpdateComponent } from './etek-employee-update/etek-employee-update.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { EtekEmployeeCreateComponent } from './etek-employee-create/etek-employee-create.component';
import { EtekEmployeeDeleteComponent } from './etek-employee-delete/etek-employee-delete.component';
import { OtpComponent } from './otp/otp.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DemoComponentComponent } from './otp/demo-component/demo-component.component';
import { DemoParentComponent } from './otp/demo-parent/demo-parent.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import { EsignAuthComponentComponent } from './esign-auth-component/esign-auth-component.component';

@NgModule({
  declarations: [
    AppComponent,
    EtekEmployeePagiComponent,
    EtekEmployeeUpdateComponent,
    EtekEmployeeCreateComponent,
    EtekEmployeeDeleteComponent,
    OtpComponent,
    DemoComponentComponent,
    DemoParentComponent,
    EsignAuthComponentComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatTableModule,
    MatFormFieldModule,
    MatButtonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatProgressBarModule,
    MatCheckboxModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

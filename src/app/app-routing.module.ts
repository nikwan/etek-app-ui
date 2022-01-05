import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EtekEmployeeCreateComponent } from './etek-employee-create/etek-employee-create.component';
import { EtekEmployeePagiComponent } from './etek-employee-pagi/etek-employee-pagi.component';
import { EtekEmployeeUpdateComponent } from './etek-employee-update/etek-employee-update.component';

const routes: Routes = [
  {path: 'list', component: EtekEmployeePagiComponent},
  {path: 'update', component: EtekEmployeeUpdateComponent},
  {path: 'update/:id', component: EtekEmployeeUpdateComponent},
  {path: 'add', component: EtekEmployeeCreateComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

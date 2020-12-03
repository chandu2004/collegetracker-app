import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentComponent } from './components/students/students.component';
import { CollegesComponent } from './components/colleges/colleges.component';
import { CollegeDetailsComponent } from './components/college-details/college-details.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'colleges', component: CollegesComponent },
  { path: 'college/:id', component: CollegeDetailsComponent },
  { path: 'student/:id', component: StudentComponent },
  { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

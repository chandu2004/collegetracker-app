import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { StudentComponent } from './components/students/students.component';
import { CollegesComponent } from './components/colleges/colleges.component';

import { CollegeService } from './services/college/college.service';
import { StudentService } from './services/student/student.service';
import { CollegeDetailsComponent } from './components/college-details/college-details.component';
import { HeaderComponent } from './components/common/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentComponent,
    CollegesComponent,
    CollegeDetailsComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgbPaginationModule,
    FormsModule
  ],
  providers: [CollegeService, StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {CollegeService} from '../../services/college/college.service';

@Component({
  selector: 'colleges',
  templateUrl: './colleges.component.html',
  styleUrls: ['./colleges.component.css']
})
export class CollegesComponent implements OnInit {  

  public colleges;
  public college_header = "";
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collegeService: CollegeService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params['state'] != undefined) {
        this.college_header = "Colleges in " + params['state'];
        this.getCollegesByState(params['state']);
      } 
      else if(params['course'] != undefined) {
        this.college_header = "Colleges offering " + params['course'];
        this.getCollegesByCourse(params['course']);
      }
    });
  }

  getCollegesByState(state) {
    this.collegeService.getCollegesByState(state).subscribe(
      data => { 
        this.colleges = data
        console.log(this.colleges);
      },
      err => console.error(err),
      () => console.log('done loading colleges')
    );
  }

  getCollegesByCourse(course) {
    this.collegeService.getCollegesByCourse(course).subscribe(
      data => { 
        this.colleges = data
        console.log(this.colleges);
      },
      err => console.error(err),
      () => console.log('done loading colleges')
    );
  }

  gotoDetails(id) {
    this.router.navigate(['/college', id]);
  }

}

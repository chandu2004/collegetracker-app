import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import {CollegeService} from '../../services/college/college.service';
import {StudentService} from '../../services/student/student.service';

@Component({
  selector: 'college-info',
  templateUrl: './college-details.component.html',
  styleUrls: ['./college-details.component.css']
})
export class CollegeDetailsComponent implements OnInit {  

  public collegeDetails;
  public college;
  public students;
  public id;
  public similarCollegesFound = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private collegeService: CollegeService,
    private studentService: StudentService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getCollege(this.id);
    this.getStudents(this.id);
  }

  getCollege(id) {
    this.collegeService.getCollege(id).subscribe(
      data => { 
        this.collegeDetails = data
        console.log(this.collegeDetails);
        this.college = this.collegeDetails.college;
        if(this.collegeDetails.similar_colleges.length > 0) {
          this.similarCollegesFound = true;
        }
      },
      err => console.error(err),
      () => console.log('done loading college details')
    );
  }

  getStudents(id) {
    this.studentService.getStudents(id).subscribe(
      data => { 
        this.students = data
        console.log(this.students);
      },
      err => console.error(err)
    );
  }

  gotoDetail(id) {
    this.router.navigate(['/student', id]);
  }

  gotoCollegeDetails(id) {
    this.router.navigate(['/college', id]);
  }
}

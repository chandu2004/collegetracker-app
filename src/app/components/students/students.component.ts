import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { StudentService } from '../../services/student/student.service';
import { CollegeService } from '../../services/college/college.service';

@Component({
  selector: 'student',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentComponent implements OnInit {  

  public studentDetail;
  public id;
  public collegeDetail;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentService: StudentService,
    private collegeService: CollegeService
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.getStudent(this.id);
    });
  }

  getStudent(id) {
    this.studentService.getStudent(id).subscribe(
      data => { 
        this.studentDetail = data;
        this.getCollege(this.studentDetail.CollegeId);
      },
      err => console.error(err)
    );
  }

  getCollege(id) {
    this.collegeService.getCollege(id).subscribe(
      data => { 
        this.collegeDetail = data['college'];
        console.log(data);
      },
      err => console.error(err)
    );
  }

  gotoCollege(){
    this.router.navigate(['/college', this.collegeDetail._id]);
  }
}

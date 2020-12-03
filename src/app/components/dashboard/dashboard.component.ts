import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';import { Router } from '@angular/router';
import { Chart } from 'chart.js';

import {CollegeService} from '../../services/college/college.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {  
  @ViewChild('stateChart', {static: false}) stateChart!: ElementRef<HTMLCanvasElement>;
  @ViewChild('courseChart', {static: false}) courseChart!: ElementRef<HTMLCanvasElement>;

  private _stateChart!: Chart;
  private _courseChart!: Chart;
  public page = 1;
  public pageSize = 10;
  public colleges;
  public countsByState;
  public countsByCourse;

  constructor(
    private router: Router,
    private collegeService: CollegeService
  ) {}

  ngOnInit() {
    this.getColleges();
    this.groupByState();
    this.groupByCourse();
  }

  getColleges() {
    this.collegeService.getColleges().subscribe(
      data => { 
        this.colleges = data
        console.log(this.colleges);
      },
      err => console.error(err),
      () => console.log('done loading colleges')
    );
  }

  groupByState() {
    this.collegeService.groupCollegesByState().subscribe(
      data => { 
        this.countsByState = data
        console.log(data);
        this._stateChart = new Chart(this.stateChart.nativeElement, {
          type: 'pie',
          data: {
              labels: this.countsByState.map(a => a.State),
              datasets: [
                  {
                      data: this.countsByState.map(a => a.count),
                      backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#2900A5', '#8E24AA', '#26C6DA', '#546E7A', '#52D726', '#6D4C41'],
                  },
              ],
          },
          options: {
            onClick: this.stateChartClick.bind(this)
        }
    
      });
      },
      err => console.error(err),
      () => console.log('done grouping states')
    );
  }

  groupByCourse() {
    this.collegeService.groupCollegesByCourse().subscribe(
      data => { 
        this.countsByCourse = data
        console.log(data);
        this._courseChart = new Chart(this.courseChart.nativeElement, {
          type: 'doughnut',
          data: {
            labels: this.countsByCourse.map(a => a.Course),
            datasets: [
                {
                    data: this.countsByCourse.map(a => a.count),
                    backgroundColor: ['#007bff', '#dc3545', '#ffc107', '#28a745', '#2900A5', '#8E24AA', '#26C6DA', '#546E7A', '#52D726', '#6D4C41'],
                },
            ],
          },
          options: {
            onClick: this.courseChartClick.bind(this)
        }
    
      });
      },
      err => console.error(err),
      () => console.log('done grouping courses')
    );
  }

  gotoColleges() {
    this.router.navigate(['/colleges'], { queryParams: {state:'Texas'}});
  }

  gotoCollege(id) {
    this.router.navigate(['/college', id]);
  }

  stateChartClick(event) {
    var activePoints = this._stateChart.getElementsAtEvent(event);
    var state = this.countsByState[activePoints[0]._index].State;
    this.router.navigate(['/colleges'], { queryParams: {state: state}});
  }

  courseChartClick(event) {
    var activePoints = this._courseChart.getElementsAtEvent(event);
    var course = this.countsByCourse[activePoints[0]._index].Course;
    this.router.navigate(['/colleges'], { queryParams: {course: course}});
  }
}

import { Component } from '@angular/core';
import { AppService } from './app.service';
import * as moment from 'moment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  items: Array<any> = [];

  isLoading: boolean = false;

  constructor(private appService: AppService) {
    this.getData();
  }

  getData() {

    this.isLoading = true;

    this.appService
      .getData()
      .subscribe((data: any[]) => {

        this.isLoading = false;
        this.items = this.groupDayOfWeek(data);
        //console.log(this.items);

      },
        errors => console.log(errors));
  }

  /**
   * 
   * @param data : any[]
   */
  groupDayOfWeek(data: any[]) {

    const week = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    const groupData = [];

    let groupDay = [];

    week.forEach((day, index) => {

      groupDay = []; // Reset value each days of week.

      data.forEach(item => {

        let date = moment((item.birthday.raw * 1000)).format('YYYY-MM-DD');
        let dayOfWeek = moment(date).day(); // SUN=0 to SAT=6
       
        if (dayOfWeek === index) {
          groupDay.push(item);
        }
      });

      groupData.push({ day: day, data: groupDay });
    });

    return groupData;
  }
}

import { Component, OnInit } from '@angular/core';
import { ISettings } from 'src/app/Models/isettings';
import { SettingsService } from 'src/app/Services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {
  settingsList: ISettings[] = [];
  newSettings: ISettings = {} as ISettings;
  selectedSetting: ISettings | null = null;
  holidayDayOne: string = '0'; 
  holidayDayTwo: string = '0';
   daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  dayToValueMap: { [day: string]: string } = {
    'Sunday': '0',
    'Monday': '1',
    'Tuesday': '2',
    'Wednesday': '3',
    'Thursday': '4',
    'Friday': '5',
    'Saturday': '6'
  };
  constructor(private settingsService: SettingsService) {
    this.newSettings = {
      id: '0',
      additionalHourRate: '0',
      lateDeductionRate: '0',
      holidayDayOne:'0', // Initialize with a default value
      holidayDayTwo:'0', // Initialize with a default value
    };
  }
  updateSettingsAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Settings" ) { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }
  ngOnInit(): void {
    this.loadSettings();
  }
  loadSettings() {
    this.settingsService.getAllSettings().subscribe((settings) => {
      this.settingsList = settings;

      // Check if there is at least one setting
      if (this.settingsList.length > 0) {
        // Set the values of newSettings, holidayDayOne, and holidayDayTwo to the values of the first setting
        this.newSettings = this.settingsList[0] ;
        console.log(this.newSettings);
       
      }
    });
  }

  addOrUpdateSettings() {
    if (this.settingsList.length == 1) {
      this.updateSettings();
    } else if(this.settingsList.length == 0) {
      this.addSettings();
    }
  }

  addSettings() {
    if (this.validateHolidayDays()) {
      this.newSettings.id = '0';
      this.newSettings.additionalHourRate = this.newSettings.additionalHourRate.toString();
      this.newSettings.lateDeductionRate = this.newSettings.lateDeductionRate.toString();
      this.newSettings.holidayDayOne = this.newSettings.holidayDayOne.toString();
      this.newSettings.holidayDayTwo = this.newSettings.holidayDayTwo.toString();

      this.settingsService.addSettings(this.newSettings).subscribe(
        () => {
          this.loadSettings();
          // this.newSettings = { id: '0', additionalHourRate: '0', lateDeductionRate: '0', holidayDayOne: '0', holidayDayTwo: '0' };
        },
        (error) => {
          console.error('Error adding settings:', error);
        }
      );
    } else {
      console.error('Validation failed for adding settings');
    }
  }

  getNumericRange(start: number, end: number): number[] {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  }
  validateHolidayDays(): boolean {
    return this.newSettings.holidayDayOne !== this.newSettings.holidayDayTwo;
  }
  updateSettings() {
    if (this.newSettings && this.newSettings.id) {
      this.newSettings.id = this.newSettings.id.toString();
      this.newSettings.additionalHourRate = this.newSettings.additionalHourRate.toString();
      this.newSettings.lateDeductionRate = this.newSettings.lateDeductionRate.toString();
      this.newSettings.holidayDayOne = this.newSettings.holidayDayOne.toString();
      this.newSettings.holidayDayTwo = this.newSettings.holidayDayTwo.toString();

      this.settingsService.updateSettings(Number(this.newSettings.id), this.newSettings).subscribe(
        () => {
          confirm('Settings updated successfully');
          this.loadSettings();
        },
        (error) => {
          confirm('Settings updated successfully');
          this.loadSettings();
          //console.error('Error updating settings:', error);
        }
      );
    }
  }
}


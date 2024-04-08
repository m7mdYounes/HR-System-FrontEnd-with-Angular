import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'GradProject';
  hideAside: boolean = false;

  constructor(private router: Router) {
    this.hideAside = false; // Initially, set to false
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.hideAside = event.url === '/login'; // Change '/login' to your actual login page route
      }
    });
}

  AddHolidayAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Holiday") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }

  attendanceRecordAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Records") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }

  addNewEmployeeAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Employee") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }

  getAllEmployeesAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Employee") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }


  editOrDeleteHolidayAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Holiday") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }

  getAllRecordAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Records" ) { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }
  getProfileRecordsAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "View") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}
getEmpProfileAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { // Changed from 'in' to 'of'
          if (cc.trim() === "View" ) { // Added 'trim()' to remove extra spaces
              return true;
          }
      }
  }
  return false;
}
getAllSalariesAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) {
          if (cc.trim() === "Admin" ||cc.trim() === "Salary") {
              return true;
          }
      }
  }
  return false;
}
getEmpSalaryAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { // Changed from 'in' to 'of'
          if (cc.trim() === "View" ) { // Added 'trim()' to remove extra spaces
              return true;
          }
      }
  }
  return false;
}

  calcSalaryForEmpAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin" || cc.trim() === "Salary" ) { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
  }

  // settingsAuth(): boolean {
  //   const roles = localStorage.getItem("ROLES")?.split(",");
  //   if (roles) {
  //       for (let cc of roles) { // Changed from 'in' to 'of'
  //           if (cc.trim() === "Admin" || cc.trim() === "Settings"|| cc.trim() === "View") { // Added 'trim()' to remove extra spaces
  //               return true;
  //           }
  //       }
  //   }
  //   return false;
  // }

  AddAuth(): boolean {
    const roles = localStorage.getItem("ROLES")?.split(",");
    if (roles) {
        for (let cc of roles) { // Changed from 'in' to 'of'
            if (cc.trim() === "Admin") { // Added 'trim()' to remove extra spaces
                return true;
            }
        }
    }
    return false;
}
AddAdminAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { // Changed from 'in' to 'of'
          if (cc.trim() === "Admin") { // Added 'trim()' to remove extra spaces
              return true;
          }
      }
  }
  return false;
}
empAuth(): boolean {
  const roles = localStorage.getItem("ROLES")?.split(",");
  if (roles) {
      for (let cc of roles) { // Changed from 'in' to 'of'
          if (cc.trim() === "Admin" ||cc.trim() === "View" ||cc.trim() === "Employee") { // Added 'trim()' to remove extra spaces
              return true;
          }
      }
  }
  return false;
}
  signout(){
    localStorage.removeItem("TOKEN");
    this.router.navigate(['/login']);
  }
}


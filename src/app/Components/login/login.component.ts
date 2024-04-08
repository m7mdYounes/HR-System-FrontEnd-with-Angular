import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/Services/auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
errormessage:string='';

    loginForm = {
      username:"",
      password:""
    };
  constructor(private auth:AuthServiceService,private router:Router){}
  ngOnInit(): void {
    localStorage.removeItem('TOKEN');
    localStorage.removeItem('NAME');
    localStorage.removeItem('ROLES');

  }

  submit(){
    this.auth.login(this.loginForm.username,this.loginForm.password).subscribe(
      (response)=>{
          localStorage.setItem("TOKEN",response.token);
          localStorage.setItem("ROLES",response.roles);
          localStorage.setItem("NAME",this.loginForm.username);
          this.router.navigate(['/home']);
      },
      (error)=>{
       this.errormessage=error.error;
      }
    )
  }

}

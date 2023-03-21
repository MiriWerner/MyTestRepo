import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { loginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loading = false;
  myLetter = 0;
  realValue = '';
  maskedPassword = '';
  maskedValue: string = '';
  upercaseLetter: boolean = false;
  upercaseLetterIndex: number = 0;
  lowercaseLetter: boolean = false;
  lowercaseLetterIndex: number = 0;
  Hebrew: boolean = true;
  digit: boolean = false;
  digitIndex: number = 0;
  constructor(private loginService: loginService, private router: Router) { }
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email, Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.pattern(/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/)]),
  });


  onSubmit() {
    this.loading = true;
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    if (email && password) {
      this.loginService.login(email, password).subscribe(
        response => {
          if(response.user!=null){
            this.loading = false;
            this.router.navigate(['/info']);
            console.log(response);
          }
          else{
            this.loading = false;
            alert('details are incorrect!');
          }
         
        },
        error => {
          this.loading = false;
        }
      );
    }
  }
  checkEmailValaid(){
    let value = this.loginForm.get('email')?.value;
    if (value?.match(/[\u05D0-\u05EA]/))
    this.Hebrew = true;
    else this.Hebrew = false;
  }
  checkValidaation() {
    let value = this.loginForm.get('password')?.value;
    if (value?.match(/[\u05D0-\u05EA]/))
      this.Hebrew = true;
    else this.Hebrew = false;
    if (value?.match(/\d/))
      this.digit = true;
    else this.digit = false;
    if (value?.match(/[A-Z]/))
      this.upercaseLetter = true;
    else this.upercaseLetter = false;
    if (value?.match(/[a-z]/))
      this.lowercaseLetter = true;
    else this.lowercaseLetter = false;
  }


  

}

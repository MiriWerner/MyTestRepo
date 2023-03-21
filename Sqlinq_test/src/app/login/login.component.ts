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
  Hebrew: boolean = false;
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
          this.loading = false;
          this.router.navigate(['/info']);
          console.log(response);
        },
        error => {
          this.loading = false;
        }
      );
    }
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


  maskPassword(event: Event) {
    const inputElement1 = event.target as HTMLInputElement;
    let val = inputElement1.value;

    if (val.length != this.myLetter) {
      const inputElement = event.target as HTMLInputElement;
      let value = inputElement.value;
      if (value.match(/[\u05D0-\u05EA]/))
        this.Hebrew = true;
      if (value.match(/\d/))
        this.digit = true;
      if (value.match(/[A-Z]/))
        this.upercaseLetter = true;
      if (value.match(/[a-z]/))
        this.lowercaseLetter = true;
      this.maskedValue = '';
      for (let i = 0; i < value.length; i++) {
        this.maskedValue += '*';
      }
      if (inputElement.getAttribute('data-real-value') != undefined && inputElement.getAttribute('data-real-value') != null) {
        if (value.length < parseInt(inputElement.getAttribute('data-real-value')?.length.toString() || '0')) {
          this.Hebrew = false;
          this.lowercaseLetter = false;
          this.upercaseLetter = false;
          this.digit = false;
          if (inputElement.getAttribute('data-real-value') ?? ''?.slice(0, value.length) !== value) {
            let num = value.length - 1;
            var data = inputElement.getAttribute('data-real-value') ?? ''?.slice(0, num as number);
            inputElement.setAttribute('data-real-value', data);
            console.log(inputElement.getAttribute('data-real-value'));
            value = inputElement.getAttribute('data-real-value') ?? '';
          }
          if (value.match(/[\u05D0-\u05EA]/))
            this.Hebrew = true;
          if (value.match(/\d/))
            this.digit = true;
          if (value.match(/[A-Z]/))
            this.upercaseLetter = true;
          if (value.match(/[a-z]/))
            this.lowercaseLetter = true;
        }
        else if (inputElement.getAttribute('data-real-value') != null)
          value = inputElement.getAttribute('data-real-value') + value.slice(-1);

      }
      inputElement.setAttribute('data-real-value', value);
      inputElement.value = this.maskedValue;
      this.loginForm.get('password')?.patchValue(inputElement.getAttribute('data-real-value') ?? '');
      this.myLetter = val.length;
    }
    else return;
  }

}

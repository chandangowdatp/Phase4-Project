import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css'],
})
export class AuthenticationComponent implements OnInit {
  correctEmail: string = 'chandan@gmail.com';
  correctPassword: string = 'chandan123';
  email: string = '';
  password: string = '';
  status: string = '';
  isDisabled = true;
  cssStringVar: string = '';

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  submitted = false;
  registerForm: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
      return;
    }
    console.log('on submit is working... => ', this.registerForm.invalid);

    this.signIn();
  }

  signIn(): void {
    this.email = this.registerForm.value.email;
    this.password = this.registerForm.value.password;
    console.log(this.correctEmail+" "+this.email)

    if (
      
      this.correctEmail == this.email && this.correctPassword == this.password
    ) {
      this.status = 'Valid Credentials';
      this.isDisabled = false;
      this.router.navigate(['/employees']);
    } else {
      this.status = 'Invalid Credentials';
      this.isDisabled = true;
      this.cssStringVar = 'red size20';
    }
    this.email = '';
    this.password = '';
  }

  logout(): void {
    this.isDisabled = true;
  }
}

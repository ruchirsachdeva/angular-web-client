import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {FormGroup, FormControl, Validators} from "@angular/forms";
import {EMAIL_PATTERN, Validators as AppValidators} from "../../core/forms";
import {UserService} from "../../core/services/user.service";
import {AuthService} from "../../core/services/auth.service";
import {ToastService} from "../../core/toast/toast.service";
import values from "lodash/values";

@Component({
  selector: 'mpt-signup',
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {

  myForm: FormGroup;
  name: FormControl;
  email: FormControl;
  password: FormControl;
  passwordConfirmation: FormControl;

  constructor(private router: Router,
              private userService: UserService,
              private authService: AuthService,
              private toastService: ToastService) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  onSubmit(params) {
    values(this.myForm.controls).forEach(c => c.markAsTouched());

    if (!this.myForm.valid) return;

    this.userService.create(params)
      .mergeMap(() => {
        let accessToken = localStorage.getItem('fb');
        if(accessToken!==null) {
          return this.authService.loginSocial(accessToken);
        }
          return this.authService.login(params.email, params.password);

      })
      .subscribe(() => {
        this.router.navigate(['/home']);
      }, e => this.handleError(e))
    ;
  }

  private initForm() {
    let email = localStorage.getItem('email');
    let name = localStorage.getItem('name');
    //alert(email);
    //alert(name);
    this.name = new FormControl(name!== null?name:'', Validators.compose([
      Validators.required,
      Validators.minLength(4),
    ]));
    this.email = new FormControl(email!== null?email:'', Validators.compose([
      Validators.required,
      Validators.pattern(EMAIL_PATTERN),
    ]));
    localStorage.removeItem('email');
    localStorage.removeItem('name');
    this.password = new FormControl('', Validators.compose([
      Validators.required,
      Validators.minLength(8),
    ]));
    this.passwordConfirmation = new FormControl('', Validators.compose([
      Validators.required,
    ]));
    this.myForm = new FormGroup({
      name: this.name,
      email: this.email,
      password: this.password,
      passwordConfirmation: this.passwordConfirmation,
    }, AppValidators.match(this.password, this.passwordConfirmation));
  }

  private handleError(error) {
    switch (error.status) {
      case 400:
        if (error.json()['code'] === 'email_already_taken') {
          this.toastService.error('This email is already taken.');
        }
    }
  }

}

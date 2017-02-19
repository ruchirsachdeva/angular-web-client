import {Component} from "@angular/core";
import {Router} from "@angular/router";
import {AuthService} from "../../core/services/auth.service";
import {styles} from "./facebooklogin.component.styles";
import {HttpErrorHandler} from "../../core/services/http-error-handler";

declare const FB:any;

@Component({
  selector: 'facebook-login',
  templateUrl: 'facebooklogin.html'
})

export class FacebookLoginComponent  {
  get styles(): any {
    return this._styles;
  }

  set styles(value: any) {
    this._styles = value;
  }
  private _styles: any = styles;

  constructor(private router: Router,
              private authService: AuthService,
              private errorHandler: HttpErrorHandler,) {
    FB.init({
      appId      : '203064913467897',
      cookie     : true,  // enable cookies to allow the server to access
      // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.5' // use graph api version 2.5
    });

  }

  onFacebookLoginClick() {
    let accessToken ;
    let email;
    let name;
    FB.login(function(response) {
      //alert('setting fb in local storage');
      accessToken = response.authResponse.accessToken;
      FB.api('/me?fields=id, name, email','get', function(userInfo) {
        email = userInfo.email;
        name = userInfo.name;

      });
     // let currentUserInfo = this.getCurrentUserInfo();
     // this.authService.isSignedIn();
      //signInFacebook(response.authResponse.accessToken);
    })

    if(accessToken!==null) {
      localStorage.setItem('fb',accessToken);
      console.log("access token : "+localStorage.getItem('fb'));

      this.authService.loginSocial(accessToken)
        .subscribe((a) => {
          //alert(a+'loggedin');
          this.router.navigate(['/home']);
        }, e =>  {
          localStorage.setItem('email',email);
          localStorage.setItem('name',name);
          // console.log(userInfo);
          console.log(localStorage.getItem('name') + ': ' + localStorage.getItem('email'));
         // alert(("access token : "+localStorage.getItem('fb')));
          this.errorHandler.handleSocial(e);
        })
      ;
    }
  }

  getCurrentUserInfo(): Promise<any> {
   // alert('hiii');
   return FB.api('/me?fields=email','get', function(userInfo) {
      console.log(userInfo);
    //  console.log(userInfo.name + ': ' + userInfo.email);
    });
  }

  statusChangeCallback(resp) {
    if (resp.status === 'connected') {
      // connect here with your server for facebook login by passing access token given by facebook
    }else if (resp.status === 'not_authorized') {

    }else {

    }
  };
  /**ngOnInit() {
   /** FB.getLoginStatus(response => {
      this.statusChangeCallback(response);
    });
  }**/
}

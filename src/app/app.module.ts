import {NgModule, ApplicationRef} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {ENV_PROVIDERS} from "./environment";
import {ROUTES} from "./app.routes";
import {AppComponent} from "./app.component";
import {HeaderComponent} from "./header/header.component";
import {APP_RESOLVER_PROVIDERS} from "../shared/routes/index";
import {HelpComponent} from "./pages/help/help.component";
import {UserListComponent} from "./user/user-list/user-list.component";
import {UserEditComponent} from "./user/user-edit/user-edit.component";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from "./core/core.module";
import {UserStatsModule} from "./user-stats/user-stats.module";
import {HomeModule} from "./pages/home/home.module";
import {UserShowModule} from "./user/user-show/user-show.module";
import {SignupModule} from "./pages/signup/signup.module";
import {LoginModule} from "./pages/login/login.module";
import {FollowerListModule} from "./pages/relationship/follower-list/follower-list.module";
import {FollowingListModule} from "./pages/relationship/following-list/following-list.module";
import {TopModule} from "./pages/top/top.module";

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
];

@NgModule({
  bootstrap: [AppComponent],
  declarations: [
    AppComponent,
    HelpComponent,
    HeaderComponent,
    UserListComponent,
    UserEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES),

    CoreModule,
    SharedModule,

    HomeModule,
    SignupModule,
    LoginModule,
    TopModule,
    UserShowModule,
    FollowerListModule,
    FollowingListModule,

    UserStatsModule,
  ],
  providers: [
    ENV_PROVIDERS,
    ...APP_PROVIDERS
  ]
})
export class AppModule {
  constructor(appRef: ApplicationRef) {
    appRef.bootstrap(AppComponent);
  }
}


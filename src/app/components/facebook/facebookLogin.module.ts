import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core/src/metadata/ng_module";
import {RouterModule} from "@angular/router";
import {FacebookLoginComponent} from "./facebooklogin.component";
import {SharedModule} from "../../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  declarations: [
    FacebookLoginComponent,
  ],
  exports: [
    FacebookLoginComponent,
  ]
})
export class FacebookLoginModule {
}

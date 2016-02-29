import {Component, View} from "angular2/core";
import {CORE_DIRECTIVES} from "angular2/common";
import {RouteParams} from "angular2/router";
import {FollowBtn, UserStats, MicropostList} from "app/components";
import {PublicPage} from "app/routes";

@Component({
  selector: 'user-show-page',
})
@View({
  template: require('./show.html'),
  styles: [require('./show.scss')],
  directives: [CORE_DIRECTIVES, FollowBtn, UserStats, MicropostList],
})
@PublicPage()
export class UserShowPage {

  userId:string;

  constructor(private params:RouteParams) {
    this.userId = params.get('id');
  }

}

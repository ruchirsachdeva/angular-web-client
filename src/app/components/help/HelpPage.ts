import {Component} from "angular2/core";
import {PublicPage} from "app/routes";

@Component({
  selector: 'help-page',
  template: require('./help.html'),
})
@PublicPage()
export class HelpPage {
}

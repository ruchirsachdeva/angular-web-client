import {Component, DebugElement} from "@angular/core";
import {Location} from "@angular/common";
import {By} from "@angular/platform-browser/src/dom/debug/by";
import {
  inject,
  async,
  addProviders,
  tick,
  fakeAsync
} from "@angular/core/testing";
import {BaseResponseOptions, Response} from "@angular/http";
import {
  TestComponentBuilder,
  ComponentFixture
} from "@angular/compiler/testing";
import {MockBackend} from "@angular/http/testing";
import {Router, ROUTER_DIRECTIVES} from "@angular/router";
import {SignupComponent} from "./signup.component";
import {LoginService, APP_SERVICE_PROVIDERS} from "../../../shared/services";
import {APP_TEST_HTTP_PROVIDERS} from "../../../shared/http/index";
import {provideFakeRouter} from "../../../shared/routes/router-testing-providers";
import {advance} from "../../../shared/testing/helpers";

fdescribe('SignupComponent', () => {

  // TODO make TestComponent just using router-outlet
  @Component({
    template: `<mpt-signup></mpt-signup><router-outlet></router-outlet>`,
    directives: [SignupComponent, ROUTER_DIRECTIVES],
  })
  class TestComponent {
  }

  @Component({
    template: ``,
  })
  class BlankCmp {
  }

  let fixture:ComponentFixture<any>;
  let cmpDebugElement:DebugElement;

  let loginService:LoginService;
  let backend:MockBackend;
  let router:Router;
  let location:Location;

  beforeEach(() => addProviders([
    provideFakeRouter(TestComponent, [
      {
        path: 'home',
        component: BlankCmp,
      },
    ]),
    ...APP_TEST_HTTP_PROVIDERS,
    ...APP_SERVICE_PROVIDERS,
  ]));
  beforeEach(inject([LoginService, MockBackend, Router, Location], (..._) => {
    [loginService, backend, router, location] = _;
  }));
  beforeEach(async(inject([TestComponentBuilder], (tcb:TestComponentBuilder) => {
    tcb
      .createAsync(TestComponent)
      .then((_fixture:ComponentFixture<any>) => {
        fixture = _fixture;
        cmpDebugElement = _fixture.debugElement.query(By.directive(SignupComponent));
        _fixture.detectChanges();
      });
  })));

  it('can be shown', () => {
    expect(cmpDebugElement).toBeTruthy();
  });

  it('can validate inputs', () => {
    const page:SignupComponent = cmpDebugElement.componentInstance;
    page.name.updateValue('a', {});
    page.email.updateValue('b', {});
    page.password.updateValue('c', {});
    page.passwordConfirmation.updateValue('d', {});
    expect(page.myForm.valid).toBeFalsy();
    page.name.updateValue('akira', {});
    page.email.updateValue('test@test.com', {});
    page.password.updateValue('secret123', {});
    page.passwordConfirmation.updateValue('secret123', {});
    expect(page.myForm.valid).toBeTruthy();
  });

  it('can signup', fakeAsync(() => {
    const page:SignupComponent = cmpDebugElement.componentInstance;
    spyOn(loginService, 'login').and.callThrough();
    backend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new BaseResponseOptions()));
    });
    page.onSubmit({
      email: 'test@test.com',
      password: 'secret',
      name: 'akira',
    });
    expect(loginService.login).toHaveBeenCalledWith('test@test.com', 'secret');
    advance(fixture);
    expect(location.path()).toEqual('/home');
  }));

});

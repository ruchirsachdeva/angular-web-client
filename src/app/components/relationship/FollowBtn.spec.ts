const Rx = require('@reactivex/rxjs/dist/cjs/Rx');
const {Observable} = Rx;

import {Component, View, By, DebugElement, provide} from 'angular2/angular2';
import {
  inject,
  beforeEachProviders,
  beforeEach,
  afterEach,
  expect,
  describe,
  ddescribe,
  it,
  iit,
} from 'angular2/testing';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {ResponseOptions, Response, BaseResponseOptions} from 'angular2/http';
import {ObservableWrapper} from "angular2/src/facade/async";

import {FollowBtn} from 'app/components';
import {APP_TEST_PROVIDERS} from "app/bindings";
import {TestContext, createTestContext} from 'app/testing';
import {RelationshipService} from "app/services";

export function main() {
  describe('FollowBtn', () => {

    var ctx:TestContext;
    var cmpDebugElement:DebugElement;
    var relationshipService:RelationshipService;

    beforeEachProviders(() => [APP_TEST_PROVIDERS]);
    beforeEach(createTestContext(_ => ctx = _));
    beforeEach(inject([RelationshipService], _relationshipService => {
      relationshipService = _relationshipService;
      ['follow', 'unfollow', 'isFollowing'].forEach(m => {
        spyOn(relationshipService, m).and.callThrough();
      });
    }));
    beforeEach(done => {
      ctx.backend.connections.subscribe(conn => {
        conn.mockRespond(new Response(new BaseResponseOptions()));
      });
      ctx.init(TestCmp)
        .finally(done)
        .subscribe(rootTC => {
          cmpDebugElement = rootTC.debugElement.query(By.directive(FollowBtn));
        });
    });

    it('can be shown', () => {
      expect(cmpDebugElement).toBeTruthy();

      const cmp:FollowBtn = cmpDebugElement.componentInstance;
      expect(cmp.followerId).toEqual('1');
      expect(cmp.busy).toBeFalsy();
      expect(relationshipService.isFollowing).toHaveBeenCalledWith('1');
    });

    it('can unfollow', () => {
      const cmp:FollowBtn = cmpDebugElement.componentInstance;
      cmp.isFollowing = true;
      ctx.rootTC.detectChanges();

      const unfollowBtn = cmpDebugElement.query(By.css('.follow-btn')).nativeElement;
      expect(unfollowBtn).toHaveText('Unfollow');

      unfollowBtn.click();
      expect(cmp.isFollowing).toBeFalsy();
      expect(relationshipService.unfollow).toHaveBeenCalledWith('1');
    });

    it('can follow', () => {
      const cmp:FollowBtn = cmpDebugElement.componentInstance;
      cmp.isFollowing = false;
      ctx.rootTC.detectChanges();

      const followBtn = cmpDebugElement.query(By.css('.follow-btn')).nativeElement;
      expect(followBtn).toHaveText('Follow');

      followBtn.click();
      expect(cmp.isFollowing).toBeTruthy();
      expect(relationshipService.follow).toHaveBeenCalledWith('1');
    });

  });
}

@Component({selector: 'test-cmp'})
@View({
  template: `<follow-btn follower-id="1"></follow-btn>`,
  directives: [FollowBtn],
})
class TestCmp {
}

import { TestBed } from '@angular/core/testing';

import { OpenPageService } from './open-page.service';
import { async } from 'rxjs/internal/scheduler/async';
import { By } from '@angular/platform-browser';

describe('OpenPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenPageService = TestBed.get(OpenPageService);
    expect(service).toBeTruthy();
  });
  it('should open web pages', async(() => {
    const openPageService = fixture.debugElement.injector.get(OpenPageService);
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      fixture.detectChanges();
      const debugElements = fixture.debugElement.queryAll(By.css('h2'));
      expect(debugElements.length).toBe(10);
      expect(debugElements[0].nativeElement.textContent).toContain('Item 1');
      debugElements[0].triggerEventHandler('click', null);
      expect(openPageService.open).toHaveBeenCalledWith('http://www.example.com/item0');
    });
  }));
});

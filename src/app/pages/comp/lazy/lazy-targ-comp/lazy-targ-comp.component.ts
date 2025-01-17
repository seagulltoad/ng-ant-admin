import { Component, OnInit, ChangeDetectionStrategy, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';

import { DestroyService } from '@core/services/common/destory.service';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

export enum LazySelPeopleEnum {
  'Yanzu',
  'Dehua',
  'YiLin',
  'Jielun'
}

@Component({
  selector: 'app-lazy-targ-comp',
  templateUrl: './lazy-targ-comp.component.html',
  styleUrls: ['./lazy-targ-comp.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  standalone: true,
  imports: [NzCardModule, NzAvatarModule, NzButtonModule, NzWaveModule]
})
export class LazyTargCompComponent implements OnInit, OnChanges {
  @Input() purChoosePeople: LazySelPeopleEnum = LazySelPeopleEnum.YiLin;
  @Output() readonly currentPeople = new EventEmitter<LazySelPeopleEnum>();
  lazySelPeopleEnum = LazySelPeopleEnum;
  disabled = true;

  constructor(public destroy$: DestroyService) {}

  // 选择明星
  choosePeople(people: LazySelPeopleEnum): void {
    this.purChoosePeople = people;
    this.currentPeople.next(people);
    this.disabled = false;
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

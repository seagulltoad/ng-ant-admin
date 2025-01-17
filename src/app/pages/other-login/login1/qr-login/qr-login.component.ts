import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';

import { LoginType } from '@app/pages/other-login/login1/login1.component';
import { DestroyService } from '@core/services/common/destory.service';
import { Login1StoreService } from '@store/biz-store-service/other-login/login1-store.service';
import { QRCodeModule } from 'angularx-qrcode';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

@Component({
  selector: 'app-qr-login',
  templateUrl: './qr-login.component.html',
  styleUrls: ['./qr-login.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DestroyService],
  standalone: true,
  imports: [FormsModule, NzFormModule, ReactiveFormsModule, NzGridModule, QRCodeModule, NzTypographyModule, NzButtonModule, NzWaveModule]
})
export class QrLoginComponent implements OnInit {
  validateForm!: FormGroup;
  password?: string;
  typeEnum = LoginType;
  isOverModel = false;
  constructor(private destroy$: DestroyService, private cdr: ChangeDetectorRef, private fb: FormBuilder, private login1StoreService: Login1StoreService) {}

  submitForm(): void {}

  goOtherWay(type: LoginType): void {
    this.login1StoreService.setLoginTypeStore(type);
  }

  ngOnInit(): void {
    this.login1StoreService
      .getIsLogin1OverModelStore()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.isOverModel = res;
        this.cdr.markForCheck();
      });
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [null]
    });
  }
}

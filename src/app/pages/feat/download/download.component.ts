import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';

import { DestroyService } from '@core/services/common/destory.service';
import { ip } from '@env/environment.prod';
import { DownloadService } from '@services/download/download.service';
import { PageHeaderType, PageHeaderComponent } from '@shared/components/page-header/page-header.component';
import FileSaver from 'file-saver';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzWaveModule } from 'ng-zorro-antd/core/wave';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [PageHeaderComponent, NzCardModule, NzButtonModule, NzWaveModule]
})
export class DownloadComponent implements OnInit {
  pageHeaderInfo: Partial<PageHeaderType> = {
    title: '文件下载',
    breadcrumb: ['首页', '功能', '文件下载'],
    desc: '各种文件下载'
  };

  constructor(private downloadService: DownloadService, private destroy$: DestroyService) {}

  ngOnInit(): void {}

  fileStreamDownload(): void {
    const downloadDto = {
      downloadUrl: `http://${ip}/api/file/图纸实际材料量导入模板.xlsx`
    };
    this.downloadService
      .fileStreamDownload(downloadDto)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        const blob = new Blob([res], { type: 'text/plain;charset=utf-8' });
        FileSaver.saveAs(blob, '材料库导入模板.xlsx');
      });
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SearchBoxService {
  ProcessKeywords(keyword = '', data: any = null, processingMethod: any): any {
    return processingMethod(keyword, data);
  }
}

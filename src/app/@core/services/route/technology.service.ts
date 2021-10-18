import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { share } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TechnologyService {
  technology_stacks!: Type<'python' | 'java' | 'dot-net'>;

  technologies!: {
    Python: string;
    Java: string;
    'Dot NET': string;
  };

  private _selectedTechnologySubject$: BehaviorSubject<
    'python' | 'java' | 'dot-net'
  > = new BehaviorSubject<'python' | 'java' | 'dot-net'>('python');
  private _selectedTechnology$ = this._selectedTechnologySubject$
    .asObservable()
    .pipe(share());

  get selectedTechnology$(): Observable<'python' | 'java' | 'dot-net'> {
    return this._selectedTechnology$;
  }

  set selectedTechnology(value: 'python' | 'java' | 'dot-net') {
    this._selectedTechnologySubject$.next(value);
  }

  constructor() {
    this.technologies = {
      Python: 'python',
      Java: 'java',
      'Dot NET': 'dot-net',
    };
  }
}

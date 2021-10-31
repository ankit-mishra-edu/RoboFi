import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SpeechService {
  speechRecognition: any;

  constructor() {
    const { webkitSpeechRecognition } = window as any;

    this.speechRecognition = new webkitSpeechRecognition();
  }

  // Subject for Search Box Spoken text
  public _spokenKeywordsSubject$: BehaviorSubject<string> =
    new BehaviorSubject<string>('');
  private _spokenKeywords$: Observable<string> =
    this._spokenKeywordsSubject$.asObservable();

  get spokenKeywords$(): Observable<string> {
    return this._spokenKeywords$;
  }

  set spokenKeywords(value: string) {
    this._spokenKeywordsSubject$.next(value);
  }

  listen() {
    console.log('Started Listening...');

    const resultHandler = (speechRecognitionObj: any) => {
      console.log(speechRecognitionObj);
      this.spokenKeywords = this.getTranscript(speechRecognitionObj.results);
    };

    const errorHandler = (err: any) => {
      console.error(err);
    };

    this.speechRecognition.addEventListener('result', resultHandler);
    this.speechRecognition.addEventListener('error', errorHandler);
    this.speechRecognition.start();

    return () => {
      this.speechRecognition.removeEventListener('result', resultHandler);
      this.speechRecognition.removeEventListener('error', errorHandler);
      this.speechRecognition.abort();
    };
  }

  getTranscript(results: { transcript: string }[][]): string {
    return Array.from(results)
      .map((result) => result[0])
      .map((result) => result.transcript)[0];
    return results[0][0].transcript;
  }
}

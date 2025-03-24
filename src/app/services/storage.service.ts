import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from '@apollo/client/utilities';
import { environment } from '@environment';
import { map } from 'rxjs';

export type Stored = {
  key: string;
  size: number;
  type: string;
};

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storageUri = environment.storageUri;

  private readonly http = inject(HttpClient);

  public upload(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http
      .post<Stored>(`${this.storageUri}/upload`, formData)
      .pipe(map((resp) => `${this.storageUri}/${resp.key}`));
  }
}

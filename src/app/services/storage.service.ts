import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@environment';
import { map, Observable } from 'rxjs';

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

  /**
   * Elimina un archivo remoto dado su URL.
   *
   * @param url - La URL del archivo a eliminar.
   * @returns Un observable que emite la URL completa del archivo eliminado.
   */
  public delete(url: string) {
    if (!url.includes(this.storageUri)) {
      return new Observable<string>((observer) => {
        observer.next('');
        observer.complete();
      });
    }

    return this.http.delete<Stored>(url).pipe(
      map((resp) => {
        console.log('Imagen eliminado', resp);
        return '';
      })
    );
  }

  /**
   * Sube un archivo al almacenamiento remoto.
   *
   * @param file - El archivo que se desea subir.
   * @returns Un observable que emite la URL completa del archivo subido.
   */
  public upload(file: File) {
    const formData = new FormData();

    formData.append('file', file);

    return this.http
      .post<Stored>(`${this.storageUri}/upload`, formData)
      .pipe(map((resp) => `${this.storageUri}/${resp.key}`));
  }
}

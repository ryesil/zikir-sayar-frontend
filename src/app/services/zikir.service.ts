import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User, UserTypes } from '../interfaces/user';
import { Observable, of } from 'rxjs';
import { Zikir, ZikirDTO } from '../interfaces/zikir';
import { UserService } from './user.service';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ZikirService {
  private user!: User
  private baseUrl = environment.apiUrl;
  constructor(private http: HttpClient, private userService: UserService) {
    this.userService.userObs.subscribe(user => {
    this.user = user;
  });
  }

  getZikirs(): Observable<Zikir[]> {

    try {
      this.ensureAuthenticated();
      return this.http.get<Zikir[]>(this.baseUrl+'/fikir/api/zikirs');
    } catch (error) {
      console.warn('Error getting Zikirs:', error);
      return of([]);
    }
  }

  getZikir(id: number): Observable<Zikir> {

    try{
      this.ensureAuthenticated();
      return this.http.get<Zikir>(`${this.baseUrl}/fikir/api/zikirs/${id}`);
    } catch (error) {
      console.warn('Error getting Zikir:', error);
      return of({} as Zikir);
    }
  }
  putZikir(zikirDTO: ZikirDTO): Observable<ZikirDTO> {
    try {
      this.ensureAuthenticated();
      return this.http.put<ZikirDTO>(`${this.baseUrl}/fikir/api/zikirs/${zikirDTO.id}`, zikirDTO);
    } catch(error) {
      console.warn("Error updating Zikir: ", error);
      return of()
    }
  }

  postZikir(zikir: Zikir): Observable<Zikir>{
    try{
      this.ensureAuthenticated();
      if(this.user.getUserType() !== UserTypes.ADMIN) {
        throw new Error('User is not authorized to add zikir');
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'password': 'ArapFaik'
        })
      }
     return this.http.post<Zikir>(this.baseUrl+'/fikir/api/zikirs', zikir, httpOptions);
    } catch(error) {
      console.warn("Error posting Zikir: ", error);
      return of({} as Zikir);
    }
  }

  private ensureAuthenticated(): void {
    if (!this.user || this.user.isExpired()) {
      throw new Error('User is not authenticated. Cannot perform the operation.');
    }
  }

}
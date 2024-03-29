import {
  Component,
  DestroyRef,
  Input,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { addIcons } from 'ionicons';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import {
  IonBackButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonText,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonIcon,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonText,
    IonLabel,
    IonButtons,
    IonBackButton,
    IonItem,
    CurrencyPipe,
    DatePipe,
  ],
})
export class DetailsPage {
  public movie: WritableSignal<MovieResult | null> = signal<MovieResult | null>(
    null
  );
  public imageBaseUrl = 'https://image.tmdb.org/t/p';
  private movieService = inject(MovieService);
  private destroyRef = inject(DestroyRef);

  @Input()
  set id(movieId: string) {
    this.movieService
      .getMovieDetails(movieId)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((movie) => {
        this.movie.set(movie);
      });
  }

  constructor() {
    addIcons({
      cashOutline,
      calendarOutline,
    });
  }
}

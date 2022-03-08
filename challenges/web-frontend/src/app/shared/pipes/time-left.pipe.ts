import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeLeft',
  pure: true,
})
export class TimeLeftPipe implements PipeTransform {
  transform(timeInSeconds: number): string {
    let wholeHours = String(Math.floor(timeInSeconds / 3600));
    const partialHours = timeInSeconds % 3600;
    let wholeMinutes = String(Math.floor(partialHours / 60));
    let seconds = String(timeInSeconds % 60);

    if (wholeHours.length === 1) {
      wholeHours = `0${wholeHours}`;
    }

    if (wholeMinutes.length === 1) {
      wholeMinutes = `0${wholeMinutes}`;
    }

    if (seconds.length === 1) {
      seconds = `0${seconds}`;
    }

    return `${wholeHours}h:${wholeMinutes}m:${seconds}s`;
  }
}

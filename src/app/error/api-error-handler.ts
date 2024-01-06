// api-error-handler.ts

import { HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

// Function to handle HTTP errors from the API
export function handleApiError(error: HttpErrorResponse): Observable<never> {
  // Check if the error is on the client side
  if (error.error instanceof ErrorEvent) {
    // Client-side error occurred
    console.error('An error occurred:', error.error.message);
  } else {
    console.error(`Error code ${error.status}, body: `, error.error);
  }
  // Return an observable with an error message
  return throwError('Something went wrong; please try again later.');
}

import { Pipe, PipeTransform, Sanitizer, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'safeUrl'
})
export class SafeUrlPipe implements PipeTransform {
  constructor(private domSanitizer: DomSanitizer) {}
  transform(url: string) {
    // this.domSanitizer.bypassSecurityTrustUrl(url)
    return this.domSanitizer.sanitize(SecurityContext.NONE,url);
  }
}
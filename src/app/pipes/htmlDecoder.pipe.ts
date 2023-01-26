import {Pipe,PipeTransform} from '@angular/core'


@Pipe ({
    name: 'htmlDecoder',
})
export class HtmlDecoder implements PipeTransform {
    transform(htmlString: string) {
        
        return htmlString.replace('&quot;', '"').replace( "&apos;","'").replace('&#58;', ':').replace('&#44;',',').replace('&#91;','[')
    }
}
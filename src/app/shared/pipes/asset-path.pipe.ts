import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'assetPath',
})
export class AssetPathPipe implements PipeTransform {
  transform(value: string): string {
    return `assets/${value}`;
  }
}

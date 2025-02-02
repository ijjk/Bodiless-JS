/**
 * Copyright © 2023 Johnson & Johnson
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import { VitalElement, VitalPage } from './vital-page';

export class VitalSectionPage extends VitalPage {
  readonly vitalSections: VitalSection[];

  readonly sectionLinkSelector: string;

  constructor() {
    super('/styleguide/section/');
    this.vitalSections = [
      {
        id: 'DefaultSection'
      },
      {
        id: 'SectionWithTitle'
      },
      {
        id: 'SectionWithLink',
        hasLink: true,
      },
      {
        id: 'SectionWithDescription'
      },
      {
        id: 'SectionFull',
        hasLink: true,
      },
    ];
    this.sectionLinkSelector = '[data-layer-region="Section:Link"]';
  }

  getElements(): VitalElement[] {
    return this.vitalSections;
  }
}

interface VitalSection extends VitalElement {
  hasLink?: boolean
}

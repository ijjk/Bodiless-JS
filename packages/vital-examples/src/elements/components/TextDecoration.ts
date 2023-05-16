import { asTokenGroup, TextDecorationMeta } from '@bodiless/vital-elements';
import { vitalTextDecorationBase } from '@bodiless/vital-elements/src/base';

export default asTokenGroup(TextDecorationMeta)({
  ...vitalTextDecorationBase,
  Book: 'font-book',
  Bold: 'font-light',
});

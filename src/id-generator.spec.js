/* global beforeEach, describe, expect, it */
'use strict';

import IdGenerator from './id-generator';

describe('Id Generator Spec', () => {
   it('getId returns a different id each time it is called.', function() {
      expect(IdGenerator.getId()).not.toEqual(IdGenerator.getId());
   });
});
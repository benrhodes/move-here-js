/* global beforeEach, describe, expect, it */
'use strict';

import IdGenerator from '../src/id-generator';

describe('Id Generator', () => {
   it('getId returns a different id each time it is called.', function() {
      expect(IdGenerator.getId()).not.toEqual(IdGenerator.getId());
   });
});
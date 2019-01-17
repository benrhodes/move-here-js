let id = 0;

export default class IdGenerator {
   static getId() {
      return id++;
   }
}
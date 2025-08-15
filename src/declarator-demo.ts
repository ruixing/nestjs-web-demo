function first() {
  console.log("first(): factory evaluated", arguments);
  return function (target: any, propertyKey: string) {
    console.log("first(): called", arguments);
  };
}
 
function second() {
  console.log("second(): factory evaluated", arguments);
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log("second(): called", arguments);
  };
}
 
class ExampleClass {
  @first()
  a = '234';
    
  @second()
  method(abc) {
    console.log(abc)
  }
}

const exam = new ExampleClass();
console.log('---->', exam.a)
exam.method('hello world');
exam.method('hello world');

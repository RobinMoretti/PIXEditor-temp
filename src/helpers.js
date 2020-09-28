var helpers = {
      cloneVar: function (variable){
            return JSON.parse(JSON.stringify(variable))
      },
      onlyUnique: function (value, index, self) { // for getting unique value of an array
            return self.indexOf(value) === index;
            // usage example:
            // var a = ['a', 1, 'a', 2, '1'];
            // var unique = a.filter(onlyUnique);

            // console.log(unique); // ['a', 1, 2, '1']
      }
}

export default helpers


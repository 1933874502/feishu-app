var name = "window"
var bar = {
  name: "bar",
  printName: function () {
    console.log(name)
  },
}
var _printName = bar.printName
_printName() //window
bar.printName() //window


// Initialize a Package.  a Package is just a Module that can contain Blocks.
// The Package call here should always wrap the entire file.
Package(function P() {

  /*
  Using P.Import here means that the P will not resolve its dependencies,
  until the callback to the import (function I) is completed.
  */
  P.Templates("index.templates.js")
  //Templates contains GUI and other context for an editor.
  P.Import("fluff",function I(F) {
    //a Block is defined in fluff/index.js
    P.Block(function B() {
      B.Outputs("ctx");
      B.Name("AudioContext");
      B.Init(function AudioContext() {
        /*
        init is called at program init time,
        prior to the input pin values being available.
        init is called with the compiled block as this,
        and global scope.
        */

        //find the appropriate AudioContext.
        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        //
        this.context = new AudioContext();

      });

      B.Repr("Audio");
      B.Call(function ctx() {
        /*
        Call is called when the block performs a step.
        It is called in a special scope where the input and ouptut pins
        are mapped to variable names.  If a pin has an integer name,
        it uses variable names starting with $.

        The scope also includes all the other attributes of the block.
        This can include the enclosing graph via the parent attribute.
        This can also include window, document, etc. if available in
        the calling environment.

        */

        //just setting the 1 output pin to the initialized context.
        ctx=this.context;
      });
    });


    P.Block(function B() {
      B.Name("Filter");
      B.Repr("Filter");
      B.Inputs(1)
      B.Outputs(0)
      B.Def(function doSomething(toSomething) {
        //write a static function here and it will be
        //directly available in Call.
        //Avoid writing detailed functionality in Call,
        //instead use methods defined on the block.
        return toSomething;
      });
      B.Init(function Filter() {
          this.context=$1;
      });
      B.Call(function F() {
        //Just pass a modified context object through.
        $0=doSomething($1);
      });
    });

  });
});

$(function(){
    // return an array of phantom event calls
    // save a function on the scope which evalutes the test score
    // that function should xhr the result to the server

    var input1 = $('#num1').offset(), input2 = $('#num2').offset();
    var addbutton = $($('button')[0]).offset();

    window.__phantomCommands = [
	{type:'click', p0: input1.left+4, p1: input1.top +4},
	{type:'keypress', p0:'2'},
	{type:'click', p0: input2.left+4, p1: input2.top +4},
	{type:'keypress', p0:'3'},
	{type:'click', p0: addbutton.left+4, p1: addbutton.top +4}

// this needs to return an object describing the test
//      {type:'eval', res:'bgcolor', eval:function(){ return $('body').css('background-color')==='#000'}}
    ];

    window.__exp = {'ans':{val:50, success:'added correctly', failure:'added poorly'}}; //expected results

    window.__testversion = 1;

});

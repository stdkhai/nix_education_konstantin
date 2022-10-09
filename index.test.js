const Calc = require('./index');
const assert = require('assert').strict;

describe("integration test", function() {
    let todos = new Calc();
    it("use empty operand", function() { 
        assert.strictEqual(todos.calculation(1,2,"") , undefined);
    });
    
    it("adding 2 and 1", function() { 
        assert.strictEqual(todos.calculation(2,1,"+") , 3);
    });

    it("minus 2 and 1", function() { 
        assert.strictEqual(todos.calculation(2,1,"-") , 1);
    });
    it("minus 2 and #", function() { 
        assert.strictEqual(todos.calculation(2,"#","-") , 1);
    });
    it("multiply 2 and 1", function() { 
        assert.strictEqual(todos.calculation(2,1,"*") , 2);
    });
    it("2 percent of 100", function() { 
        assert.strictEqual(todos.calculation(2,10,"%") , 0.2);
    });

});
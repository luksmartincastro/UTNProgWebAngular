module.exports = function(grunt)
{
	grunt.initConfig({
		jshint:
		{
			all:[
					'scripts/services/atPublicoServ.js',
					'scripts/controllers/presupCtrl.js',
					'scripts/router.js'
				]
		}
	});
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default',['jshint']);
};
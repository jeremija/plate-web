module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: ["doc/"],
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/**/*.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= pkg.repository.url %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        },
        mocha_phantomjs: {
            unit: ['test/*.html'],
            // integration: ['test-integration/*.html']
        },
        shell: {
            mocha_phantomjs_integration: {
                options: {
                    stdout: true,
                    failOnError: true
                },
                command: 'mocha-phantomjs test-integration/test.html -s localToRemoteUrlAccessEnabled=true'
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'test-integration/**/*.js', '!src/lib/**/*']
        },
        jsdoc : {
            dist : {
                src: ['src/**/*.js', '!src/lib/*'],
                options: {
                    destination: 'doc'
                }
            }
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint', 'mocha_phantomjs']
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('test', ['jshint', 'mocha_phantomjs:unit']);
    grunt.registerTask('integration-test', ['jshint', 'shell:mocha_phantomjs_integration']);

    grunt.registerTask('doc', ['jshint', 'mocha_phantomjs:unit', 'clean', 'jsdoc']);
    grunt.registerTask('default', ['jshint', 'mocha_phantomjs:unit', 'concat', 'uglify']);
};
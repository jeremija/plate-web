module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        clean: {
            doc: ["doc/"],
            dist: ["dist/"]
        },
        // concat: {
        //     options: {
        //         separator: ';'
        //     },
        //     dist: {
        //         src: ['src/**/*.js'],
        //         dest: 'dist/<%= pkg.name %>.js'
        //     }
        // },
        less: {
            main: {
                options: {
                    relativeUrls: true
                },
                files: {
                    'src/css/style.css': 'src/less/index.less'
                }
            }
        },
        requirejs: {
            'distjs': {
                options: {
                    name: 'dist',
                    baseUrl: "src/js",
                    mainConfigFile: "src/js/require/config.js",
                    out: "dist/js/plate-web.js",
                    // generateSourceMaps: true,
                    preserveLicenseComments: false,
                    optimize: 'none'
                }
            },
            'distcss': {
                options: {
                    optimizeCss: 'standard',
                    preserveLicenseComments: false,
                    out: 'dist/css/style.css',
                    cssIn: 'src/css/style.css'
                }
            }
        },
        uglify: {
            distjs: {
                options: {
                    banner: '/*! plate-web v<%= pkg.version %> <%= grunt.template.today("dd-mm-yyyy") %> */\n',
                    sourceMap: 'dist/js/plate-web.min-map.js',
                    sourceMappingURL: 'plate-web.min-map.js',
                    sourceMapPrefix: 2
                },
                files: {
                    'dist/js/plate-web.min.js': ['dist/js/plate-web.js']
                }
            }
        },
        copy: {
            'disthtml': {
                expand: true,
                cwd: 'src',
                src: ['pages/**/*.html'],
                dest: 'dist'
            },
            'distfonts': {
                expand: true,
                cwd: 'src',
                // src: ['lib/bootstrap/fonts/**'],
                src: ['bower/bootstrap/dist/fonts/**'],
                dest: 'dist'
            }
        },
        processhtml: {
            dist: {
                files: {
                    'dist/index.html': ['src/index.html']
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
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js', 'test-integration/**/*.js', '!src/bower/**/*']
        },
        jsdoc : {
            dist : {
                src: ['src/js/**/*.js', 'src/js/pages/**/*.js'],
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

    // grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-jsdoc');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-less');

    grunt.registerTask('test', ['jshint', 'mocha_phantomjs:unit']);
    grunt.registerTask('integration-test', ['jshint', 'shell:mocha_phantomjs_integration']);

    grunt.registerTask('doc', ['jshint', 'mocha_phantomjs:unit', 'clean', 'jsdoc']);
    grunt.registerTask('build', ['test', 'clean:dist', 'less', 'requirejs:distjs',
        'requirejs:distcss', 'uglify:distjs', 'copy:disthtml', 'copy:distfonts',
        'processhtml']);
    // grunt.registerTask('default', ['jshint', 'mocha_phantomjs:unit', 'concat', 'uglify']);
};

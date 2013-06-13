'use strict';

module.exports = function (grunt) {

    // This is a bit hacky, but prevents duplicate including of JS deps in final output
    var bower_libs = require('./component.json');
    var js_libs = [];

    for (var package_name in bower_libs.dependencies) {
        if (bower_libs.dependencies.hasOwnProperty(package_name)) {
            js_libs.push('public/js/libs/' + package_name + '/' + package_name + '.js');
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // JS
        concat: {
            main: {
                files: {
                    'public/js/libs.js': js_libs,
                    'public/js/<%= pkg.name %>.js': 'public/js/scripts/**/*.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %>-<%= grunt.template.today("dd-mm-yyyy") %> (C) 2013 Cohaesus Projects Ltd*/\n'
            },
            project: {
                src: 'public/js/<%= pkg.name %>.js',
                dest: 'public/js/<%= pkg.name %>.min.js'
            },
            libs: {
                src: 'public/js/libs.js',
                dest: 'public/js/libs.min.js'
            }
        },
        jshint: {
            files: ['public/js/scripts/**/*.js'],
            options: {
                globals: {
                    jQuery: true,
                    console: false,
                    module: true,
                    document: true
                }
            }
        },
        // CSS
        sass: {
            production: {
                files: {
                    'public/css/<%= pkg.name %>.css': 'public/scss/0xdeadfa11.scss'
                }
            }
        },
        csslint: {
            scssoutput: {
                options: {
                    csslintrc: '.csslintrc'
                },
                src: ['public/css/<%= pkg.name %>.css']
            }
        },
        cssmin: {
            compress: {
                options: {
                    banner: '/*! <%= pkg.name %>-<%= grunt.template.today("dd-mm-yyyy") %> (C) 2013 Cohaesus Projects Ltd*/\n'
                },
                files: {
                    'public/css/<%= pkg.name %>.min.css': 'public/css/<%= pkg.name %>.css'
                }
            }
        },
        livereload: {
            port: 35729
        },
        server: {
            script: './server.js'
        },
        regarde: {
            development: {
                files: ['public/**/*', 'app/**/*', '!public/scss/**/*', '!public/js/**/*'],
                tasks: ['express-server', 'livereload']
            },
            styles: {
                files: ['public/scss/**/*'],
                tasks: ['sass', 'livereload']
            },
            js: {
                files: ['public/js/libs/**/*', 'public/js/scripts/**/*'],
                tasks: ['concat', 'uglify', 'livereload']
            }
        }
    });

    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-livereload');
    grunt.loadNpmTasks('grunt-regarde');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('lint', ['jshint', 'csslint']);
    grunt.registerTask('minify', ['sass', 'cssmin', 'concat', 'uglify']);
    grunt.registerTask('default', ['express-server', 'livereload-start', 'regarde']);
};
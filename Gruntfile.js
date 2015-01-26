module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        //ensure js validates
        jshint: {
            files: [
                'assets/options/options.js',
                'assets/options/validation.js',
                'assets/fields/*/js/*.js',
                'assets/support/support.js'
            ],
            options: {
                expr: true,
                globals: {
                    jQuery: true,
                    console: true,
                    module: true,
                    document: true,
                }
            }
        },
        //minfy js files
        uglify: {
           dist: {
               options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> options-compiled.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                   report: 'gzip'
                },
                files: {
                    'assets/js/options-compiled.min.js' : ['assets/options/options.js', 'assets/options/validation.js', 'assets/fields/*/js/*.js', 'assets/vendor/selectize/js/standalone/selectize.min.js', 'assets/vendor/selectize/js/standalone/selectize.close.js']
                }
           },
            dev: {
               options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> options-compiled.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                   mangle: false,
                   compress: false,
                   beautify: true
                },
                files: {
                    'assets/js/options-compiled.js' : ['assets/options/options.js', 'assets/options/validation.js', 'assets/fields/*/js/*.js', 'assets/vendor/selectize/js/standalone/selectize.js', 'assets/vendor/selectize/js/standalone/selectize.close.js']
                }
           },
           support: {
               options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> support.min.js <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                   report: 'gzip'
                },
                files: {
                    'assets/js/support.min.js' : ['assets/support/support.js']
                }
           }
        },
        //compile sass to css
        sass: {
            //distro copy of css, this is enqueued
            dist: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> options.min.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/scss',
                    src: ['*.scss'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            },
            //register dev task to create expanded version, useful for devs
            dev: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> options.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    style: 'expanded'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/scss',
                    src: ['*.scss'],
                    dest: 'assets/css',
                    ext: '.css'
                }]
            },
            //support class
            support: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= pkg.version %> support.min.css <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n',
                    style: 'compressed'
                },
                files: [{
                    expand: true,
                    cwd: 'assets/support',
                    src: ['*.scss'],
                    dest: 'assets/css',
                    ext: '.min.css'
                }]
            },
        },
        //regenerate pot file
        makepot: {
            target: {
                options: {
                    cwd: '',
                    domainPath: '/languages',
                    exclude: [],
                    mainFile: 'fluent-framework.php',
                    potFilename: 'fluent-framework.pot',
                    type: 'wp-plugin'
                }
            }
        },
        //convert any po to mo files
        po2mo: {
            files: {
                src: 'languages/*.po',
                expand: true
            },
        },
        //ensure README.md is the same as readme.txt
        copy: {
            dist: {
                src: 'readme.txt',
                dest: 'README.md'
            }
        },
        //create docs - only in docs command
        phpdocumentor: {
            dist: {
                options: {
                    directory: './',
                    target: 'docs',
                    ignore: 'node_modules/'
                }
            }
        },
        curl: {
          'google-fonts-source': {
            src: 'https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyC2uS4JNGErYqDcfch1bADF0l4tZT7mWfM',
            dest: 'assets/vendor/google-fonts-source.json'
          }
        }
    });
    
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-wp-i18n');
    grunt.loadNpmTasks('grunt-po2mo');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-phpdocumentor');
    grunt.loadNpmTasks('grunt-curl');
    
    grunt.registerTask('default', ['jshint', 'uglify:dist', 'uglify:dev', 'uglify:support', 'sass:dist', 'sass:dev', 'sass:support', 'makepot', 'po2mo', 'copy']);
    
    grunt.registerTask('docs', ['phpdocumentor:dist']);

    grunt.registerTask('googlefonts', ['curl:google-fonts-source']);

};

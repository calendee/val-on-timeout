'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/**\n' +
                ' * <%= pkg.description %>\n' +
                ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
                ' * @link <%= pkg.repository.url %>\n' +
                ' * @author <%= pkg.authors.join(", ") %>\n' +
                ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
                ' */\n'
        },
        concat: {
            options: {
                banner: '<%= meta.banner %>\n(function(angular, undefined) {\n\'use strict\';\n',
                footer: '})(angular);',
                process: function(src, filepath) {
                    return src.replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
                }
            },
            dist: {
                files: {
                    'dist/valOnTimeout.js': 'src/valOnTimeout.js'
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/valOnTimeout.min.js': 'dist/valOnTimeout.js'
                }
            }
        },
        jshint: {
            files: ['Gruntfile.js', 'src/*.js'],
            options: {
                curly: false,
                browser: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                expr: true,
                node: true,
                globals: {
                    exports: true,
                    angular: false,
                    $: false
                }
            }
        },
        karma: {
            options: {
                configFile: 'karma.conf.js'
            },
            build: {
                singleRun: true,
                autoWatch: false
            },
            dev: {
                autoWatch: true
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-karma');

    // Default task
    grunt.registerTask('default', ['build']);

    // Build task
    grunt.registerTask('build', ['karma:build', 'concat', 'uglify']);

    // Test task
    grunt.registerTask('test', ['karma:build']);

    // Provides the "bump" task.
    grunt.registerTask('bump', 'Increment version number', function() {
        var versionType = grunt.option('type');
        function bumpVersion(version, versionType) {
            var type = {patch: 2, minor: 1, major: 0},
                parts = version.split('.'),
                idx = type[versionType || 'patch'];
            parts[idx] = parseInt(parts[idx], 10) + 1;
            while(++idx < parts.length) { parts[idx] = 0; }
            return parts.join('.');
        }
        var version;
        function updateFile(file) {
            var json = grunt.file.readJSON(file);
            version = json.version = bumpVersion(json.version, versionType || 'patch');
            grunt.file.write(file, JSON.stringify(json, null, '  '));
        }
        updateFile('package.json');
        grunt.log.ok('Version bumped to ' + version);
    });

};

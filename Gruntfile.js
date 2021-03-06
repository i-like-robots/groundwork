module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        watch: {
            scripts: {
                files: ["src/**/*.js", "test/**/*.js"],
                tasks: ["jshint:dist", "jasmine:dist", "uglify:dist"]
            }
        },

        jshint: {
            all: "src/**/*.js",
            options: {
                jshintrc: true
            }
        },

        jasmine: {
            dist: {
                src: "src/**/*.js",
                options: {
                    specs: "test/specs/**/*.js",
                    vendor: "test/vendor/**/*.js",
                    template: "test/runner.tmpl"
                }
            }
        },

        uglify: {
            options: {
                banner: [
                    '/*!',
                    ' * @name      <%= pkg.name %>',
                    ' * @author    <%= pkg.author.name %> <<%= pkg.author.url %>>',
                    ' * @modified  <%= grunt.template.today("dddd, mmmm dS, yyyy") %>',
                    ' * @version   <%= pkg.version %>',
                    ' */'
                ].join('\n')
            },
            dist: {
                files: [
                    {
                        src: ["src/groundwork/core.js", "src/groundwork.js"],
                        dest: "dist/groundwork.js"
                    }
                ]
            },
        }

    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    grunt.registerTask("default", ["jshint", "jasmine", "uglify"]);

};
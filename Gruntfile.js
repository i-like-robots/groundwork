module.exports = function(grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        watch: {
            scripts: {
                files: ["src/**/*.js"],
                tasks: ["jshint:dist", "jasmine:dist", "uglify:dist"]
            }
        },

        jshint: {
            dist: {
                all: ["src/**/*.js"],
                options: {
                    trailing: true,
                    smarttabs: true,
                    browser: true,
                    globals: {
                        define: false,
                        require: false
                    }
                }
            }
        },

        uglify: {
            dist: {
                files: [
                    {
                        src: "src/**/*.js",
                        dest: "dist/groundwork.js"
                    }
                ]
            },
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
        }

    });

    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-uglify");
    grunt.loadNpmTasks("grunt-contrib-jasmine");

    grunt.registerTask("default", ["jshint", "jasmine", "uglify"]);

};
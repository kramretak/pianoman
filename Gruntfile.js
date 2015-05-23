/* global
 module: false
 */

module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        watch: {
            css: {
                files: "**/*.scss",
                tasks: ["sass:dev"]
            }
        },
        sass: {
            dev: {
                files: [
                    {
                        expand: true,
                        src: ['**/*.scss'],
                        dest: "css/",
                        ext: ".css"
                    }
                ],
                options: {
                    sourcemap: "auto"
                }
            }
        },
        jshint: {
            options: {
                reporter: require("jshint-stylish")
            },
            all: [
                "*.js"
            ]
        }
    });
    grunt.loadNpmTasks("grunt-contrib-sass");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.registerTask("default", ["watch"]);
};
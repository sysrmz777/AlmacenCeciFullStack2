const fs = require("fs");
const path = require("path");
const esbuild = require("esbuild");
const { createInstrumenter } = require("istanbul-lib-instrument");
const globalCoverageMap = require("karma-coverage/lib/coverage-map");

function listarArchivosSrc(dir, acumulados = []) {
    const entradas = fs.readdirSync(dir, { withFileTypes: true });
    for (const entrada of entradas) {
        const rutaCompleta = path.join(dir, entrada.name);
        if (entrada.isDirectory()) {
            listarArchivosSrc(rutaCompleta, acumulados);
        } else if ((entrada.name.endsWith(".js") || entrada.name.endsWith(".jsx")) && entrada.name !== "main.jsx") {
            acumulados.push(rutaCompleta);
        }
    }
    return acumulados;
}

// Preprocesador con esbuild + cobertura completa sobre todos los archivos de src/
function crearPreprocesadorEsbuildCobertura() {
    const instrumenter = createInstrumenter({
        esModules: true,
        compact: false,
        produceSourceMap: false
    });

    async function instrumentarArchivo(rutaArchivo) {
        const codigoFuente = await fs.promises.readFile(rutaArchivo, "utf8");
        const transformado = await esbuild.transform(codigoFuente, {
            loader: rutaArchivo.endsWith(".jsx") ? "jsx" : "js",
            jsx: "automatic",
            sourcefile: rutaArchivo
        });

        const instrumentado = instrumenter.instrumentSync(
            transformado.code,
            rutaArchivo
        );

        const covObj = instrumenter.lastFileCoverage();
        if (covObj) {
            globalCoverageMap.add(covObj);
        }
        return instrumentado;
    }

    const pluginCoberturaSrc = {
        name: "cobertura-src",
        setup(build) {
            build.onLoad({ filter: /[\\/]src[\\/].*\.(js|jsx)$/ }, async (args) => {
                const instrumentado = await instrumentarArchivo(args.path);
                return {
                    contents: instrumentado,
                    loader: "js"
                };
            });
        }
    };

    return async function(content, file, done) {
        try {
            const archivosSrc = listarArchivosSrc(path.join(__dirname, "src"));
            for (const archivo of archivosSrc) {
                await instrumentarArchivo(archivo);
            }

            const resultado = await esbuild.build({
                entryPoints: [file.originalPath],
                bundle: true,
                write: false,
                target: "es2020",
                jsx: "automatic",
                plugins: [pluginCoberturaSrc],
                define: {
                    "process.env.NODE_ENV": '"development"'
                }
            });
            file.path = file.originalPath.replace(/\.jsx$/, ".js");
            done(null, resultado.outputFiles[0].text);
        } catch (err) {
            done(err, null);
        }
    };
}

crearPreprocesadorEsbuildCobertura.$inject = [];

// Configuracion Karma
module.exports = function(config) {
    config.set({
        basePath: "",
        frameworks: ["jasmine"],
        plugins: [
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-coverage",
            { "preprocessor:esbuild-cov": ["factory", crearPreprocesadorEsbuildCobertura] }
        ],
        files: [
            "tests/almacen.spec.jsx",
            { pattern: "public/Imagen/**/*", watched: false, included: false, served: true }
        ],
        proxies: {
            "/Imagen/": "/base/public/Imagen/"
        },
        preprocessors: {
            "tests/almacen.spec.jsx": ["esbuild-cov"]
        },
        reporters: ["progress", "coverage"],
        coverageReporter: {
            includeAllSources: true,
            dir: path.join(__dirname, "coverage"),
            reporters: [
                { type: "html", subdir: "html" },
                { type: "text" },
                { type: "text-summary" }
            ]
        },
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ["ChromeHeadless"],
        singleRun: true,
        concurrency: Infinity
    });
};

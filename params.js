const params = {
    logSigma: Math.log(0.01),
    samplesPerFrame: 200
}

let gui = new dat.GUI();
gui.add(params, "logSigma", Math.log(1e-5), 0.0);
gui.add(params, "samplesPerFrame", 1, 1000);
gui.add({ callback: () => { window.onresize(); } }, "callback").name("Reset");
gui.show();

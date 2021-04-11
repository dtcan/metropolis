const BACKGROUND_COLOUR = "#000000";
const SAMPLE_COLOUR = "#555555";
const SAMPLE_RADIUS = 0.1;

let imageDim;
let image;
let imageReady = false;
let lastSample;

const canvas = document.getElementById("canvas");

window.onload = () => {
    const url = new URLSearchParams(window.location.search).get('image') || 'https://dtcan.dev/faces/'+(Math.floor(Math.random() * 6))+'.png';

    IJS.Image.load(url)
    .then(imageObj => {
        imageObj = imageObj.grey();
        imageDim = Math.min(imageObj.width, imageObj.height);
        image = new Array(imageObj.width).fill(undefined).map(_ => new Array(imageObj.height).fill(0.0));
        for(var y = 0; y < imageObj.height; y++) {
            for(var x = 0; x < imageObj.width; x++) {
                image[x][y] = imageObj.getPixelXY(x, y);
            }
        }
        imageReady = true;
    });
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let ctx = canvas.getContext("2d");
    ctx.fillStyle = BACKGROUND_COLOUR;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
window.onresize = () => resizeCanvas();
resizeCanvas();

function generateSample() {
    if(lastSample == undefined) {
        lastSample = [Math.random(), Math.random()];
    }else {
        let x = 0.0;
        let y = 0.0;
        let r = 0.0;

        while(Math.random() > r) {
            let u1 = Math.random();
            let u2 = Math.random();
            let z1 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
            let z2 = Math.sqrt(-2.0 * Math.log(u1)) * Math.sin(2.0 * Math.PI * u2);
            x = lastSample[0] + z1 * Math.exp(params.logSigma);
            y = lastSample[1] + z2 * Math.exp(params.logSigma);
            let trueX = Math.floor(x * imageDim);
            let trueY = Math.floor(y * imageDim);
            if(0 <= trueX && trueX < image.length && 0 <= trueY && trueY < image[0].length) {
                r = image[trueX][trueY] / image[Math.floor(lastSample[0] * imageDim)][Math.floor(lastSample[1] * imageDim)];
            }else {
                r = 0.0;
            }
        }
        
        lastSample = [x, y];
    }

    return lastSample;
}

function draw() {
    let ctx = canvas.getContext("2d");

    let scale = Math.min(canvas.width, canvas.height);

    if(imageReady) {
        for(let i = 0; i < params.samplesPerFrame; i++) {
            let sample = generateSample();
        
            ctx.fillStyle = SAMPLE_COLOUR;
            ctx.strokeStyle = "#00000000";
            ctx.beginPath();
            ctx.arc(sample[0] * scale, sample[1] * scale, SAMPLE_RADIUS, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
        }
    }

    requestAnimationFrame(draw);
}
draw();

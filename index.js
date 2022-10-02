console.log('here')

let video = document.querySelector("#videoElement");
let link = document.querySelector('#link')
let canvas = document.querySelector('#canvas')
let image

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: {frameRate: {max: 24}}})
        .then(async function (stream) {
            await delay(100)
            video.srcObject = stream;
            let liveVideo = stream.getVideoTracks()[0]
            // video.srcObject = liveVideo
            // let image = new ImageCapture(liveVideo)
            let i =0 
            while (i<10){
                canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
                url = canvas.toDataURL('image/jpeg')
                link.href = url
                await delay(100)
                i++
            }
        })
    .catch(function (err) {
        console.log(err)
        console.log("Something went wrong!");
    });
}
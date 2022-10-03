let canvas = document.querySelector('#canvas')
let ctx = canvas.getContext('2d')
let video = document.querySelector('#video')
let text = document.querySelector('#text')

if (navigator.mediaDevices.getUserMedia){
    navigator.mediaDevices.getUserMedia({video: true}).then(stream => {
        video.srcObject = stream;
    })
}

function createASCII(){
    ctx.drawImage(video, 0, 0, 500, 400)

    imageData = ctx.getImageData(0,0,500,400).data
    // console.log(imageData)

    characters = ""
    for (let char=1; char<=5000; char++){
        let pixelBrightness = averagePixels(char)
        characters += returnCharacter(pixelBrightness)
        if (char%100 ==0){
            characters += '\n'
        }
    }
    // console.log(characters)
    if (characters.length > 5100){
        console.log('over')
    }
    text.innerHTML = characters
}

function pixelToIndices(pixel){
    r = (pixel*4) - 4
    b = r+1
    g = b+1
    return [r,g,b]
}

function averagePixels(charIndex){
    let usedPixels = []
    let shift = (495 -((charIndex-1)%100)*5) + Math.floor((charIndex-1)/100)*4000
    let sum = 0
    for (row=0; row<8; row++){
        for (i = 1; i<=5; i++){
            pixel = i+(500*row) + shift
            usedPixels.push(pixel)
            indices = pixelToIndices(pixel)
            sum += imageData[indices[0]] + imageData[indices[1]] + imageData[indices[2]]
        }
    }
    return (Math.round((sum)/(row*i*3)))
}

function returnCharacter(brightness){
    brightnessToChar = {
        0: '$',
        1: '@',
        2: '%',
        3: '8',
        4: 'o',
        5: 'z',
        6: '*',
        7: '?',
        8: '|',
        9: '+',
        10: '.'
    }
    adjustedBrightness = Math.floor(brightness/25.5)
    return brightnessToChar[adjustedBrightness]
}

function formatString(string, lineWidth, rows){
    let output = ''
    let length = string.length
    for (let i = 0; i<(length/lineWidth); i++){

    }
}


setInterval(createASCII, 100)
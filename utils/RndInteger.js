function rndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

const reference = rndInteger(1000,100000)

export default reference
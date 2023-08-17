let startTime, endTime;
let imageSize = "";
let image = new Image();
let bitSpeed = document.getElementById("bits"),
    kbSpeed = document.getElementById("kbs"),
    mbSpeed = document.getElementById("mbs"),
    infoSpeed = document.getElementById("info");

    let totalBitSpeed = 0;
    let totalKbSpeed = 0;
    let totalMbSpeed = 0;
    let numTests = 5;
    let testCompleted = 0;
    //Obtener iamgen random de unsplash.com
    let imageApi = "https://source.unsplash.com/random?topic=nature";

    //cuando carga la imagen
    image.onload = async function(){
        endTime = new Date();this.getAttributeNames();

        //obtener tamaño de imagen
        await fetch(imageApi).then((response) =>{
            imageSize = response.headers.get("content-length");
            calculateSpeed();
        });
    };
    //funcion para calcular la velocidad
    function calculateSpeed(){
        //tiempo en segundos
        let timeDuration = (endTime - startTime) /1000;
        //bits totales
        let loadedBits = imageSize * 8;
        let speedInBts = loadedBits / timeDuration;
        let speedInKbs = speedInBts / 1024;
        let speedInMbs = speedInKbs / 1024;


        totalBitSpeed += speedInBts;
        totalKbSpeed += speedInKbs;
        totalMbSpeed += speedInMbs;

        testCompleted++;
        // Si se completa todo el test obtenemos 5 imagenes o las definias en la variable numTests y calculamos la media
        if (testCompleted === numTests) {
            let averageSpeedInBps = (totalBitSpeed / numTests).toFixed(2);
            let averageSpeedInKbps = (totalKbSpeed / numTests).toFixed(2);
            let averageSpeedInMbps = (totalMbSpeed / numTests).toFixed(2);
    
            // Mostrar velocidad media
            bitSpeed.innerHTML += `${averageSpeedInBps}`;
            kbSpeed.innerHTML += `${averageSpeedInKbps}`;
            mbSpeed.innerHTML += `${averageSpeedInMbps}`;
            info.innerHTML = "Test Completed!";
        } else {
            // Correr el siguiente text
            startTime = new Date().getTime();
            image.src = imageApi;
        }
    }
    
    // Funcion inicial para empezar el test
    const init = async () => {
        info.innerHTML = "Testing...";
        startTime = new Date().getTime();
        image.src = imageApi;
    };
    
    // Empezar el test cuando carga la ventana
    window.onload = () => {
        for (let i = 0; i < numTests; i++) {
            init();
        }
    };

const area1 = document.getElementById('area1')
const area2 = document.getElementById('area2')
const joys1 = document.getElementById('joystick1')
const joys2 = document.getElementById('joystick2')

const EX    = document.getElementById('eje1')
const EY    = document.getElementById('eje2')
const EZ    = document.getElementById('eje3')
const coefi = document.getElementById('coef')
const pote  = document.getElementById('pot')

const but1  = document.getElementById('butR')

const foc1 = document.getElementById('foco')
const foc2 = document.getElementById('focMin')

const tray1 = document.getElementById('tray1')

const ancho = screen.width
const alto = screen.height

const anchoJ2 = joys2.clientWidth
const altoJ2  = joys2.clientHeight

var intervalo = 1500

var flag = true

// console.log(ancho, " ",alto)

function VelocidadValue(){
    dif = (Number(area2.style.top.replace('px',''))+area2.clientHeight/2-20) - Number(area2.style.top.replace('px',''))
    pot = Math.round(((Number(area2.style.top.replace('px','')) + area2.clientHeight/2) - (Number(joys1.style.top.replace('px','')) + joys1.clientHeight/2))*100/dif)
    if(pot>100) pot = 100
    if(pot<-100) pot = -100
    // console.log(pot)
    return pot
}
function GiroValue(){
    dif = (Number(area1.style.left.replace('px',''))+area1.clientWidth/2-20) - Number(area1.style.left.replace('px',''))
    pot = Math.round(((Number(area1.style.left.replace('px','')) + area1.clientWidth/2) - (Number(joys2.style.left.replace('px','')) + joys2.clientWidth/2))*100/dif)
    
    if(pot>100) pot = 100
    if(pot<-100) pot = -100
    // console.log(pot)
    return pot
}

function posCoor(elemento, X, Y){
    if(X>=0){
        elemento.style.left = X-elemento.clientWidth/2 +"px"
    }
    if(Y>=0){
        elemento.style.top = Y-elemento.clientHeight/2+"px"
    }
}

var coorA1 = [ancho/4, alto/2]
var coorA2 = [ancho/4*3, alto/2]

posCoor(but1, ancho/2, alto/2)

posCoor(area1, coorA1[0], coorA1[1])
posCoor(area2, coorA2[0], coorA2[1])

posCoor(joys2, ancho/4, alto/2)
posCoor(joys1, ancho/4*3, alto/2)

area1.addEventListener('touchstart', e=>{
    var coorX = e.changedTouches[0].clientX
    var difX  = coorA1[0]-coorX
    if(difX<0){
        difX*=-1
    }
    var coorX = e.changedTouches[0].clientX
    var coef = Math.round(difX*25/90)

    joys2.style.width = anchoJ2 - coef + "px"
    joys2.style.height= altoJ2 - coef + "px"
    posCoor(joys2, coorX, alto/2)

    // console.log(coorX)
    area1.addEventListener('touchmove', e=>{
        var coorX = e.changedTouches[0].clientX
        var difX  = coorA1[0]-coorX

        if(difX<0){
            difX*=-1
        }

        if(difX<(area1.clientWidth/2)-20){
            var coef = Math.round(difX*25/90)
            // console.log() 
            joys2.style.width = anchoJ2 - coef + "px"
            joys2.style.height= altoJ2 - coef + "px"
            posCoor(joys2, coorX, alto/2)
        }else if(coorX<ancho/4){
            posCoor(joys2, (ancho/4)-(area1.clientWidth/2)+20, alto/2)
        }else{
            posCoor(joys2, (ancho/4)+(area1.clientWidth/2)-20, alto/2)
        }
        
        
    })

    area1.addEventListener('touchend', ()=>{
        joys2.style.width = anchoJ2 + "px"
        joys2.style.height= altoJ2 + "px"
        posCoor(joys2, coorA1[0], coorA1[1])
        
        // posCoor(joys2, coorX, alto/2)
    })
    
})

area2.addEventListener('touchstart', e=>{
    

    var coorY = e.changedTouches[0].clientY
    var difY  = coorA2[1]-coorY
    if(difY<0){
        difY*=-1
    }
    var coorY = e.changedTouches[0].clientY
    var coef = Math.round(difY*25/90)

    joys1.style.height = anchoJ2 - coef + "px"
    joys1.style.width= altoJ2 - coef + "px"
    posCoor(joys1, ancho/4*3, coorY)

    // console.log(coorX)
    area2.addEventListener('touchmove', e=>{

        var coorY = e.changedTouches[0].clientY
        var difY  = coorA2[1]-coorY
        if(difY<0){
            difY*=-1
        }

        if(difY<(area2.clientHeight/2)-20){
            var coef = Math.round(difY*25/90)
            // console.log() 
            joys1.style.height = anchoJ2 - coef + "px"
            joys1.style.width= altoJ2 - coef + "px"
            posCoor(joys1, ancho/4*3, coorY)
        }else if(coorY<alto/2){
            posCoor(joys1, ancho/4*3, (alto/2)-(area2.clientHeight/2)+20)
        }else{
            posCoor(joys1, ancho/4*3, (alto/2)+(area2.clientHeight/2)-20)
        }
        
        
    })
    
})

but1.addEventListener('click', ()=>{
    joys1.style.width = altoJ2+"px"
    joys1.style.height= anchoJ2 +"px"
    posCoor(joys1, coorA2[0], coorA2[1])
})
// console.log(intervalo)
setInterval(() => {
    foc1.classList.add('active')
    foc2.classList.add('active')
    setTimeout(()=>{
        foc1.classList.remove('active')
        foc2.classList.remove('active')
    },100)
    
}, intervalo);

window.addEventListener("deviceorientation",function(event) {
    var coefAvance

    var potIzq=0, potDer=0, giro=0, velGiro = 40    , velvel=60

    alpha = Math.round(event.alpha);
    beta = Math.round(event.beta);
    gamma = Math.round(event.gamma);

    EX.innerHTML = "Z:"+alpha
    EY.innerHTML = "X:"+beta
    EZ.innerHTML = "Y:"+gamma

    coefGiro    = beta
    coefAvance  = gamma+15 
    if(coefGiro<15 && coefGiro>-15) coefGiro=0
    else{
        if(coefGiro>0) coefGiro-=15
        else coefGiro+=15
    }
    if(coefAvance<15 && coefAvance>-15) coefAvance=0
    else{
        if(coefAvance>0) coefAvance-=15
        else coefAvance+=15  
    } 
    
    if(coefGiro>50) coefGiro=50
    if(coefGiro<-50) coefGiro=-50
    
    if(coefAvance>30) coefAvance=30
    if(coefAvance<-30) coefAvance=-30

    coefi.innerHTML = "Coeficiente: "+coefGiro+", "+coefAvance

    velGiro += coefGiro*(160/50)
    velvel  += coefAvance*(40/30)



    

    // potDer = VelocidadValue()
    // potIzq = VelocidadValue()

    giro = GiroValue()
    vel  = VelocidadValue()
    if(giro>0){
        giro = Math.round(giro * velGiro/100)
        potDer = giro
    }else{
        giro = Math.round(giro * -1 * velGiro/100)
        potIzq = giro
    }

    vel=vel*velvel/100

    if(vel<0){
        potDer*=-1
        potIzq*=-1
    }

    potDer += vel
    potIzq += vel

    if(potDer>velvel){
        potIzq-=potDer-velvel
        potDer=velvel
        console.log("1")
    }
    if(potIzq>velvel){
        potDer-=potIzq-velvel
        potIzq=velvel
        console.log("2")
    }
    if(potDer<-velvel){
        potIzq= potIzq-(potDer+velvel)
        potDer  =-velvel
    }
    if(potIzq<-velvel){
        potDer= potDer-(potIzq+velvel)
        potIzq=-velvel
        
    }

    
    potIzq = Math.round(potIzq)
    potDer = Math.round(potDer)

    pote.innerHTML = "Potencia: "+potIzq+", "+potDer

}, true);
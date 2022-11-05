let dinosaurio = document.getElementsByClassName("dinosaurioCorrer");
var teclaw=false;
var teclad=false;
var globalID;
var vidas = 3;
let colision = false
let roca = document.getElementById("roca"); 
let valorRoca = 2500;
var puntaje = 0;
var contarPuntaje = false;
gameLoop = function (){
    puntaje += 1;
    document.getElementById('puntaje').innerHTML = "Kilometros:"+puntaje;
    function update(){
        $(document).keydown(function(event){  
            if(event.key == "w"){
                teclaw = true;
                saltar();
                correrNuevamente();  
            }
        });
        function saltar() {
            $(".dinosaurioCorrer").removeClass("dinosaurioCorrer").addClass("dinosaurioSaltar");
        }
        function correrNuevamente() {
            setTimeout(function() {
                $(".dinosaurioSaltar").removeClass("dinosaurioSaltar").addClass("dinosaurioCorrer");      
            }, 800);
        }
        function traerPiedra(){
            
            if(valorRoca >= -100){            
                document.getElementById("roca").style.left = (valorRoca)+'px';
                valorRoca = valorRoca - 12;
            }else{
                valorRoca = 2500;
                colision = false;
            }
        }
        traerPiedra();
        if(DetectarColision() && !colision){
            colision = true;
            if (vidas>1) {
                $(".vida"+vidas).hide();
                vidas--;
                $(".dinosaurioCorrer").removeClass("dinosaurioCorrer").addClass("dinosaurioColisionado");
                setTimeout(function(){
                    $(".dinosaurioColisionado").removeClass("dinosaurioColisionado").addClass("dinosaurioCorrer");
                },80);
                
            } else if (vidas == 1){
                $(".vida1").hide();
                $(".dinosaurioCorrer").removeClass("dinosaurioCorrer").addClass("dinosaurioMuerto");
                finalizado();
                puntaje.pause();
            }
            
        }        
        // Funcion colision
        function DetectarColision(){
            /// "a" y "b" deben ser dos objetos HTMLElement
            var a = $("#dinosaurio");
            var b = $("#roca");
            
            var a_pos = {t : a.position().top, 
                l: a.position().left, 
                r: a.position().left + a.width(), 
                b: a.position().top + a.height()};
                var b_pos =  {t : b.position().top, 
                    l: b.position().left+60, 
                    r: b.position().left + b.width(), 
                    b: b.position().top + b.height()};
                    
                    
                    //Detecta si se superponen las áreas
                    if(   a_pos.l <= b_pos.r && a_pos.r >= b_pos.l 
                        && a_pos.b >= b_pos.t && a_pos.t <= b_pos.b ){
                            return true;
                            
                        } else {
                            return false;
                        }
                        
                    }
                }
                update();
                idFrame = window.requestAnimationFrame(gameLoop);
            }
            function finalizado(){
                document.getElementById('roca').style.webkitAnimationPlayState = 'paused'; 
                document.getElementById('fondo').style.webkitAnimationPlayState = 'paused';
                document.getElementById('dinosaurio').style.webkitAnimationPlayState = 'paused';
                window.cancelAnimationFrame(idFrame);
                document.getElementById("fondo").style.webkitFilter = "blur(8px)";
                document.getElementById('gameover').style.visibility = 'visible';
                document.getElementById('puntaje').style.visibility = 'hidden';
                document.getElementById('volverajugar').style.visibility = 'visible';
                document.getElementById('puntuacionFinal').innerHTML = "Puntaje: " +puntaje;
                
                
            }
            function start(){
                vidas = 3;
                colision = false;                
                valorRoca = 2500;
                puntaje = 0;
                document.getElementById('dinosaurio').style.webkitAnimationPlayState = 'running';                
                document.getElementById('fondo').style.webkitAnimationPlayState = 'running';
                document.getElementById('roca').style.webkitAnimationPlayState = 'running'; 
                document.getElementById('vida1').style.visibility = 'visible'; 
                document.getElementById('vida2').style.visibility = 'visible'; 
                document.getElementById('vida3').style.visibility = 'visible'; 
                window.requestAnimationFrame(gameLoop);
                document.getElementById("fondo").style.webkitFilter = "none";
                
            }
            document.getElementById("comenzar").addEventListener("click", function(e) {
                document.getElementById('inicio').style.visibility = 'hidden';
                document.getElementById('comenzar').style.visibility = 'hidden';
                e.preventDefault(); 
                start();
            })
            document.getElementById("volverajugar").addEventListener("click", function(e) {
                document.getElementById('gameover').style.visibility = 'hidden';
                document.getElementById('volverajugar').style.visibility = 'hidden';
                $(".dinosaurioMuerto").removeClass("dinosaurioMuerto").addClass("dinosaurioCorrer"); 
                puntaje = 0;
                vidas = 3;
                document.getElementById('puntaje').style.visibility = 'visible'; 
                $('#vida1').show();
                $('#vida2').show();
                $('#vida3').show();
                start();
            })
            
            document.getElementById('dinosaurio').style.webkitAnimationPlayState = 'paused';
            document.getElementById('fondo').style.webkitAnimationPlayState = 'paused';
            document.getElementById('roca').style.webkitAnimationPlayState = 'paused'; 
            document.getElementById('puntaje').style.webkitAnimationPlayState = 'paused'; 
            document.getElementById('vida1').style.visibility = 'hidden'; 
            document.getElementById('vida2').style.visibility = 'hidden'; 
            document.getElementById('vida3').style.visibility = 'hidden'; 
            document.getElementById("fondo").style.webkitFilter = "blur(8px)";
            document.getElementById('volverajugar').style.visibility = 'hidden'; 
import * as $  from "jquery";

/**********GENEREAL VARIABLES***********/
export const urlImages = "https://raw.githubusercontent.com/mherrerabl/UOC_Eines_HTML_CSS_PAC3/main/";

/**********GENEREAL FUNCTIONS***********/
//Modifica la variable de la categoria clicada
export function setCategory(el) {
    $(el).on("click", function(event){
        let nameCategory = event.target.id;
        let category = nameCategory.substring(0, nameCategory.length-1);
        categoryClicked = category;
        localStorage.setItem("category", categoryClicked);
    });
}

//Modifica la variable del detall clicat
export function setDetail(el){
    $(el).on("click", function(){
        detailClicked  = $(this).attr('id');
        localStorage.setItem("detail", detailClicked);
    });
}

//Crea el mapa segons la latitud i l'altitud
export function createMap(el, latitude, altitude, img, alt, title, zoom){
    const mapOptions = {
        center: [latitude, altitude],
        zoom: zoom
    }

    const imgWEBP = 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png';
    const map = new L.map(el, mapOptions);
    const layer = new L.TileLayer(imgWEBP);

    map.addLayer(layer);
    
    let markerOptions = {
        title: "Prefectrua de Nara",
        clickable: true
    }
    const marker = new L.Marker([latitude, altitude], markerOptions);
    if(img === ""){
        marker.bindPopup('<p style="text-align: center">'+title+'</p>').openPopup();
    }else{
        marker.bindPopup('<img style="width: 200px" src="'+img+'" alt="'+alt+'"><p style="text-align: center">'+title+'</p>').openPopup();
    }
    marker.addTo(map);
}

//Canvia el número de columnes de SwiperJS
export function gridSwiper(wWidth) {
    if (wWidth < 479){
        $('swiper-container').attr('slides-per-view', '1');
    }else if(wWidth < 800){
        $('swiper-container').attr('slides-per-view', '2');
    }else if (wWidth > 801){
        $('swiper-container').attr('slides-per-view', '4');
    }
}

//Retorna la url de la imatge segons si te art direction o no
export function chooseImage(obj, indexUrl, format){
    if(format === "webp"){
        if(obj.type.webp.art != undefined && indexUrl < 3){
            return urlImages + obj.type.webp.art[indexUrl];
        }else{
            return urlImages + obj.type.webp.url[indexUrl];
        }
    }else{
        if(obj.type.jpg.art != undefined && indexUrl < 3){
            return urlImages + obj.type.jpg.art[indexUrl];
        }else{
            return urlImages + obj.type.jpg.url[indexUrl];
        }
    }
}

//Contingut swipers
export function contentImageCard(obj) {
    if(`arch${obj.id}` === "arch1"){
        return `<img src="${urlImages + obj.type.jpg.url[0]}"
        srcset="${chooseImage(obj, 2, "webp")} 320w,
                ${chooseImage(obj, 1, "webp")} 480w"
        sizes="(max-width: 600px) 90vw,
                (max-width: 849px) 90vw,
                (min-width: 850px) 33vw"
        alt="${obj.alt}"
        width="300"
        height="300">`;
    }
    return `<img loading="lazy" src="${urlImages + obj.type.jpg.url[0]}"
                srcset="${chooseImage(obj, 2, "webp")} 320w,
                        ${chooseImage(obj, 1, "webp")} 480w"
                sizes="(max-width: 600px) 90vw,
                        (max-width: 849px) 90vw,
                        (min-width: 850px) 33vw"
                alt="${obj.alt}"
                width="300"
                height="300">`;
}
//Contingut imatges dels punts d'interès (pàgina Detail)
export function contentImagesArchitecture(obj) {
    return `<picture>
                <source media="(min-width: 850px)" 
                        srcset="${chooseImage(obj, 2, "webp")}" 
                        type="image/webp">
                <source media="(min-width: 480px)" 
                        srcset="${chooseImage(obj, 1, "webp")}" 
                        type="image/webp">
                <source media="(max-width: 479px)" 
                        srcset="${chooseImage(obj, 0, "webp")}" 
                        type="image/webp">
                
                <source media="(min-width: 850px)" 
                        srcset="${chooseImage(obj, 2, "jpg")}" 
                        type="image/jpg">
                <source media="(min-width: 480px)" 
                        srcset="${chooseImage(obj, 1, "jpg")}" 
                        type="image/jpg">
                <source media="(max-width: 479px)" 
                        srcset="${chooseImage(obj, 0, "jpg")}" 
                        type="image/jpg">

                <img loading="lazy" src="${chooseImage(obj, 0, "jpg")}" alt="${obj.alt}"
                width="300"
                height="300">
            </picture>`;
}

//Canvia el color del logo
export function changeColorLogo(event, color){
    const objectEl = $(event.currentTarget).children("object")[0];
    const documentEl = objectEl.contentDocument;
    const svgEl = documentEl.querySelector("svg");
    svgEl.style.color = color;
}


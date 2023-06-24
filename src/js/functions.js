import * as $  from "jquery";

/**********GENEREAL VARIABLES***********/
export const urlImages = "https://raw.githubusercontent.com/mherrerabl/UOC_Eines_HTML_CSS_PAC2/main/";

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

    const imgWEBP = 'http://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png?as=webp';
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
export function chooseImage(obj, indexUrl){
    if(obj.type.jpg.art != undefined && indexUrl < 2){
        return urlImages + obj.type.jpg.art[indexUrl];
    }else{
        return urlImages + obj.type.jpg.url[indexUrl];
    }
}

//Contingut swipers
export function contentImageCard(obj) {
    return `<img loading="lazy" src="${urlImages + obj.type.jpg.dpi[0]}"
                srcset="${urlImages + obj.type.jpg.dpi[0]}?as=webp 1x,
                        ${urlImages + obj.type.jpg.dpi[1]}?as=webp 2x,
                        ${urlImages + obj.type.jpg.dpi[2]}?as=webp 3x"

                alt="${obj.alt}">`;
}
//Contingut imatges dels punts d'interès (pàgina Detail)
export function contentImagesArchitecture(obj) {
    return `<picture>
                <source media="(min-width: 850px)" 
                        srcset="${chooseImage(obj, 2)}?as=webp" 
                        type="image/webp">
                <source media="(min-width: 480px)" 
                        srcset="${chooseImage(obj, 1)}?as=webp" 
                        type="image/webp">
                <source media="(max-width: 479px)" 
                        srcset="${chooseImage(obj, 0)}?as=webp" 
                        type="image/webp">
                
            

                <img loading="lazy" src="${chooseImage(obj, 0)}" alt="${obj.alt}">
            </picture>`;
}

//Canvia el color del logo
export function changeColorLogo(event, color){
    const objectEl = $(event.currentTarget).children("object")[0];
    const documentEl = objectEl.contentDocument;
    const svgEl = documentEl.querySelector("svg");
    svgEl.style.color = color;
}


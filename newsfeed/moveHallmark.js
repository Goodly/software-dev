function moveHallmarks() {
            console.log('why');
            setTimeout(function() {
                    var item;    
                    for (item of listofarticles) {
                        var divID = item['id'];
                        var hallmark = document.querySelector("svg[articleID='" + divID +"']");
                        var element = document.getElementById(divID);
                        var box = element.getBoundingClientRect();
                        var box_y = box.top;
                        hallmark.style.position = "absolute";
                        hallmark.style.left = "70%";
                        hallmark.style.top = box_y;
                    }
                }, 1200);
}

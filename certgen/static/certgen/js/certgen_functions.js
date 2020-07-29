// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
function generatePreview(name, imgSelector="#certificate-thumb img", vPos=200, font="serif") {
    // IDEA: code that scans image using js img library for the thickest space, suitable for adding lines
    let ctx = $('#certificate-preview')[0].getContext('2d');
    let template = new Image();
    template.src = $('#template-thumb img').attr('src');

    // TODO: change canvas drawing size to the template's
    ctx.clearRect(0, 0, 480, 320);
    ctx.drawImage(template, 0, 0, 480, 320);

    ctx.font = 'bold 18px Merriweather';
    ctx.textAlign = 'center';
    ctx.fillText(name, 240, vPos);

    $(imgSelector).attr('src', $('canvas')[0].toDataURL('image/png', 1)).show();
    $('#certificate-thumb .dropbox').hide();

};

function addImg(imgObj, src) {
    let $imgObj = imgObj;
    let $card_image = $('#'+$imgObj.attr('data-card-img-id'));
    $imgObj.attr('src', src);
    if (! $imgObj.is(':visible')) $card_image.find('.drop, .delete').toggle();
};

function pushName(name) {
    let nameObj = {"name": name};
    let dropdown_template = $('#dropdown-item-template').html();
    names.push(nameObj['name']);

    $('#dropdown-name-items').append(Mustache.render(dropdown_template, nameObj));
    let val = Number($('#names-counter').val());
    $('#names-counter').val(val + 1).trigger('change');
};

function addNames(file) {
    // sheetjs
    if (! file.type) { // if argument is an array
        // preview_name = file[0];
        generatePreview(file[0]);
        $.each(file, function(i, f) {
            pushName(file[i]);
        });
    } else {
        var reader = new FileReader();
        reader.onload = function(e) {
            var data = new Uint8Array(e.target.result);
            var workbook = XLSX.read(data, {type: 'array'});
            let name;
            if (file.type.endsWith('ms-excel')) {
                // csv files
                let is_first = true;
                for (const [key, value] of Object.entries(workbook.Sheets.Sheet1)) {
                    name = (value['w']) ? value['w']:value['v'];
                    // if (is_first) preview_name = name;
                    if (is_first) generatePreview(name);
                    // console.log('inside: ' + preview_name); // TODO DEBUGGING
                    pushName(name);
                    is_first = false;
                }
            } else if (file.type.endsWith('sheet')) {
                // xlsx files
                // preview_name = workbook.Strings[0]['t'];
                generatePreview(workbook.Strings[0]['t']);
                for (name of workbook.Strings) {
                    pushName(name['t']);
                }
            };
        };
        reader.readAsArrayBuffer(file);
    };
    // TODO: generatePreview runs only when template is provided
    // console.log('outside: ' + preview_name); // TODO DEBUGGING
    // generatePreview(preview_name);
};

// = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = = =
// drop zone
function dropHandler(ev, target) {
    ev.preventDefault();

    let file;
    if (target.id == 'certificate-thumb') {
        // if dropped on names file dropzone
        if (ev.dataTransfer.items) {
            let dropItems = ev.dataTransfer.items;
            for (var i =  dropItems.length - 1; i >= 0; i--) {
                if (dropItems[i].kind === 'file') {
                    file = dropItems[i].getAsFile();
                } else {
                    dropItem = dropItem[i];
                    file = dropItem;
                };
                addNames(file);
            };
        };

    } else {
        // if dropped on template dropzone
        if (ev.dataTransfer.items) {
            let dropItem = ev.dataTransfer.items[0];
            if (dropItem.kind === 'file') {
                file = dropItem.getAsFile();
            } else {
                dropItem = ev.dataTransfer.files[0];
                file = dropItem; // not sure if this works
            }
            $('#paste-template').val('');
            let $dropPreview = $('#'+target.id + ' figure img');
            addImg($dropPreview, URL.createObjectURL(file));
        }
    };

};

function dragOverHandler(ev) {
  ev.preventDefault();
};
function getQuickInfo(id) {
    $.get('/projects/' + id + '/quick', function (data) {
        $('#project' + id).html(data);
    });
}

function filterProjects() {
    let radioValue = $("input[name='filterMaterial']:checked").val();
    if(radioValue){
        $.post('/projects/material', {materialId: radioValue}, function (data) {
            $('#projects').html(data);
        });
    }
}
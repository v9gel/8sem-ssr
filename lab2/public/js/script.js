function getQuickInfo(id) {
    $.get('/projects/' + id + '/quick', function (data) {
        $('#project' + id).html(data);
    });
}
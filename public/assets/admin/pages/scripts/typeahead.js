$(document).on('ready pjax:success', function () {
    $('.typehead').each(function () {
        var url = $(this).closest('.typehead').data('action') + '?q=%QUERY%';
        var target = $(this).closest('.typehead').data('target');
        var role = $(this).closest('.typehead').data('role');

        var engine = new Bloodhound({
            remote: {
                url: url,
                wildcard: '%QUERY%',
                cache: false
            },
            datumTokenizer: Bloodhound.tokenizers.whitespace('q'),
            queryTokenizer: Bloodhound.tokenizers.whitespace
        });

        $("[name="+target+"]").typeahead({
            hint: true,
            highlight: true,
            minLength: 1,
        }, {
            source: engine.ttAdapter(),
            display: ' ',
            // This will be appended to "tt-dataset-" to form the class name of the suggestion menu.
            name: role,
            // the key from the array we want to display (name,id,email,etc...)
            templates: {
                empty: [
                    '<div class="list-group search-results-dropdown"><div class="list-group-item">Nothing found.</div></div>'
                ],
                header: [
                    '<div class="list-group search-results-dropdown">'
                ],
                suggestion: function (data) {
                    return '<a  class="list-group-item select-user">' + data.name + ' (' + data.user.email + ')' + '</a>';
                },
            }
        });
    })

});

$(document).on('typeahead:select', '.typehead.single', function (ev, suggestion) {
    var $displayName = $(this).closest('.form-group').find('.displayname');
    var $list = $('#hidden .results').clone();
    $displayName.data('id', suggestion.acc_id);
    var title = $displayName.data('type');
    $displayName.html('');
    $displayName.append($list);
    $displayName.find(".append_name").html(suggestion.name + ' (' + suggestion.user.email + ') ');
    //$displayName.find(".list-title").html(title);

});

$(document).on('typeahead:select', '.typehead.multiple', function (ev, suggestion) {
    // var $list = $('#hidden .students').clone();
    var $displayName = $(this).closest('.form-group').find('.displayname');
    var $list = $('#hidden .results').clone();

    var reqData = {id: suggestion.acc_id};
    
    var url = $('#students').data('add');
    $.post(url, reqData, function (data) {
        $('#students').append($list);
        $list.data("id", 4);
        $list.find(".append_name").html(suggestion.name + ' (' + suggestion.user.email + ') ');

    });
});

$(document).on('typeahead:close typeahead:change', '.typehead', function (ev, suggestion) {
    $(this).val("");
    // $(this).closest('.form-group').removeClass('has-error')
    //         .closest('.participants').find('.text-danger').remove();
});

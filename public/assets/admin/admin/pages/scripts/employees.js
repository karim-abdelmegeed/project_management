$(document).on('ready pjax:success', function () {
    $eventSelect = $(".copied_managers");
    // codeblock change_manager      
    $("select[name=manager_id]").change(function () {

        $(".copied_managers > option").each(function () {
            $(this).removeAttr("disabled");
        });
        SelectedId = $(this).val();
        
        $(".copied_managers option[value='" + SelectedId + "']").attr("disabled", "disabled");
        $('.copied_managers').select2();

        

    });
    // codeblock change_copied_managers      
    $(".copied_managers").change(function () { 
        $("select[name=manager_id] > option").each(function () {
            $(this).removeAttr("disabled");
        });
        SelectedId = $(this).val();
        if(SelectedId != null){
            for (i = 0; i < SelectedId.length; i++) {

                $("select[name=manager_id] option[value='" + SelectedId[i] + "']").attr("disabled", "disabled");
            }
        }
        
        

        
        
    });
    SelectedId = $("select[name=manager_id]").val();
    $(".copied_managers option[value='" + SelectedId + "']").attr("disabled", "disabled");
    $('.copied_managers').select2();
    
    SelectedIdx = $(".copied_managers").val();
        if(SelectedIdx != null){
            for (i = 0; i < SelectedIdx.length; i++) {

                $("select[name=manager_id] option[value='" + SelectedIdx[i] + "']").attr("disabled", "disabled");
            }
        }

});


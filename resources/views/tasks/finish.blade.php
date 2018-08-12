<form id="main-form"  class="ajax_form j-forms" method="post" action="{{route('tasks.finish')}}">
            {{csrf_field()}}
            <input type="hidden" name="id" value="{{$task->id}}" />
            <div class="content">
                  



<div class="unit form-group "  >
    <label class="label">Comment</label>
    <textarea id="comment" name="comment" data-name="comment" data-validation="">
        
    </textarea>
</div>
            </div>
            <div class="form-actions">
                <div class="btn-set pull-right">
                <?php if(isset($_GET['clone'])){?><input type="hidden" name="new" value="1"><?php ;}?> <input type="submit" name="new" class="<?php if(!isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg color do_clone" value="Save as new">
                <input type="submit" name="update" class="<?php if(isset($_GET['clone'])){?>hide<?php ;}?> btn btn-lg btn-edit do_save" value="Finish">
                </div>
            </div>
        </form>



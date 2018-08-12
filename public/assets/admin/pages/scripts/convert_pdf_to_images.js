$(document).on('ready pjax:success' , function () {
  var __PDF_DOC,
  __CURRENT_PAGE,
  __TOTAL_PAGES,
  __PAGE_RENDERING_IN_PROGRESS = 0;
  var contract_id;
  // __CANVAS = $('#pdf-canvas').get(0),
  // __CANVAS_CTX = __CANVAS.getContext('2d');
// codeblock showPDF       
function showPDF(pdf_url) {
  $("#pdf-loader"+contract_id).show();
// alert("#pdf-loader"+contract_id);
  PDFJS.getDocument({ url: pdf_url }).then(function(pdf_doc) {
    __PDF_DOC = pdf_doc;
    __TOTAL_PAGES = __PDF_DOC.numPages;
    
    // Hide the pdf loader and show pdf container in HTML
    $("#pdf-loader"+contract_id).hide();
    $("#pdf-contents"+contract_id).show();
    $("#pdf-total-pages").text(__TOTAL_PAGES);
    // Show the first page
    for (var i = 1; i <=__TOTAL_PAGES ; i++) {
    showPage(i);
  }
  }).catch(function(error) {
    // If error re-show the upload button
    $("#pdf-loader"+contract_id).hide();
    $(".upload-button"+contract_id).show();
    
    alert(error.message);
  });;
}
// codeblock showPage      
function showPage(page_no) {

  __PAGE_RENDERING_IN_PROGRESS = 1;
  __CURRENT_PAGE = page_no;
  var clone = $('#hidden').find('.pdf-canvas').clone();
  clone.attr('id','clone_'+page_no+contract_id);
  $('.canvas-parent').append(clone);
 var __CANVAS = $('#clone_'+page_no+contract_id).get(0),
  __CANVAS_CTX = __CANVAS.getContext('2d');
  // Disable Prev & Next buttons while page is being loaded
  $("#pdf-next, #pdf-prev").attr('disabled', 'disabled');

  // While page is being rendered hide the canvas and show a loading message
  $("#pdf-canvas").hide();
  $("#page-loader"+contract_id).show();
  $("#download-image").hide();
  $('#refresh'+contract_id).hide();
  $('.button'+contract_id).prop("disabled",true);
  // Update current page in HTML
  $("#pdf-current-page").text(page_no);
  
  // Fetch the page
  __PDF_DOC.getPage(page_no).then(function(page) {
    // As the canvas is of a fixed width we need to set the scale of the viewport accordingly
    var scale_required = __CANVAS.width / page.getViewport(1).width;

    // Get viewport of the page at required scale
    var viewport = page.getViewport(scale_required);

    // Set canvas height
    __CANVAS.height = viewport.height;

    var renderContext = {
      canvasContext: __CANVAS_CTX,
      viewport: viewport
    };
    
    // Render the page contents in the canvas
    page.render(renderContext).then(function() {
      var imgData = __CANVAS.toDataURL('image/png');
      var formData = new FormData();
      formData.append('image', imgData);
      formData.append('id', contract_id);
      formData.append('page_order', page_no);
      // alert(contract_id);
      $.ajax({
        url: '/contract_nda/save_contract_pages',
        method: 'post',
        data: formData,
       contentType: false,
       processData: false,
       async: false,
       success: function (data) {
        if(page_no == __TOTAL_PAGES){
         $("#page-loader"+contract_id).text("");
         $('.button'+contract_id).prop("disabled",false);
         $('#refresh'+contract_id).show(); 
        }
       }
      })
      __PAGE_RENDERING_IN_PROGRESS = 0;
      // Re-enable Prev & Next buttons
      $("#pdf-next, #pdf-prev").removeAttr('disabled');

      // Show the canvas and hide the page loader
      $("#pdf-canvas").show();
      
      $("#download-image").show();
    });
  });
}

// Upon click this should should trigger click on the #file-to-upload file input element
// This is better than showing the not-good-looking file input element
$(".upload-button1").on('click', function(e) {
e.preventDefault();
  $("#file-to-upload").trigger('click');
  contract_id = $(this).attr('data-id');
  $(".upload-button1").addClass('upload-button'+contract_id);
  // alert(contract_id);
});
$(".upload-button2").on('click', function(e) {
e.preventDefault();
  $("#file-to-upload").trigger('click');
  contract_id = $(this).attr('data-id');
  $(".upload-button2").addClass('upload-button'+contract_id);
  // alert(contract_id);
});

// When user chooses a PDF file
$("#file-to-upload").on('change', function() {
  // Validate whether PDF
    if(['application/pdf'].indexOf($("#file-to-upload").get(0).files[0].type) == -1) {
        alert('Error : Not a PDF');
        return;
    }

  $(".upload-button"+contract_id).hide();

  // Send the object url of the pdf
  showPDF(URL.createObjectURL($("#file-to-upload").get(0).files[0]));
});

// Previous page of the PDF
$("#pdf-prev").on('click', function(e) {
  e.preventDefault();
  if(__CURRENT_PAGE != 1)
    showPage(--__CURRENT_PAGE);
});

// Next page of the PDF
$("#pdf-next").on('click', function(e) {
  e.preventDefault();
  if(__CURRENT_PAGE != __TOTAL_PAGES)
    showPage(++__CURRENT_PAGE);
});

// Download button
$("#download-image").on('click', function() {
  $(this).attr('href', __CANVAS.toDataURL()).attr('download', 'page.png');
});
}); 

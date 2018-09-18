$(function(){
  let clickX, leftOffset, inx;
  let dragging  = false;
  let doc 	  = document;
  let labBtn 	  = $("#wrap").find('label');
  let wrapWidth;
  let ideIde = document.getElementById('ide-ide');
  let ideOperation = document.getElementById('ide-operation');
  let ideLabBtn = document.getElementById('ide-label-btn')

  labBtn.bind('mousedown',function(){
      dragging   = true;
      leftOffset = $("#wrap").offset().left;
      inx 	   = $(this).index('label');
      wrapWidth = $(document.body).width();
    }
  );

  doc.onmousemove = function(e){
    if (dragging) {
      clickX = e.pageX;

      //第一个拖动按钮左边不出界
      if(clickX > 200+leftOffset) {
        if(clickX < wrapWidth-200){

          ideLabBtn.style.left = (clickX - leftOffset)*100/wrapWidth  + '%'

          ideIde.style.width = (clickX - leftOffset)*100/wrapWidth + '%';
          ideOperation.style.width = (wrapWidth - clickX- leftOffset)*100/wrapWidth + '%';
        }else{
          ideLabBtn.style.left = (wrapWidth - 200)*100/wrapWidth + '%'

          ideIde.style.width = (wrapWidth - 200)*100/wrapWidth + '%';
          ideOperation.style.width = 200*100/wrapWidth + '%';
        }

      } else {
        ideLabBtn.style.left = 200*100/wrapWidth + '%'
      }

    }
  };

  $(doc).mouseup(function(e) {
    dragging = false;
    e.cancelBubble = true;
  })
})

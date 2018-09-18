<template>
  <div class="pro-ide">
    <div class="pro-ide-editor" id="pro-ide-editor">

      <div class="pro-ide-border-editor">
        <project-editor v-on:isShowLoadingModal="isShowIdeLoadingModal" v-on:showPreDeployAndPreRun="isShowPreDeployAndPreRun"></project-editor>
      </div>

    </div>
<!--    <label class="pro-ide-label" id="pro-ide-label-btn"></label>-->
    <div class="pro-ide-output" id="pro-ide-output">
      <div class="pro-ide-border-output">
          <project-output ></project-output>
      </div>
    </div>
  </div>
</template>

<script>
  import ProjectOutput from './ProjectOutput'
  import ProjectEditor from './ProjectEditor'

  export default {

    name: "project-ide",
    components: {
      ProjectOutput,
      ProjectEditor,
    },
    data () {
      return {
        code : '',
        isShowWasm: false
      }
    },
    methods : {
      isShowIdeLoadingModal($data){
        this.$emit('isShowLoadingModal',false);
      },
      isShowOutputWasm($data){
        this.isShowWasm = $data
        this.$emit('isShowWasm',$data);
      },
      handleChange(e) {
        this.code = e.target.value
        this.$store.dispatch('setProjectCode', this.code)
      },
      isShowPreDeployAndPreRun($data){
        this.$emit('showPreDeployAndPreRun',$data);
      }
    }
  }
/*  $(function(){
    let clickY, leftOffset, inx;
    let dragging  = false;
    let doc 	  = document;
    let labBtn 	  = $("#wrap").find('label');
    let wrapWidth;
    let proIdeEditor = document.getElementById('pro-ide-editor');
    let proIdeOutput = document.getElementById('pro-ide-output');
    let ideLabBtn = document.getElementById('pro-ide-label-btn')

    labBtn.bind('mousedown',function(){
        dragging   = true;
        leftOffset = $("#wrap").offset().left;
        inx 	   = $(this).index('label');
        wrapWidth = $(document.body).width();
      }
    );

    doc.onmousemove = function(e){
      if (dragging) {
        clickY = e.pageY;
        console.log(clickY)

/!*        //第一个拖动按钮左边不出界
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
        }*!/

      }
    };

    $(doc).mouseup(function(e) {
      dragging = false;
      e.cancelBubble = true;
    })
  })*/
</script>

<style scoped>
  .pro-ide{
    height: 100%;
  }
  .pro-ide-editor{
    width: 100%;
    height: 70%;
    padding-bottom: 15px;
  }
  .pro-ide-border-editor{
    border:1px solid #C4C3C3;
    width: 100%;
    height: 100%;
  }
  .pro-ide-output{
    height: 30%;
    padding-top: 5px;
  }
  .pro-ide-border-output{
    border:1px solid #C4C3C3;
    width: 100%;
    height: 100%;
  }
  .pro-ide-label{
    position: absolute;
    width: 70%;
    height: 5px;
    cursor: e-resize;
    background-color: #0c5460;
  }
</style>

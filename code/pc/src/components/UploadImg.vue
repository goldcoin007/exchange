<template>
  <div class="d-flex align-items-end">
    <button  v-if="type=='file'" class="btn btn-light btn-sm change-file-button">
        {{file&&file.name||$t('common.selectFile')}}
       <input type="file" class="file" :required="required" :placeholder="placeholder" ref="file" @change="change" />
    </button>
    <div v-else class="el-upload-dragger mr-2 flex-shrink-0">
      <label>
        <input type="file" class="file" :required="required" :placeholder="placeholder" ref="file" @change="change" />
        <img class="img" v-if="uploadImg" :src="imgFilter(uploadImg)" alt />
        <template v-else>
          <i class="el-icon-upload"></i>
          <slot name="text"></slot>
        </template>
      </label>
    </div>
    <div v-if="file">
      <p>{{file.name}}</p>
      <button class="btn upload-btn btn-sm btn-primary" @click="upload" v-if="!value">{{$t('common.upload')}}</button>
      <button class="btn upload-btn btn-sm btn-danger" @click="del" v-else>{{$t('common.delete')}}</button>
    </div>
  </div>
</template>
<script>
import Member from "@/api/member";
export default {
  props: ["value",'required','placeholder','type','allowSize'],
  data() {
    return {
      file: undefined,
      uploadImg: "",
      isLoad: false
    };
  },
  watch:{
    value(n){
      this.uploadImg = n
    }
  },
  created(){
  },
  methods: {
    del() {
      this.file = undefined;
      this.$emit("input", undefined);
      this.$refs.file.value=''
    },
    imgFilter(img){
      if(img.indexOf('http')!=-1||img.indexOf('data:')!=-1){
        return img
      }else{
        return this.Globals.Server.Path.BASE+'/storage/'+img
      }
    },
    change(ev) {
      let file = this.$refs.file.files[0];
      let ele = this.$refs.file;

      let option = {
        ele,
        allowSize:this.allowSize|| 5, // 单位为M
        allowType: ["image/png", "image/jpg", "image/jpeg", "image/pdf"]
      };
      utils
        .upload(option)
        .then(result => {
          if (result.isIMG) {
            // 在预览区查看
            this.$emit("input", undefined);
            this.$nextTick(()=>{
              this.uploadImg = result.data;
              this.file = file
            })
          }
        })
        .catch(err => {
          this.$refs.file.value=''
          if (err.message == 102) {
            this.$message.error(this.$t('common.tooBig')+`${option.allowSize}M`);
          } else if (err.message == 101) {
            this.$message.error(this.$t('common.errorType'));
          }
        });
    },
    upload() {
      let data = new FormData();
      data.append("image", this.file);
      Member.uploadImage(data).then(res => {
        this.$emit("input", res.path);
      });
    }
  }
};
</script>
<style lang="scss" scope>
.change-file-button{
  position: relative;
  min-width: 100px;
  height: 31px;
  margin-right: 20px;
}
 .file {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    opacity: 0;
  }
.upload-btn {
  width: 100px;
}
.el-upload-dragger {
  width: 300px;
  height: 150px;
  position: relative;
  label {
    display: block;
  }
 
  .img {
    width: 300px;
    height: 150px;
    object-fit: cover;
  }
}
</style>
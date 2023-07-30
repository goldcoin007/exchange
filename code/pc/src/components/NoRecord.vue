<template>
    <div class="not-data">
        <img src="../assets/img/not-data.png" alt="">
        <slot name="text">
            <div>{{$t('common.notData')}}</div>
        </slot>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.not-data{
    width: 100%;
    padding: 20px 0;
    text-align: center;
}
.not-data img{
    width: 100px;
    max-width: 80%;
}
</style>
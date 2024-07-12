<script>
export default {
  onLaunch: function () {
    console.log('App Launch')
  },
  onShow: function () {
    uni.navigateTo({
      url: '/pages/list/index',
    })
    console.log('App Show')
  },
  onHide: function () {
    console.log('App Hide')
  },
}
</script>

<style>
/*每个页面公共css */
</style>
